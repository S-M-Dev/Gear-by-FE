import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { ApiInterceptor } from './interceptors/api.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

import { environment } from 'src/environments/environment';

const MATERIAL_MODULES = [
  MatCardModule,
  MatToolbarModule,
  MatInputModule,
  MatIconModule,
  MatButtonModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatAutocompleteModule,
];
const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LoadingSpinnerComponent,
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
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
  ]
})
export class CoreModule { }
