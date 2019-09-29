import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../../navigation.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-router',
  templateUrl: './admin-router.component.html',
  styleUrls: ['./admin-router.component.css']
})
export class AdminRouterComponent implements OnInit {
  currentUrl$: Observable<string>;

  constructor(private navigationService: NavigationService) {
  }

  ngOnInit() {
    this.currentUrl$ = this.navigationService.currentUrl$;
  }

}
