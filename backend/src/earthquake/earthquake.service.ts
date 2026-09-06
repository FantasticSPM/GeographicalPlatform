import { Injectable } from '@nestjs/common';
import { CreateEarthquakeDto } from './dto/create-earthquake.dto.js';
import { UpdateEarthquakeDto } from './dto/update-earthquake.dto.js';
import axios from 'axios';
import * as cheerio from 'cheerio';

type EarthquakeItem = {
  content: string;
  id: string | undefined;
};

@Injectable()
export class EarthquakeService {
  create(createEarthquakeDto: CreateEarthquakeDto) {
    return 'This action adds a new earthquake';
  }

  async findAll(): Promise<EarthquakeItem[]> {
    const result = await axios.get('https://data.earthquake.cn/index.html');

    const $ = cheerio.load(result.data);

    const data: EarthquakeItem[] = [];
    $('.dynamic-box ul li').each((_, el) => {
      const a = $(el).find('a').first();
      const id = a.attr('href');
      const text = $(el).text().trim();
      data.push({
        id,
        content: text,
      });
    });
    return data;
  }

  findOne(id: number) {
    return `This action returns a #${id} earthquake`;
  }

  update(id: number, updateEarthquakeDto: UpdateEarthquakeDto) {
    return `This action updates a #${id} earthquake`;
  }

  remove(id: number) {
    return `This action removes a #${id} earthquake`;
  }
}
