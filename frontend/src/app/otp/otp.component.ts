import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { otpInterface } from '../interface/emailInterface';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent implements OnInit {
  title = 'Verification Code';
  public otpForm!: FormGroup;

  constructor(
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {
    this.otpForm = this.formBuilder.group({
      email: ['', { validators: [Validators.required, Validators.email] }],
      otp: ['', { validators: [Validators.required] }],
    });
  }

  fillBoxManually(
    $event: KeyboardEvent,
    previous: any,
    current: any,
    nextBox: any
  ) {
    const getLength = current.value.length.toString();
    const getAnotherLength = current.getAttribute('maxlength');
    if (getLength === getAnotherLength) {
      if (nextBox != '') {
        console.log(nextBox);
        nextBox.focus();
      }
    }
    if ($event.key === 'Backspace') {
      if (previous != '') {
        previous.focus();
      }
    }
  }

  autoPasteInBox() {}

  submit() {
    this.http
      .post<otpInterface>(
        'http://localhost:3000/api/verify-otp',
        this.otpForm.value
      )
      .subscribe(
        (res) => {
          alert('Email verification matched, Thank you!!!');
          this.otpForm.reset();
          this.router.navigate(['dashboard']);
        },
        (err) => {
          console.log(err);
          alert('Something went wrong');
        }
      );
  }
}
