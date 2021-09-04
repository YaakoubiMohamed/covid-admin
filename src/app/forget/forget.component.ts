import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css']
})
export class ForgetComponent implements OnInit {

  frmPasswordReset: FormGroup;
  submitted = false;

  constructor(public authService: AuthService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.frmPasswordReset = this.fb.group({
      email: [null, [Validators.required, Validators.email]]
    });
  }

  get f() { return this.frmPasswordReset.controls; }

  sendPasswordResetRequest() {
    this.submitted = true;
    if (this.frmPasswordReset.invalid) {
      return;
    }
    else
    {
      this.authService.ForgotPassword(this.frmPasswordReset.value.email)
        .then(
          () => {
            console.log('Password reset request sent');
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

}
