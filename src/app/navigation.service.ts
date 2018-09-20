import { Injectable } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';
import { filter } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  public canNavigateBack$ = new BehaviorSubject(false);
  private hasPreviousRoute = false;

  constructor(private router: Router,
              private location: Location) {
    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
    ).subscribe((event: NavigationEnd) => this.setNavigationProperties(event));
  }

  public navigateBack(): void {
    if (this.hasPreviousRoute) {
      this.location.back();
    } else {
      this.router.navigate(['/products']);
    }
  }

  private setNavigationProperties(event: NavigationEnd): void {
    this.hasPreviousRoute = event.id !== 1;
    this.canNavigateBack$.next(/(.*(products\/).+)|auth\/user/.test(event.url));
  }
}
