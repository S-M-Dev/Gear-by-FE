import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { AuthRoutingModule } from './auth-routing.module';

import { AuthService } from './services/auth.service';

import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';
import { SharedModule } from '../shared/shared.module';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { ForgotPasswordPageComponent } from './pages/forgot-password-page/forgot-password-page.component';
import { ForgotPasswordService } from './services/forgot-password.service';

const MATERIAL_MODULES = [
  MatCardModule,
  MatInputModule,
  MatButtonModule,
]

@NgModule({
  declarations: [SignInPageComponent, SignUpPageComponent, ProfilePageComponent, ForgotPasswordPageComponent],
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES
  ],
  providers: [
    AuthService,
    ForgotPasswordService
  ]
})
export class AuthModule {}
