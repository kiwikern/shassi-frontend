import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { AdminOverview } from '../admin-data.interface';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  adminDataDatasource$: MatTableDataSource<AdminOverview>;
  columnsToDisplay = ['username', 'productCount', 'isConnectedToTelegram', 'latestProductUpdatedDate', 'menu'];
@ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminDataDatasource$ = new MatTableDataSource();
    this.adminDataDatasource$.sort = this.sort;
    this.adminService.getAdminOverview()
      .subscribe(data => this.adminDataDatasource$.data = data);
  }

}
