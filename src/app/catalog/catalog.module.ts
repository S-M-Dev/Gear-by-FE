import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatToolbarModule } from '@angular/material/toolbar';

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ItemModalComponent } from './components/item-modal/item-modal.component';
import { SharedModule } from '../shared/shared.module';
import { AddItemPageComponent } from './pages/add-item-page/add-item-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogResolver } from './resolvers/catalog.resolver';
import { PartItemComponent } from './components/part-item/part-item.component';
import { IsInCartPipe } from './pipes/is-in-cart.pipe';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { OrderService } from './services/order.service';
import { ConfirmOrderPageComponent } from './pages/confirm-order-page/confirm-order-page.component';

const MATERIAL_MODULES = [
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatSidenavModule,
  MatCardModule,
  MatExpansionModule,
  MatSliderModule,
  MatDialogModule,
  MatDatepickerModule,
  MatMomentDateModule,
  MatToolbarModule,
];

@NgModule({
  declarations: [
    CatalogPageComponent,
    CartPageComponent,
    ItemModalComponent,
    AddItemPageComponent,
    PartItemComponent,
    IsInCartPipe,
    CartItemComponent,
    ConfirmOrderPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    CatalogRoutingModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  providers: [
    CatalogResolver,
    OrderService,
  ]
})
export class CatalogModule { }
