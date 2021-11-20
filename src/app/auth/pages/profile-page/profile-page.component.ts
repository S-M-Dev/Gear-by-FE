import { AuthService } from './../../services/auth.service';
import { UserInfoService } from './../../../core/services/user-info.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/core/models/user.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'gear-by-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {
  userInfoForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userInfoService: UserInfoService,
    private authService: AuthService,
    private snackbar: MatSnackBar,
  ) {
    this.userInfoForm = this.fb.group({
      email: [{ value: '', disabled: true }],
      fullName: '',
      phoneNumber: ['', Validators.required],
      address: '',
    });
  }

  ngOnInit(): void {
    this.userInfoService.getUserInfo().subscribe((user) => {
      this.userInfoForm.patchValue(user as User);
    })
  }

  editUser(): void {
    const newUser = this.userInfoForm.value;
    this.authService.editUser(newUser).subscribe(() => {
      this.snackbar.open('Данные успешно изменены');
    });
  }
}
