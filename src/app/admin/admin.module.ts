import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RouterModule } from '@angular/router';
import { Role } from '../auth/jwt.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { AdminRouterComponent } from './admin-router/admin-router.component';
import { MatToolbarModule } from '@angular/material';
import { ErrorProductsComponent } from './error-products/error-products.component';

@NgModule({
  declarations: [AdminPanelComponent, AdminRouterComponent, ErrorProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', data: {roles: [Role.ADMIN]}, component: AdminRouterComponent, children: [
          {path: '', redirectTo: 'overview'},
          {path: 'overview', component: AdminPanelComponent},
          {path: 'error-products', component: ErrorProductsComponent},
        ]}
    ]),
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatToolbarModule,
  ]
})
export class AdminModule { }
