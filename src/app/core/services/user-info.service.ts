import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, ReplaySubject, Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserInfoService {
  private apiUrl = 'user';
  private readonly userInfo$: BehaviorSubject<User | null>;

  constructor(private http: HttpClient) {
    const storedUserData = localStorage.getItem('userInfo');

    this.userInfo$ = new BehaviorSubject(
      storedUserData
        ? JSON.parse(storedUserData)
        : null
    );
  }

  fetchUserInfo() {
    return this.http.get<User>(this.apiUrl).pipe(
      tap((userInfo) => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
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
    this.userInfo$.next(null);
  }
}
