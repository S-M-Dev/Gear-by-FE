import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class ForgotPasswordService {
  private readonly apiUrl = 'code';

  constructor(private http: HttpClient) { }

  sendResetCodeByEmail(email: string): Observable<void> {
    return this.http.post<void>(this.apiUrl, { email });
  }

  validateResetCode(email: string, code: string): Observable<string> {
    return this.http.put<string>(this.apiUrl, { email, code });
  }
}
