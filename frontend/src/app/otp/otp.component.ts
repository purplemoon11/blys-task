import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { otpInterface } from '../interface/emailInterface';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  title = 'Verifiy Email and OTP';
  public otpForm!: FormGroup;

  constructor(
    private readonly messageService: MessageService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      otp: [
        '',
        {
          validators: [
            Validators.required,
            Validators.pattern('[a-zA-z0-9]{1}'),
          ],
        },
      ],
    });
  }

  submit() {
    this.http
      .post<otpInterface>(
        'https://otp-validation.onrender.com/api/verify',
        this.otpForm.value
      )
      .subscribe(
        (res) => {
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: 'Email and Otp has been verified !!!',
          });
          setTimeout(() => {
            this.otpForm.reset();
            this.router.navigate(['dashboard']);
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
