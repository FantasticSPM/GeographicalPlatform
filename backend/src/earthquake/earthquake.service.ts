import { Injectable } from '@nestjs/common';
import { CreateEarthquakeDto } from './dto/create-earthquake.dto.js';
import { UpdateEarthquakeDto } from './dto/update-earthquake.dto.js';
import axios from 'axios';
import * as cheerio from 'cheerio';
import { Response } from '../common/interceptors/Response.js';

type EarthquakeItem = {
  id: string | number | undefined;
  content: string | undefined;
  time: string | undefined;
  detailTime: string | undefined;
  longitude: number | string;
  latitude: number | string;
  depth: string;
  magnitude: number | string;
  location: string;
};

interface listCache {
  data: EarthquakeItem[] | null;
  time: number;
}

const listCache: listCache = {
  data: null,
  time: 0,
};

@Injectable()
export class EarthquakeService {
  create(createEarthquakeDto: CreateEarthquakeDto) {
    return 'This action adds a new earthquake';
  }

  async findAll() {
    async function getData(): Promise<EarthquakeItem[]> {
      const result = await axios.get(
        'https://data.earthquake.cn/datashare/report.shtml?PAGEID=zxdzall',
      );

      const $ = cheerio.load(result.data);

      const data: EarthquakeItem[] = [];

      const trs = $(
        '#resource table.cls-data-table tbody tr:not(.cls-data-tr-head-list)',
      );
      $(trs).each((_, el) => {
        const tds = $(el).find('.cls-data-td-list');
        const index = +tds.eq(0).text();
        const id = index;
        const time = tds.eq(1).text();
        const date = new Date(time);
        const year = date.getFullYear(); // 年
        const month = date.getMonth() + 1; // 月，注意 +1
        const day = date.getDate(); // 日
        const hour = date.getHours(); // 时
        const minute = date.getMinutes(); // 分
        const second = date.getSeconds(); // 秒
        const longitude = +tds.eq(2).text();
        const latitude = +tds.eq(3).text();
        const depth = tds.eq(4).text();
        const magnitude = +tds.eq(5).text();
        const location = tds.eq(6).text();

        const content = `${month}月${day}日${hour}时${minute}分${second}秒${location}发生${magnitude}级地震，震源深度${depth}千米`;

        data.push({
          id,
          content,
          time: `${month}-${day}`,
          detailTime: `${year}-${month}-${day} ${hour}:${minute}:${second}`,
          longitude,
          latitude,
          depth,
          magnitude,
          location,
        });
      });
      return data;
    }

    const data = await getDataByIsExpire(listCache, getData);
    return Response.success(data);
  }

  async findOne(id: number | string) {
    async function getData(id): Promise<EarthquakeItem> {
      const result = await axios.get(
        `https://data.earthquake.cn/datashare/sjfw/dzindex.jsp?id=${id}`,
      );

      const $ = cheerio.load(result.data);

      const content = $('#J_searchWrap h3.art_title').text().trim();
      const data: EarthquakeItem = {
        id,
        content,
        time: undefined,
        detailTime: undefined,
        magnitude: '',
        depth: '',
        location: '',
        longitude: 0,
        latitude: 0,
      };
      $('#J_searchWrap .cont table tbody tr').each((_, el) => {
        const th = $(el).find('th').first().text().trim();
        const td = $(el).find('td').first().text().trim();
        if (th.includes('发震时刻')) {
          data['time'] = td;
        } else if (th.includes('震 级')) {
          data['magnitude'] = td;
        } else if (th.includes('深 度')) {
          data['depth'] = td;
        } else if (th.includes('经 度')) {
          const res = +td.replace('°', '');
          data['longitude'] = res;
        } else if (th.includes('参考位置')) {
          data['location'] = td;
        } else if (th.includes('纬 度')) {
          const res = +td.replace('°', '');
          data['latitude'] = res;
        }
      });
      return data;
    }
    const data = await getData(id);
    return Response.success(data);
  }

  update(id: number, updateEarthquakeDto: UpdateEarthquakeDto) {
    return `This action updates a #${id} earthquake`;
  }

  remove(id: number) {
    return `This action removes a #${id} earthquake`;
  }
}

async function getDataByIsExpire(data, func, expireTime = 1000 * 60 * 5) {
  const curTime = +new Date();
  const time = data.time;
  if (!data.data || curTime - time > expireTime) {
    const newData = await func();
    data.data = newData;
    data.time = curTime;
    return newData;
  } else {
    return data.data;
  }
}
