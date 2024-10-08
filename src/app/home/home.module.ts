import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    LandingPageComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    HomeRoutingModule
  ]
})
export class HomeModule { }
