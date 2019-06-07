import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramLoginWidgetComponent } from './telegram-login-widget.component';

describe('TelegramLoginWidgetComponent', () => {
  let component: TelegramLoginWidgetComponent;
  let fixture: ComponentFixture<TelegramLoginWidgetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegramLoginWidgetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramLoginWidgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
