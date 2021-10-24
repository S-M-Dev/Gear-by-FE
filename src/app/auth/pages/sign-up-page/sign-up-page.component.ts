import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gear-by-sign-up-page',
  templateUrl: './sign-up-page.component.html',
  styleUrls: ['./sign-up-page.component.scss']
})
export class SignUpPageComponent {
  public signUpForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public signUp() {}
}
