import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService {
  constructor(private snackbar: MatSnackBar) { }

  public handleError(error: any): void {
    let message = 'Произошла ошибка. Повторите попытку позже';

    switch(error.status) {
      case 400:
        message = 'Проверьте правильность введенных данных';
        break;
      case 401:
        message = 'Неверное имя пользователя или пароль';
        break;
      case 403:
        message = 'Сессия истекла';
        break;
      case 409:
        message = 'Пользователь с таким email уже существует';
        break;
    }

    this.snackbar.open(message, 'Закрыть', { duration: 3000 });
  }
}
