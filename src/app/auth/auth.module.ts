import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';
import { MatchingPasswordDirective, RegisterComponent } from './register/register.component';
import { LoginGuard } from './login.guard';
import { UserEditComponent } from './user-settings/user-settings.component';
import { UserSettingsFormComponent } from './user-settings/user-settings-form/user-settings-form.component';
import { RedirectGuard } from './redirect.guard';
import * as jwtDecode from 'jwt-decode';
import { JWT_DECODE } from './jwt.service';
import { TelegramLinkDialogComponent } from './telegram-link-dialog/telegram-link-dialog.component';
import { TelegramLoginWidgetComponent } from './telegram-login-widget/telegram-login-widget.component';
import { TelegramLoginService } from './telegram-login.service';

export const authRoutes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'login'},
  {path: 'login', component: LoginComponent, canActivate: [RedirectGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [RedirectGuard]},
  {path: 'user', component: UserEditComponent, canActivate: [LoginGuard]}
];

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('auth', reducer),
    EffectsModule.forFeature([AuthEffects]),
    HttpClientModule,
    RouterModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatDialogModule,
  ],
  providers: [
    LoginGuard,
    {provide: JWT_DECODE, useValue: jwtDecode}
  ],
  declarations: [
    LoginComponent,
    RegisterComponent,
    MatchingPasswordDirective,
    UserEditComponent,
    UserSettingsFormComponent,
    TelegramLinkDialogComponent,
    TelegramLoginWidgetComponent,
  ],
  entryComponents: [
    TelegramLinkDialogComponent,
  ]
})
export class AuthModule {
  constructor(telegramLoginService: TelegramLoginService) {
    telegramLoginService.init();
  }

}
