import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

import { ApiInterceptor } from './interceptors/api.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';

const MATERIAL_MODULES = [
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
]

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
];
const PAGES = [
  NotFoundPageComponent,
];

@NgModule({
  declarations: [  ...COMPONENTS, ...PAGES ],
  exports: [ ...COMPONENTS, ...PAGES ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class CoreModule { }
