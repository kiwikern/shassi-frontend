import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { reducer } from './auth.reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './auth.effects';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import {
  MatButtonModule,
  MatCardModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule
} from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MatchingPasswordDirective, RegisterComponent } from './register/register.component';
import { LoginGuard } from './login.guard';
import { UserEditComponent } from './user-settings/user-settings.component';
import { UserSettingsFormComponent } from './user-settings/user-settings-form/user-settings-form.component';
import { RedirectGuard } from './redirect.guard';
import * as jwtDecode from 'jwt-decode';
import { JWT_DECODE } from './jwt.service';

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
    UserSettingsFormComponent
  ]
})
export class AuthModule {
}
