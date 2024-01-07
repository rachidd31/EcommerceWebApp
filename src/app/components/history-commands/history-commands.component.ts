import { Component, OnInit } from '@angular/core';
import {Cart, CartItem} from "../../models/cart.model";
import {Observable, Subscription} from "rxjs";
import {CartService} from "../../services/cart.service";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-history-commands',
  templateUrl: './history-commands.component.html',
  styleUrls: ['./history-commands.component.scss']
})
export class HistoryCommandsComponent implements OnInit {

  displayedColumns: string[] = [
    'product',
    'name',
    'price',
    'quantity',
    'total'
  ];
  dataSource: CartItem[] = [];
  cartSubscription: Subscription | undefined;

  constructor(private cartService: CartService, private http: HttpClient,private auth: AuthService,private router:Router) {}

  items: Observable<any[]> | undefined;
  ngOnInit(): void {

    console.log("----------------------------------------------------")

    this.cartSubscription = this.cartService.getCartItems().subscribe({
      next: items => {
        // Assuming items is an array of CartItem
        console.log(items.length)
        for(let i=0;i<items.length;i++){
          this.dataSource = [...this.dataSource, ...items[i].items];

        }
      },
      error: error => {
        console.error('Error:', error);
        // Handle errors as needed
      },
      complete: () => {
        console.log('Observable completed');
        // Optionally, handle completion if needed
      }
    });

    console.log(typeof this.dataSource)
    console.log(typeof this.dataSource[0])

    console.log(this.dataSource)

  }









}
