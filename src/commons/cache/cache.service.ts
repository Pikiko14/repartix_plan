import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';

@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cache: Cache) {}

  /**
   * Set item in cache
   * @param key 
   * @param payload 
   */
  async setItem(key: string, payload: any) {
    await this.cache.set(key, JSON.stringify(payload), 600000);
  }

  /**
   * Get item from cache
   * @param key 
   * @returns 
   */
  async getItem(key) {
    const data = await this.cache.get(key);
    if (data) return JSON.parse(data as string);
  }

  /**
   * Remoive iten in cache
   * @param key 
   */
  async removeItem(key) {
    await this.cache.del(key);
  }
}
