import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { CardFormWrapperComponent } from './components/card-form-wrapper/card-form-wrapper.component';
import { HasAdminPermissionPipe } from './pipes/has-admin-permission.pipe';
import { LandingBannerComponent } from './components/landing-banner/landing-banner.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
];

const DECLARATIONS = [
  CardFormWrapperComponent,
  HasAdminPermissionPipe,
  LandingBannerComponent,
];

@NgModule({
  declarations: [
    ...DECLARATIONS,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    ...DECLARATIONS,
  ]
})
export class SharedModule { }
