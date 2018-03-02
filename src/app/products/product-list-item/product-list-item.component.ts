import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Update } from '../product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-list-item',
  templateUrl: './product-list-item.component.html',
  styleUrls: ['./product-list-item.component.css'],
})
export class ProductListItemComponent implements OnInit {

  @Input() name: string;
  @Input() id: string;
  @Input() store: string;
  @Input() createdAt: Date;
  @Input() url: string;
  @Input() latestUpdate: Update;

  @HostListener('click') onClick() {
    this.router.navigate(['products', this.id]);
  }

  constructor(private router: Router) { }

  ngOnInit() {
  }

}
