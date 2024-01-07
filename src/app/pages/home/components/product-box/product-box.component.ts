import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import {ProductDetailsComponent} from "../../../../product-details/product-details.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: '[app-product-box]',
  templateUrl: './product-box.component.html',
  styleUrls: ['./product-box.component.css'],
})
export class ProductBoxComponent {

  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  constructor(private dialog: MatDialog) {}


  openDialog(): void {
    const dialogRef = this.dialog.open(ProductDetailsComponent, {
      width: '800px',
      height:'500px',// Adjust the width as needed

      data: { product: this.product, addToCart: this.addToCart }, // Pass the product to the dialog
    });

    dialogRef.afterClosed().subscribe((result) => {
      // Handle the result when the dialog is closed (if needed)
      console.log(`Dialog result: ${result}`);
    });
  }

    onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
}
