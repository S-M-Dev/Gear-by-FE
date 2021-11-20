import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HasAdminPermissionsGuard } from '../core/guards/has-admin-permissions.guard';
import { ConfirmOrderGuard } from './guards/confirm-order.guard';

import { AddItemPageComponent } from './pages/add-item-page/add-item-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { ConfirmOrderPageComponent } from './pages/confirm-order-page/confirm-order-page.component';
import { CatalogResolver } from './resolvers/catalog.resolver';

const routes: Routes = [
  { path: '', component: CatalogPageComponent, resolve: { items: CatalogResolver } },
  { path: 'cart', component: CartPageComponent },
  { path: 'add', component: AddItemPageComponent, canActivate: [HasAdminPermissionsGuard] },
  {
    path: 'confirm-order',
    component: ConfirmOrderPageComponent,
    canActivate: [ConfirmOrderGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CatalogRoutingModule { }
