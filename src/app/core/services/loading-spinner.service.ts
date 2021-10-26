import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private isLoading$ = new Subject<boolean>();

  public isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public setLoadingState(isLoading: boolean) {
    this.isLoading$.next(isLoading);
  }
}
