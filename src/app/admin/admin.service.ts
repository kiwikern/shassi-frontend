import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AdminData } from './admin-data.interface';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) {
  }

  getAdminData(): Observable<AdminData[]> {
    return this.http.get<AdminData[]>('/api/admin');
  }
}
