import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-telegram-login-widget',
  templateUrl: './telegram-login-widget.component.html',
  styleUrls: ['./telegram-login-widget.component.css']
})
export class TelegramLoginWidgetComponent implements AfterViewInit {

  @ViewChild('script', {static: true}) script: ElementRef;

  convertToScript() {
    const element = this.script.nativeElement;
    const script = document.createElement('script');
    script.src = 'https://telegram.org/js/telegram-widget.js?5';
    script.setAttribute('data-telegram-login', environment.telegramBotName);
    script.setAttribute('data-size', 'large');
    script.setAttribute('data-onauth', 'loginViaTelegram(user)');
    script.setAttribute('data-request-access', 'write');
    element.parentElement.replaceChild(script, element);
  }

  ngAfterViewInit() {
    this.convertToScript();
  }

}
