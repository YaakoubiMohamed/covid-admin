import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  password: string;
  message: any;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    
  }


  login(email,password){
    console.log(email,password);
    this.message = this.authService
      .SignIn(email,password);
    console.log(this.message);
      
  }


}
