import { inject, TestBed } from '@angular/core/testing';

import { TelegramService } from './telegram.service';

describe('TelegramService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TelegramService]
    });
  });

  it('should be created', inject([TelegramService], (service: TelegramService) => {
    expect(service).toBeTruthy();
  }));
});
