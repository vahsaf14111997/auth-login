import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email : new FormControl(''),
    password: new FormControl(''),
  })

  constructor(private auth:AuthService, private router : Router) { }

  ngOnInit(): void {
    if(this.auth.isLoggedIn()){
      this.router.navigate(['admin'])
    }
  }
  onSubmit() : void{
    if(this.loginForm.valid){
      this.auth.login(this.loginForm.value).subscribe(
        (res) => {
          this.router.navigate(['admin'])
        },
        (err:Error) => {
          alert(err.message)
        }
      );
    }    
  }

}
