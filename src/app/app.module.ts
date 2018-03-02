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
import { MatButtonModule, MatIconModule, MatSnackBarModule, MatToolbarModule } from '@angular/material';
import { AuthInterceptor } from './auth/auth-interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoginGuard } from './auth/login.guard';
import { I18nService } from './i18n.service';
import { InfoSnackBarService } from './info-snack-bar.service';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'products'},
  {path: 'auth', children: authRoutes},
  {path: 'products', loadChildren: './products/products.module#ProductsModule', canActivateChild: [LoginGuard]}
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),
    BrowserAnimationsModule,
    ServiceWorkerModule.register('/ngsw-worker.js', {enabled: environment.production}),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    RouterModule.forRoot(routes),
    AuthModule,
    MatToolbarModule,
    MatButtonModule,
    MatSnackBarModule,
    MatIconModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    I18nService,
    InfoSnackBarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
