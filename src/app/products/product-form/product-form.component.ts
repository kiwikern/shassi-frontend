import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Size } from '../product.model';
import { MatStepper } from '@angular/material/stepper';
import { IAppState } from '../../reducers';
import { select, Store } from '@ngrx/store';
import { AddProductRequest, InitProductRequest } from '../product.actions';
import { selectHasSavingError, selectInitProduct, selectIsSaving } from '../product.reducer';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductFormComponent implements OnInit {

  urlFormGroup: FormGroup;
  detailsFormGroup: FormGroup;
  isSaving$: Observable<boolean>;
  hasSavingError$: Observable<boolean>;
  sizes: Size[];
  private _id: string;

  constructor(private store: Store<IAppState>,
              private router: Router,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.isSaving$ = this.store.select(selectIsSaving);
    this.hasSavingError$ = this.store.select(selectHasSavingError);
    this.urlFormGroup = this.formBuilder.group({
      url: ['', Validators.required],
      // Hack to disable next step via MatStepHeader
      makesFormInvalid: ['', Validators.required]
    });
    this.detailsFormGroup = this.formBuilder.group({
      name: ['', Validators.required],
      size: [null, Validators.required]
    });

  }

  updateProduct() {
    const update = new AddProductRequest({
      url: this.urlFormGroup.get('url').value,
      name: this.detailsFormGroup.get('name').value,
      size: this.detailsFormGroup.get('size').value
    });
    this.store.dispatch(update);
    this.hasSavedSuccessfully()
      .subscribe(success => success ? this.router.navigate(['products']) : '');
  }

  fetchProduct(stepper: MatStepper) {
    const url = this.urlFormGroup.get('url').value;
    this.store.dispatch(new InitProductRequest({url}));
    this.store.pipe(
      select(selectInitProduct),
      filter(p => !!p),
    ).subscribe((product: any) => {
      this._id = product._id;
      this.sizes = product.sizes;
      if (this.sizes && this.sizes.length === 1) {
        this.detailsFormGroup.patchValue({size: this.sizes[0]});
      }
      this.detailsFormGroup.patchValue({
        name: product.name
      });
    });
    this.hasSavedSuccessfully()
      .subscribe(success => {
        if (success) {
          // Hack to disable next step via MatStepHeader
          this.urlFormGroup.patchValue({makesFormInvalid: 'valid'});
          return stepper.next();
        }
      });
  }

  hasSavedSuccessfully() {
    return this.isSaving$.pipe(
      filter(isSaving => !isSaving),
      take(1),
      switchMap(() => this.hasSavingError$),
      map(hasError => !hasError),
      take(1)
    );
  }
}
