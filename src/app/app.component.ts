import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { IAppState } from './reducers';
import { Logout } from './auth/auth.actions';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  showBackNavigation = false;

  constructor(private store: Store<IAppState>,
              private router: Router) {
  }

  ngOnInit() {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => this.showBackNavigation = /.*(products\/).+/.test(event.url));
  }

  logout() {
    this.store.dispatch(new Logout());
  }

}
