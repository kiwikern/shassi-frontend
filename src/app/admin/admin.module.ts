import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';
import { RouterModule } from '@angular/router';
import { Role } from '../auth/jwt.service';
import { MatButtonModule, MatIconModule, MatMenuModule, MatSortModule, MatTableModule } from '@angular/material';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: AdminPanelComponent, data: {roles: [Role.ADMIN]}}
    ]),
    MatTableModule,
    MatSortModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ]
})
export class AdminModule { }
