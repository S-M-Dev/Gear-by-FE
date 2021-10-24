import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';

const routes: Routes = [
  { path: '', component: CatalogPageComponent },
  { path: 'cart', component: CartPageComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
