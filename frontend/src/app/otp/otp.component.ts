import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css'],
})
export class OtpComponent {
  title = 'Verification Code';

  constructor(
    private readonly router: Router,
    private readonly http: HttpClient
  ) {}

  ngOnInit(): void {}

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

  submit() {}
}
