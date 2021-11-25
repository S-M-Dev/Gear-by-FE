import { UserInfoService } from './../../core/services/user-info.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';

import { SignInPayload, SignUpPayload, AuthResponse } from './../models/auth.model';
import { User } from 'src/app/core/models/user.model';

@Injectable()
export class AuthService {
  private readonly apiUrl = 'user';

  constructor(private http: HttpClient, private userInfoService: UserInfoService) { }

  signIn(payload: SignInPayload) {
    return this.http.post<AuthResponse>(`${this.apiUrl}/auth`, payload).pipe(
      switchMap((response) => this.handleAuthPostStep(response))
    );
  }

  signUp(payload: SignUpPayload) {
    return this.http.post<AuthResponse>(this.apiUrl, payload).pipe(
      switchMap((response) => this.handleAuthPostStep(response))
    );
  }

  editUser(payload: User) {
    return this.http.put<User>(this.apiUrl, payload).pipe(
      tap((user) => {
        this.userInfoService.setUserInfo(user);
      })
    )
  }

  resetPassword(id: string, password: string) {
    return this.http.patch<AuthResponse>(this.apiUrl, { password, id }).pipe(
      switchMap((response) => this.handleAuthPostStep(response))
    );
  }

  private handleAuthPostStep({ token }: AuthResponse) {
    this.userInfoService.setToken(token);
    return this.userInfoService.fetchUserInfo();
  }
}
