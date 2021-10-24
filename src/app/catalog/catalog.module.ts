import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';


@NgModule({
  declarations: [
    CatalogPageComponent,
    CartPageComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule
  ]
})
export class CatalogModule { }
