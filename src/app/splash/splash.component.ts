import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import * as EmailValidator from 'email-validator';
import { ApiService } from '../config/api.service';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.component.html',
  styleUrls: ['./splash.component.scss']
})
export class SplashComponent implements OnInit {
  registered: boolean;
  response: any;
  error: boolean;
  errorMsg: any;
  form = new FormGroup({
    email: new FormControl('', Validators.required)
  });
  @ViewChild('error') errorDiv: ElementRef;

  constructor(
    private api: ApiService
  ) { }

  ngOnInit(): void {
  }

  onSubmit() {}

  showError() {
    this.errorDiv.nativeElement.style.opacity = '1';
  }

  clearError() {
    this.errorDiv.nativeElement.style.opacity = '0';
  }

  validateEmail(text) {
    if (EmailValidator.validate(text)) {
      this.clearError();
    }
  }

  isValid(event) {
    if (!this.form.valid) {
      event.preventDefault();
      this.showError();
      this.errorMsg = 'Please write your email above to continue';
    } else if (this.form.valid && EmailValidator.validate(this.form.value.email)) {
      this.errorMsg = '';
      this.clearError();
      this.register();
    }
  }

  register() {
    this.api.launchNotification(this.form.value).subscribe(
      data => {
        if (data) {
          this.response = data;
          this.registered = true;
          this.errorMsg = '';
          this.clearError();
        }
      },
      err => {
        this.showError();
        this.errorMsg = 'This email has already signed up to be notified';
      }
    );
  }

  removeMe() {
    this.api.removeNotification(this.response.id).subscribe(
      data => {
        this.registered = false;
        this.showError();
        this.form.reset();
        this.errorMsg = 'We have removed your email from our system';
      },
      err => console.error(err)
    );
  }

}
