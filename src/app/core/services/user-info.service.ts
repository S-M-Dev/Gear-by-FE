import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, ReplaySubject } from 'rxjs';
import { tap, skipUntil, finalize } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private readonly apiUrl = 'user';
  private readonly userInfo$ = new BehaviorSubject<User | null>(null);
  private readonly loadingFinished$ = new ReplaySubject();

  constructor(private http: HttpClient) {}

  fetchUserInfo() {
    if (this.getToken()) {
      return this.http.get<User>(this.apiUrl).pipe(
        tap((userInfo) => {
          this.loadingFinished$.next();
          this.userInfo$.next(userInfo);
        }),
        finalize(() => {
          this.loadingFinished$.next();
        })
      );
    }

    this.loadingFinished$.next();
    return of();
  }

  getUserInfo() {
    return this.userInfo$.pipe(
      skipUntil(this.loadingFinished$)
    );
  }

  setUserInfo(user: User) {
    this.userInfo$.next(user);
  }

  setToken(token: string) {
    localStorage.setItem('userToken', token);
  }

  getToken() {
    return localStorage.getItem('userToken');
  }

  clearUserData() {
    localStorage.removeItem('userToken');
    this.userInfo$.next(null);
  }
}
