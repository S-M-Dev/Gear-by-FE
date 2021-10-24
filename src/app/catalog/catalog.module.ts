import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';

const MATERIAL_MODULES = [
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatCardModule,
  MatExpansionModule,
  MatSliderModule,
];

@NgModule({
  declarations: [
    CatalogPageComponent,
    CartPageComponent
  ],
  imports: [
    CommonModule,
    CatalogRoutingModule,
    ...MATERIAL_MODULES,
  ]
})
export class CatalogModule { }
