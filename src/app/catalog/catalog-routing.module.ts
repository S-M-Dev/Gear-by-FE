import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HasAdminPermissionsGuard } from '../core/guards/has-admin-permissions.guard';
import { AboutPageComponent } from './pages/about-page/about-page.component';

import { AddItemPageComponent } from './pages/add-item-page/add-item-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { DeliveryPageComponent } from './pages/delivery-page/delivery-page.component';
import { CatalogResolver } from './resolvers/catalog.resolver';

const routes: Routes = [
  { path: '', component: CatalogPageComponent, resolve: { items: CatalogResolver } },
  { path: 'about', component: AboutPageComponent },
  { path: 'delivery', component: DeliveryPageComponent },
  { path: 'cart', component: CartPageComponent },
  { path: 'add', component: AddItemPageComponent, canActivate: [HasAdminPermissionsGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
