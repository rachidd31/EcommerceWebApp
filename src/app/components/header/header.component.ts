import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';
import { SharedService } from 'src/app/services/shared.service';
import {AuthService} from "../../services/auth.service";
import {HomeComponent} from "../../pages/home/home.component";
import {Product} from "../../models/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls:[`./header.component.css`],
})
export class HeaderComponent implements OnInit, OnDestroy{
  private _cart: Cart = { items: [] };
  itemsQuantity = 0;
  searchQuery: string = '';

  product_new: Array<Product>=[];

  searchForm!: FormGroup;




  constructor(private fb:FormBuilder,private cartService: CartService, private sharedService: SharedService,public authservice: AuthService,
  public homecompoent:HomeComponent) {


  }

  ngOnInit(): void {

    }

  ngOnDestroy(): void {
        throw new Error('Method not implemented.');
    }






  //
  // initSearchForm(): void {
  //
  //   this.homecompoent.initSearchForm(this.searchForm)
  //
  // }
  //
  // searchProducts(): void {
  //
  //   const lista=this.homecompoent.searchProducts(this.searchForm)
  //   console.log("search search 111111111111111111111111111")
  //   console.log(lista)
  //
  // }



  showSideBar() {
    this.sharedService.triggerShowSideBar();
  }

  @Input()
  get cart(): Cart {
    return this._cart;
  }

  set cart(cart: Cart) {
    this._cart = cart;

    this.itemsQuantity = cart.items
      .map((item) => item.quantity)
      .reduce((prev, curent) => prev + curent, 0);
  }



  getTotal(items: CartItem[]): number {
    return this.cartService.getTotal(items);
  }

  onClearCart(): void {
    this.cartService.clearCart();
  }




  onSearchChange() {
    // Perform auto-search here using this.searchQuery
    // You can make API calls or filter data based on the search query

    // Create a new array to store filtered products
    // const filteredProducts: Array = [];

    // @ts-ignore
    for (const product of this.homecompoent.products) {
      // Check if the product's title contains the search query (case-insensitive)
      if (product.title.toLowerCase().includes(this.searchQuery.toLowerCase())) {
        this.product_new.push(product);
      }
    }

    // Update the products array with the filtered products
    this.homecompoent.products = this.product_new;

    console.log('Search query changed:', this.searchQuery);
  }










}
