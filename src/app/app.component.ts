import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from './models/cart.model';
import { CartService } from './services/cart.service';
import {MatDialog} from "@angular/material/dialog";
import {ProductDetailsComponent} from "./product-details/product-details.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  cart: Cart = { items: [] };

  constructor(private cartService: CartService) {}






  ngOnInit() {
    this.cartService.cart.subscribe((_cart) => {
      this.cart = _cart;
    });
  }
}
