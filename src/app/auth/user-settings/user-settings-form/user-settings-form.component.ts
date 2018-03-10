import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { User } from '../../user.model';

@Component({
  selector: 'app-user-settings-form',
  templateUrl: './user-settings-form.component.html',
  styleUrls: ['./user-settings-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserSettingsFormComponent implements OnInit {
  @Input() email: string;
  @Input() sendTelegramNotifications: boolean;
  @Input() sendEmailNotifications: boolean;
  @Input() isLinkedToTelegram: boolean;
  @Input() botUrl: string;
  @Output() save: EventEmitter<Partial<User>> = new EventEmitter<Partial<User>>();
  @Output() linkTelegram: EventEmitter<any> = new EventEmitter<any>();

  constructor() {
  }

  ngOnInit() {
  }

  submit() {
    this.save.emit({
      email: this.email,
      notificationTypes: {
        telegram: this.sendTelegramNotifications,
        email: this.sendEmailNotifications
      }
    });
  }

}
