import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { otpInterface } from '../interface/emailInterface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [MessageService],
})
export class SignupComponent implements OnInit {
  public signupForm!: FormGroup;
  public clicked: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient,
    private readonly messageService: MessageService
  ) {}
  ngOnInit(): void {
    this.signupForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
    });
  }
  submit() {
    this.http
      .post<otpInterface>(
        'https://otp-validation.onrender.com/api/send-otp',
        this.signupForm.value
      )
      .subscribe(
        (res) => {
          this.clicked = false;
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Email has been sent to you email address',
          });
          setTimeout(() => {
            this.signupForm.reset();
            this.router.navigate(['otp']);
          }, 2000);
        },
        (err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Something went wrong, Try again',
          });
        }
      );
  }
}
