import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './pages/cart/cart.component';
import { HomeComponent } from './pages/home/home.component';
import {ProductDetailsComponent} from "./product-details/product-details.component";
import {LoginComponent} from "./component/login/login.component";
import {AuthGuard} from "./services/auth.guard";
import {HistoryCommandsComponent} from "./components/history-commands/history-commands.component";




const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    component: HomeComponent

  },
  {
    path: 'cart',
    component: CartComponent
  },

  {
    path: 'history',
    component: HistoryCommandsComponent, canActivate:[AuthGuard]
  },

  {path:"details", component: ProductDetailsComponent
  },

  { path: '', redirectTo: 'home', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
