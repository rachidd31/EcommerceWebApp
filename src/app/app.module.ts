import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ProductsHeaderComponent } from './pages/home/components/products-header/products-header.component';
import { ProductBoxComponent } from './pages/home/components/product-box/product-box.component';
import { FiltersComponent } from './pages/home/components/filters/filters.component';
import { HeaderComponent } from './components/header/header.component';
import { CartComponent } from './pages/cart/cart.component';
import { CartService } from './services/cart.service';
import { HttpClientModule } from '@angular/common/http';
import { StoreService } from './services/store.service';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import { ProductDetailsComponent } from './product-details/product-details.component';
import {AuthService} from "./services/auth.service";
import {SharedService} from "./services/shared.service";
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {environment} from "../environments/environment";
import {VarifyEmailComponent} from "./component/varify-email/varify-email.component";

import {LoginComponent} from "./component/login/login.component";
import {ForgotPasswordComponent} from "./component/forgot-password/forgot-password.component";
import {MatInputModule} from "@angular/material/input";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import { HistoryCommandsComponent } from './components/history-commands/history-commands.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AdminComponent } from './component/admin/admin.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsHeaderComponent,
    ProductBoxComponent,
    FiltersComponent,
    HeaderComponent,
    CartComponent,
    ProductDetailsComponent,
    VarifyEmailComponent,

    LoginComponent,
    ForgotPasswordComponent,
    HistoryCommandsComponent,
    ProfileComponent,
    AdminComponent

  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatSidenavModule,
        MatGridListModule,
        MatMenuModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        MatExpansionModule,
        MatTreeModule,
        MatListModule,
        MatToolbarModule,
        MatTableModule,
        MatBadgeModule,
        MatSnackBarModule,
        BrowserAnimationsModule,
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule,
        AngularFireAuthModule,

        // JwtModule.forRoot({
        //   config: {
        //     // Set the token getter function. This function should return the JWT token from wherever you have it stored.
        //     tokenGetter: () => {
        //       return localStorage.getItem('access_token');
        //     },
        //      allowedDomains:["http://localhost:8080"]
        //   },
        // }),

        FormsModule,
        MatDialogModule,
        MatInputModule,
        ReactiveFormsModule

    ],
  providers: [CartService, StoreService,AuthService,SharedService,HomeComponent ],
  bootstrap: [AppComponent],
})
export class AppModule {}
