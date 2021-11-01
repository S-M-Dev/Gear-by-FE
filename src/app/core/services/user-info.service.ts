import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of, ReplaySubject, Subject } from 'rxjs';
import { skipUntil, tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private readonly apiUrl = 'user';
  private readonly userInfo$ = new BehaviorSubject<User | null>(null);

  constructor(private http: HttpClient) {}

  fetchUserInfo() {
    return this.http.get<User>(this.apiUrl).pipe(
      tap((userInfo) => {
        this.userInfo$.next(userInfo);
      })
    );
  }

  getUserInfo() {
    return this.userInfo$.asObservable();
  }

  setToken(token: string) {
    localStorage.setItem('userToken', token);
  }

  getToken() {
    return localStorage.getItem('userToken');
  }

  clearUserData() {
    localStorage.removeItem('userToken');
  }
}
