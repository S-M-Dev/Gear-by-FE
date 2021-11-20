import { AuthService } from './../../services/auth.service';
import { ForgotPasswordService } from './../../services/forgot-password.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'gear-by-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent {
  submitCodeForm: FormGroup;
  codeVerificationForm: FormGroup;
  newPasswordForm: FormGroup;

  isCodeSent: boolean;
  isCodeVerified: boolean;

  private userId: string;

  constructor(
    private fb: FormBuilder,
    private forgotPasswordService: ForgotPasswordService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {
    this.submitCodeForm = this.fb.group({
      email: ['', Validators.required],
    });

    this.codeVerificationForm = this.fb.group({
      code: ['', Validators.required],
    });

    this.newPasswordForm = this.fb.group({
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
    });
  }

  sendCode() {
    this.forgotPasswordService.sendResetCodeByEmail(this.submitCodeForm.value.email)
      .subscribe(() => {
        this.isCodeSent = true;
      });
  }

  verifyCode() {
    const email = this.submitCodeForm.value.email;
    const code = this.codeVerificationForm.value.code;

    this.forgotPasswordService.validateResetCode(email, code)
      .subscribe((userId: string) => {
        this.isCodeVerified = true;
        this.userId = userId;
      });
  }

  resetPassword() {
    const password = this.newPasswordForm.value.password;
    const passwordConfirmation = this.newPasswordForm.value.confirmPassword;

    if (password !== passwordConfirmation) {
      this.snackbar.open('Пароли не совпадают');
    } else {
      this.authService.resetPassword(this.userId, password)
        .subscribe(() => {
          this.router.navigateByUrl('/');
        })
    }
  }

}
