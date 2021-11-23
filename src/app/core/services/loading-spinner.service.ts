import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private isLoading$ = new BehaviorSubject<boolean>(false);

  public isLoading(): Observable<boolean> {
    return this.isLoading$.asObservable();
  }

  public setLoadingState(isLoading: boolean) {
    this.isLoading$.next(isLoading);
  }
}
