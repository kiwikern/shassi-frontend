import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelegramLinkDialogComponent } from './telegram-link-dialog.component';

describe('TelegramLinkDialogComponent', () => {
  let component: TelegramLinkDialogComponent;
  let fixture: ComponentFixture<TelegramLinkDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelegramLinkDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelegramLinkDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
