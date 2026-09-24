import { Injectable } from '@nestjs/common';

@Injectable()
export class CacheService {
  private cache = new Map();

  set(key: string, value: any, expire?: number) {
    this.cache.set(key, {
      expires: expire ? Date.now() + expire : null,
      value,
    });
    setTimeout(() => {
      this.cache.delete(key);
    }, expire || 0);
  }

  delete(key: string) {
    return this.cache.delete(key);
  }

  get(key: string) {
    if (!this.cache.has(key)) return null;
    const currentTime = Date.now();
    const cache = this.cache.get(key);
    if (currentTime > cache.expires) {
      this.cache.delete(key);
      return null;
    }
    return cache.value;
  }

  has(key: string) {
    return this.cache.has(key);
  }
}
