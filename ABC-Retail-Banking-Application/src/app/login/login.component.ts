import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Login } from '@app/_models/login';
import { AuthenticationService } from '@app/_services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  role: boolean;
  adminlogin:Login=new Login;
  customerlogin:Login=new Login;




  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute,
  private router: Router, private authenticationService: AuthenticationService) { 
  }


  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      role: ['', Validators.required]
    });
  }


//to get all the controls of login form group
  get f() { return this.loginForm.controls; }


//method called after user submits login form 
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    if (this.f.role.value == "Admin") {
      this.role = true;
      this.callAdminAuth();
    }
    if (this.f.role.value == "Customer") {
      this.callCustomAuth();
    }
 }

 
//for Admin Authentication if role is admin
  callAdminAuth() {
    this.adminlogin.username=this.f.username.value;
    this.adminlogin.password=this.f.password.value;
    this.authenticationService.login(this.adminlogin)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/admin');
        },
        error: error => {
          this.error = error;
          alert(error);
          this.loading = false;
        }
      });
  }


//For customer Authentication if role is customer
  callCustomAuth() {
    this.customerlogin.username=this.f.username.value;
    this.customerlogin.password=this.f.password.value;
    console.log(this.customerlogin)
    this.authenticationService.loginC(this.customerlogin)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigateByUrl('/customer');
        },
        error: error => {
          this.error = error;
          alert(error);
          this.loading = false;
        }
      });
  }
  
}
