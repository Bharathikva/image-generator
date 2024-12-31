import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MonsterApiService {
  private readonly apiUrl = 'https://api.monsterapi.ai/v1/generate/txt2img';

  constructor() {}

  async generateImage(requestBody: any): Promise<any> {

    const options = {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
        Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjVjZDBkMWQ0YWE0MDhiNTM1MzcyNDAwMzQyZDk2Nzc1IiwiY3JlYXRlZF9hdCI6IjIwMjQtMTItMzFUMDg6MDU6MzcuNDM4Nzk3In0.evnct9sBwJSWdisqvpMGtL3zm-Xc7pW0J5PLgRkEj2Y',
      },
      body: JSON.stringify(requestBody),
    };

    try {
      const response = await fetch(this.apiUrl, options);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json(); // Includes `status_url`
    } catch (error) {
      console.error('Error initiating image generation:', error);
      throw error;
    }
  }

  async checkStatus(statusUrl: string): Promise<any> {
    try {
      const response = await fetch(statusUrl, {
        method: 'GET',
        headers: {
          accept: 'application/json',
          'content-type': 'application/json',
          Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VybmFtZSI6IjVjZDBkMWQ0YWE0MDhiNTM1MzcyNDAwMzQyZDk2Nzc1IiwiY3JlYXRlZF9hdCI6IjIwMjQtMTItMzFUMDg6MDU6MzcuNDM4Nzk3In0.evnct9sBwJSWdisqvpMGtL3zm-Xc7pW0J5PLgRkEj2Y',
        },
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      console.error('Error checking image generation status:', error);
      throw error;
    }
  }
}
