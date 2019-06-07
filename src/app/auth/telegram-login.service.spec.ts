import { TestBed } from '@angular/core/testing';

import { TelegramLoginService } from './telegram-login.service';

describe('TelegramLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TelegramLoginService = TestBed.get(TelegramLoginService);
    expect(service).toBeTruthy();
  });
});
