import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramAuthUrlComponent } from './telegram-auth-url.component';

describe('TelegramAuthUrlComponent', () => {
  let component: TelegramAuthUrlComponent;
  let fixture: ComponentFixture<TelegramAuthUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegramAuthUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramAuthUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
