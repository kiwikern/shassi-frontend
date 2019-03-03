import { Component, OnInit } from '@angular/core';
import { IAppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { selectAvailableStores, selectFilteredName, selectFilteredStores, selectFilterOptions } from '../product.reducer';
import { UpdateFilteredName, UpdateFilteredStores, UpdateFilterOptions } from '../product.actions';
import { map } from 'rxjs/operators';
import { FilterOptions } from '../filter-options.interface';

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
  filterOptions$: Observable<FilterOptions>;
  isActive$: Observable<boolean>;

  constructor(private store: Store<IAppState>) {
  }

  ngOnInit() {
    this.availableStores$ = this.store.pipe(select(selectAvailableStores));
    this.selectedStores$ = this.store.pipe(select(selectFilteredStores));
    this.filterOptions$ = this.store.pipe(select(selectFilterOptions));
    this.name$ = this.store.pipe(select(selectFilteredName));
    this.isActive$ = combineLatest(this.selectedStores$, this.name$, this.filterOptions$).pipe(
      map(([stores, name, filterOptions]) =>
        !!name
        || stores && stores.length > 0
        || filterOptions.showOnlyWithUnreadUpdate
        || filterOptions.showOnlyLowInStock
        || filterOptions.showOnlyAvailable)
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

  updateFilterOptions(optionName: 'showOnlyAvailable' | 'showOnlyWithUnreadUpdate' | 'showOnlyLowInStock',
                      optionValue: boolean) {
    const options = {};
    options[optionName] = optionValue;
    const action = new UpdateFilterOptions({options});
    this.store.dispatch(action);
  }

}
