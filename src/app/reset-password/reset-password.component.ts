import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  frmPasswordReset: FormGroup;
  submitted = false;
  code: any;

  constructor(public authService: AuthService, private route: ActivatedRoute, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    this.code = this.route.snapshot.queryParams['oobCode'];
    this.frmPasswordReset = this.fb.group({
      password: [null, [Validators.required]],
      confirmPassword: [null, [Validators.required]]
    });
  }

  get f() { return this.frmPasswordReset.controls; }

  reset(){
    this.submitted = true;
    const password = this.frmPasswordReset.controls['password'].value;
    const confirmPassword = this.frmPasswordReset.controls['confirmPassword'].value;

    if (password !== confirmPassword || this.frmPasswordReset.invalid) {
      return;
    }
    else
    {
      this.authService.confirmPasswordReset(this.code, password)
        .then(
          () => {
            this.router.navigate(['login'])
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }

}
