import { Injectable, NgZone } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { InfoSnackBarService } from './info-snack-bar.service';


/**
 * SwUpdatesService
 *
 * @description
 * 1. Checks for available ServiceWorker updates once instantiated.
 * 2. As long as there is no update available, re-checks every 6 hours.
 * 3. As soon as an update is detected, it activates the update and notifies interested parties.
 * 4. It continues to check for available updates.
 *
 * @property
 * `updateActivated` {Observable<string>} - Emit the version hash whenever an update is activated.
 */
@Injectable()
export class SwUpdatesService {
  private readonly CHECK_INTERVAL = 1000 * 60 * 60 * 6;   // 6 hours
  constructor(private updates: SwUpdate,
              ngZone: NgZone,
              private snackBar: InfoSnackBarService) {
    ngZone.runOutsideAngular(() => {
      interval(this.CHECK_INTERVAL).subscribe(() => ngZone.run(() => updates.checkForUpdate()));
    });

    this.updates.available.subscribe(event => {
      console.log(`Update available: ${event.current} -> ${event.available}`);
      this.showReloadSnackBar();
    });

    this.updates.activated.subscribe(event => {
      this.log(`Update activated: ${event.previous} -> ${event.current}`);
    });
  }

  private log(message: string) {
    const timestamp = (new Date).toISOString();
    console.log(`[SwUpdates - ${timestamp}]: ${message}`);
  }

  private showReloadSnackBar() {
    return this.snackBar.open('Neues Update installiert.', 'Aktualiseren', 10000)
      .onAction()
      .subscribe(() => this.reloadPage());
  }

  private reloadPage() {
    const location = window.location;
    if (location && 'reload' in location) {
      location.reload();
    }
  }
}
