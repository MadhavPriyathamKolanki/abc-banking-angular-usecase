import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Customer } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  customer: Customer;
  newaccount:Account;
  loading = false;
  submitted = false;
  form: FormGroup;
  error = '';
  constructor(private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

    //get the formgroup contols
  get f() {
    return this.form.controls;
  }


  ngOnInit(): void {
    this.customer = history.state;
    this.form = this.formBuilder.group({
      branch: ['', Validators.required],
      accounttype: ['', Validators.required],
      balance: ['', Validators.required]

    });
  }

  //logout
  logout() {
    this.authenticationService.logout();
  }


  //when form to create account is submitted
  onSubmit() {
    console.log(this.form.value);
    this.submitted = true;

    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.customer);
   

    this.authenticationService.createacc(this.customer.customerid, this.form.value)
      .pipe(first())
      .subscribe({
        next: (x) => {
          console.log(x);
          this.router.navigateByUrl('/acccreatestatus', { state: x });
        },
        error: error => {
          this.error = error;
          this.loading = false;
          console.log(error);
        }
      });
  }
}
