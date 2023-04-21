import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient
  ) {}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
    });
  }
  submit() {
    this.http
      .post<any>('http://localhost:3000/profile', this.signupForm.value)
      .subscribe(
        (res) => {
          alert('OTP sent to your email');
          this.signupForm.reset();
          this.router.navigate(['otp']);
        },
        (err) => {
          alert('Something went wrong');
        }
      );
  }
}
