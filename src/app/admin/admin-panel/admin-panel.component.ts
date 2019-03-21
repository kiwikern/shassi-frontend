import { Component, OnInit, ViewChild } from '@angular/core';
import { AdminService } from '../admin.service';
import { AdminData } from '../admin-data.interface';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  adminDataDatasource$: MatTableDataSource<AdminData>;
  columnsToDisplay = ['username', 'productCount', 'isConnectedToTelegram', 'latestProductUpdatedDate', 'menu'];
@ViewChild(MatSort) sort: MatSort;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminDataDatasource$ = new MatTableDataSource();
    this.adminDataDatasource$.sort = this.sort;
    this.adminService.getAdminData()
      .subscribe(data => this.adminDataDatasource$.data = data);
  }

}
