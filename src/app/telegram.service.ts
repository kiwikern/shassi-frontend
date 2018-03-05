import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, take } from 'rxjs/operators';

@Injectable()
export class TelegramService {

  constructor(private http: HttpClient) {
  }

  openTelegramAuthUrl() {
    return this.http.get<string>('/api/user/telegram', {responseType: 'text' as 'json'})
      .pipe(
        take(1),
        map(token => 'https://telegram.me/shassi_bot?start=' + token)
      ).subscribe(url => window.open(url, '_blank'));
  }

}
