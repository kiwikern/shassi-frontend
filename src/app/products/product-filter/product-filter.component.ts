import { Component, OnInit } from '@angular/core';
import { IAppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { selectAvailableStores, selectFilteredName, selectFilteredStores } from '../product.reducer';
import { UpdateFilteredName, UpdateFilteredStores } from '../product.actions';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  isOpen = false;
  selectedStores$: Observable<string[]>;
  name$: Observable<string>;
  availableStores$: Observable<string[]>;
  isActive$: Observable<boolean>;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.availableStores$ = this.store.pipe(select(selectAvailableStores));
    this.selectedStores$ = this.store.pipe(select(selectFilteredStores));
    this.name$ = this.store.pipe(select(selectFilteredName));
    this.isActive$ = combineLatest(this.selectedStores$, this.name$).pipe(
      map(([stores, name]) => !!name || stores && stores.length > 0)
    );
  }

  updateSelectedStores(stores: string[]) {
    const action = new UpdateFilteredStores({stores});
    this.store.dispatch(action);
  }

  updateSelectedName(name: string) {
    const action = new UpdateFilteredName({name});
    this.store.dispatch(action);
  }

}
