import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../models/product.model";
import {ProductBoxComponent} from "../pages/home/components/product-box/product-box.component";

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {


  product;

  addToCart;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {

    this.product=data.product;

    this.addToCart=data.addToCart

  }

  ngOnInit(): void {

  }

  onAddToCart() {

    this.addToCart.emit(this.product)

  }
}
