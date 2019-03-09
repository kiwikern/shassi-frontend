import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-telegram-link-dialog',
  templateUrl: './telegram-link-dialog.component.html',
  styleUrls: ['./telegram-link-dialog.component.css']
})
export class TelegramLinkDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { telegramLink: string }) {
  }

  ngOnInit() {
  }

}
