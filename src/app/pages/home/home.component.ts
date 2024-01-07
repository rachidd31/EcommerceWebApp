import {Component, Injectable, OnDestroy, OnInit} from '@angular/core';
import {debounceTime, distinctUntilChanged, Observable, Subscription, switchMap} from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';
import { SharedService } from 'src/app/services/shared.service';
import {FormBuilder, FormGroup} from "@angular/forms";
import {Router} from "@angular/router";

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

@Injectable({
  providedIn: 'root',
})
export class HomeComponent implements OnInit, OnDestroy {
  cols = 3;
  rowHeight: number = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  count = '12';
  sort = 'desc';
  category: string | undefined;
  productsSubscription: Subscription | undefined;

  isDrawerOpened = false;
  subscription: Subscription | undefined;

  searchForm!: FormGroup;

  constructor(
      private fb: FormBuilder,
      private router:Router,
    private cartService: CartService,
    private storeService: StoreService,
    private sharedService: SharedService
  ) {

    this.getProducts();

    this.searchForm = this.fb.group({
      searchTerm: [''],
    });
  }


  showSideBar() {

    this.isDrawerOpened = !this.isDrawerOpened;
  }

  ngOnInit(): void {
    this.initSearchForm();
    this.subscription = this.sharedService.showSideBar$.subscribe(() => {
      this.showSideBar();
    });
  }

  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }

    this.subscription?.unsubscribe();
  }

  getProductsByName(name: string): Observable<Array<Product>> {
    return this.storeService.getProductsByName(name);
  }

  initSearchForm(): void {


    // Ensure searchForm is not null before accessing its properties
    if (this.searchForm?.get('searchTerm')) {
      // Subscribe to changes in the search term and trigger auto-search
      // @ts-ignore
      this.searchForm
          .get('searchTerm')
          .valueChanges.pipe(
          debounceTime(300),
          distinctUntilChanged(),
          switchMap((searchTerm) => this.getProductsByName(searchTerm))
      )
          .subscribe((_products) => {
            this.products = _products;
          });
    }
  }

  searchProducts(): void {
    // @ts-ignore
    const searchTerm = this.searchForm.get('searchTerm').value;
    this.productsSubscription = this.getProductsByName(searchTerm).subscribe((_products) => {
      this.products = _products;
    });
  }



  // ngOnInit(): void {
  //
  //   this.initSearchForm()
  //   this.subscription = this.sharedService.showSideBar$.subscribe(() => {
  //     this.showSideBar();
  //   });
  //
  // }
  //
  // ngOnDestroy(): void {
  //   if (this.productsSubscription) {
  //     this.productsSubscription.unsubscribe();
  //   }
  //
  //   this.subscription?.unsubscribe();
  // }
  //
  //
  //
  // // autoSearch
  //
  //
  // getProductsByName(name:string): Observable<Array<Product>> {
  //   return  this.storeService.getProductsByName(name)
  //
  // }
  // initSearchForm(): void {
  //
  //   this.searchForm = this.fb.group({
  //     searchTerm: [''] // Set an initial value if needed
  //   });
  //   this.initSearchForm();
  //   console.log("tik tok tik tok tik tok tik tok ");
  //   // Ensure searchForm is not null before accessing its properties
  //   if (this.searchForm?.get('searchTerm')) {
  //     // Subscribe to changes in the search term and trigger auto-search
  //     // @ts-ignore
  //     searchForm
  //         .get('searchTerm')
  //         .valueChanges.pipe(
  //         debounceTime(300),
  //         distinctUntilChanged(),
  //         switchMap(searchTerm => this.getProductsByName(searchTerm))
  //     )
  //         .subscribe((_products) => {
  //           this.products = _products;
  //         });
  //   }
  //
  //
  // }
  //
  //
  //
  // searchProducts(): void {
  //
  //
  //   //@ts-ignore
  //   const searchTerm = this.searchForm.get('searchTerm').value;
  //   this.productsSubscription = this.getProductsByName(searchTerm)
  //       .subscribe((_products) => {
  //         this.products = _products;
  //       });
  //
  //   console.log("the products length 2222222222222222222")
  //   console.log(this.products?.length)
  //
  // }



















  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[colsNum];
  }

  onItemsCountChange(count: number): void {
    this.count = count.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }

  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products) => {
        this.products = _products;
      });

    console.log("the products length")
    console.log(this.products?.length)
  }




  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }







}
