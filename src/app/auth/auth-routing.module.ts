import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { IsNotAuthenticatedGuard } from '../core/guards/is-not-authenticated.guard';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { SignInPageComponent } from './pages/sign-in-page/sign-in-page.component';
import { SignUpPageComponent } from './pages/sign-up-page/sign-up-page.component';

const routes: Routes = [
  {
    path: 'sign-in',
    component: SignInPageComponent,
    canActivate: [IsNotAuthenticatedGuard],
  },
  {
    path: 'sign-up',
    component: SignUpPageComponent,
    canActivate: [IsNotAuthenticatedGuard],
  },
  {
    path: 'profile',
    component: ProfilePageComponent,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
