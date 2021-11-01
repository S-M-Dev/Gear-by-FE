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

import { CatalogRoutingModule } from './catalog-routing.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { CartPageComponent } from './pages/cart-page/cart-page.component';
import { ItemModalComponent } from './components/item-modal/item-modal.component';
import { SharedModule } from '../shared/shared.module';
import { AddItemPageComponent } from './pages/add-item-page/add-item-page.component';
import { PartsService } from './services/parts.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CatalogResolver } from './resolvers/catalog.resolver';
import { PartItemComponent } from './components/part-item/part-item.component';

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
  MatMomentDateModule
];

@NgModule({
  declarations: [
    CatalogPageComponent,
    CartPageComponent,
    ItemModalComponent,
    AddItemPageComponent,
    PartItemComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CatalogRoutingModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  providers: [
    PartsService,
    CatalogResolver,
  ]
})
export class CatalogModule { }
