import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Cart, CartItem } from '../models/cart.model';
import {Observable, of, switchMap, take} from "rxjs";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireAuth} from "@angular/fire/compat/auth";
// import { collection, addDoc } from "firebase/firestore";
import {doc, getFirestore, setDoc,addDoc,collection,getDocs,query,orderBy} from "@angular/fire/firestore";
import {environment} from "../../environments/environment";
import {initializeApp} from "@angular/fire/app";
import {serverTimestamp} from "@angular/fire/database";



@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({ items: [] });


   public db = getFirestore(initializeApp(environment.firebase));

  constructor(private _snackBar: MatSnackBar, private firestore: AngularFirestore,private auth:AngularFireAuth) {}

  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];

    const itemInCart = items.find((_item) => _item.id === item.id);
    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }

    this.cart.next({ items });
    this._snackBar.open('1 item added to cart.', 'Ok', { duration: 3000 });
  }

  removeFromCart(item: CartItem, updateCart = true): CartItem[] {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id !== item.id
    );

    if (updateCart) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open('1 item removed from cart.', 'Ok', {
        duration: 3000,
      });
    }

    return filteredItems;
  }

  removeQuantity(item: CartItem): void {
    let itemForRemoval!: CartItem;

    let filteredItems = this.cart.value.items.map((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;
        }
      }

      return _item;
    });

    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }

    this.cart.next({ items: filteredItems });
    this._snackBar.open('1 item removed from cart.', 'Ok', {
      duration: 3000,
    });
  }

  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart is cleared.', 'Ok', {
      duration: 3000,
    });
  }

  getTotal(items: CartItem[]): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }


  async saveCartItems(cartItems: any[]): Promise<void> {
    // Use await to wait for the authentication state
    const user = await this.auth.authState.pipe(take(1)).toPromise();

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleString();

    if (user) {
      const userId = user.uid;
      console.log("fantanta !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!")
      console.log("User ID : "+userId)

      // Reference to the 'carts' collection
      const cartsCollection = collection(this.db, 'carts');

      // Create a new cart document with a generated ID
      const newCartDocRef = await addDoc(cartsCollection, {
        userId: userId,
        createdTime:formattedDate,
        items: cartItems
      });

      console.log('New cart created with ID:', newCartDocRef.id);
    }
  }




  // Method to retrieve cart items from Firestore
  getCartItems(): Observable<any[]> {

    return this.auth.authState.pipe(

        switchMap(user => {
          if (user) {
            const userId = user.uid;
            const cartItemsCollection = collection(this.db, 'carts');

            // Create a query to order items by createdTime
            const q = query(cartItemsCollection, orderBy('createdTime'));

            // Get the documents from the subcollection
            return getDocs(q).then(querySnapshot => {
              // Convert query snapshot to an array of items
              const item_s: any[] | PromiseLike<any[]> = [];
              querySnapshot.forEach(doc => {
                item_s.push({ id: doc.id, ...doc.data() });
              });

              console.log("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++")

              return item_s;
            });
          } else {
            // Return an empty array or handle the case when there's no user
            return Promise.resolve([]);
          }
        })
    );
  }

}
