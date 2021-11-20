import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'gear-by-forgot-password-page',
  templateUrl: './forgot-password-page.component.html',
  styleUrls: ['./forgot-password-page.component.scss']
})
export class ForgotPasswordPageComponent implements OnInit {
  submitCodeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.submitCodeForm = this.fb.group({
      email: ['', Validators.required],
    });
  }

  ngOnInit(): void {
  }

}
