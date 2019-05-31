import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { metaReducers, reducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule, Routes } from '@angular/router';
import { AuthModule, authRoutes } from './auth/auth.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginGuard } from './auth/login.guard';
import { I18nService } from './i18n.service';
import { InfoSnackBarService } from './info-snack-bar.service';
import { SwUpdatesService } from './sw-updates.service';
import { TelegramService } from './auth/telegram.service';
import { Role } from './auth/jwt.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {path: 'auth', children: authRoutes},
  {path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule), canLoad: [LoginGuard]},
  {
    path: 'admin',
    loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
    canLoad: [LoginGuard],
    data: {roles: [Role.ADMIN]}
  },
  {path: '**', redirectTo: 'products'},
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled'}),
    HttpClientModule,
    AuthModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule,
    MatProgressSpinnerModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    I18nService,
    InfoSnackBarService,
    SwUpdatesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(private telegramService: TelegramService) {
    this.telegramService.reactOnQueryParam();
  }


}
