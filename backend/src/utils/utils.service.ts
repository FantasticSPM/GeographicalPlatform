import { Injectable } from '@nestjs/common';
import { UAParser } from 'ua-parser-js';

@Injectable()
export class UtilsService {
  // 获取设备信息
  getDeviceInfo(userAgent) {
    const parser = new UAParser(userAgent);
    const result = parser.getResult();

    const browerInfo = `${result.browser.name}\/${result.browser.version}`;
    return browerInfo;
  }
}
