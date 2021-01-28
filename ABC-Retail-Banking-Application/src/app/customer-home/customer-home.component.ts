import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MustMatch } from '@app/_helpers/must-match.validator';
import { Account, Customer } from '@app/_models';
import { FundTransfer } from '@app/_models/fundtransfer';

import { AuthenticationService } from '@app/_services';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit, OnDestroy {
  customer: Customer;
  updateCustomer :Customer;
  accounts: Account[];
  custId: number;
  subscription: Subscription;
  fundTransfer: FormGroup;
  updateDetails: FormGroup;
  loading = false;
  submitted = false;
  loading1 = false;
  submitted1 = false;
  error = '';
  ft: FundTransfer;


  constructor(private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {
    this.subscription = this.authenticationService.onMessage().subscribe(message => {
      if (message) {
        this.customer = message;
        this.getaccounts();
      } else {
        // clear messages when empty message received
        this.customer = null;
      }
    });
  }

  ngOnInit(): void {
    this.fundTransfer = this.formBuilder.group({
      fromaccountnumber: ['', Validators.required],
      toaccountnumber: ['', Validators.required],
      transactionamount: ['', Validators.required]
    });
    const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmpass') };
    this.updateDetails = this.formBuilder.group({
      firstname:[''],
      lastname:[''],
      username: [''],
      password: [''],
      address:[''],
      email:[''],
      confirmpass: ['']
    }, formOptions
    );
   this.updateDetails.patchValue(this.customer);
 }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


  //to get all accounts of this customer
  getaccounts()
  {
    if(this.customer!=null){
      this.authenticationService.getallaccountsofcustomer(this.customer.customerid).subscribe(
        message => {
          this.accounts=message;
        }
      )
    }
    else{
      this.router.navigate(['/login']);
    }
  }


  //method called when Fund Transfer Form is submitted
  onSubmitFT() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.fundTransfer.invalid) {
      return;
    }
    this.loading = true;
    console.log(this.fundTransfer.value)
    this.ft = this.fundTransfer.value;
    this.authenticationService.fundtransfer(this.fundTransfer.value)
      .pipe(first())
      .subscribe({
        next: (x) => {
          // console.log(x);
         this.router.navigateByUrl('/fundtransfer', { state: x });
        },
        error: error => {
          this.error = error;
          alert(error);
          this.loading = false;
          console.log(error);
        }
      });

  }


//method called when Update details form
  onSubmitUpdt() {
    this.submitted1 = true;
 // stop here if form is invalid
    if (this.updateDetails.invalid) {
      return;
    }
    //updatestatus
    this.loading1 = true;
    this.updateCustomer=new Customer;
    this.updateCustomer.firstname=this.updateDetails.get('firstname').value;
    this.updateCustomer.lastname=this.updateDetails.get('lastname').value;
    this.updateCustomer.username=this.updateDetails.get('username').value;
    this.updateCustomer.password=this.updateDetails.get('password').value;
    this.updateCustomer.email=this.updateDetails.get('email').value;
    this.updateCustomer.address=this.updateDetails.get('address').value;
    this.authenticationService.update(this.customer.customerid, this.updateCustomer)
      .pipe(first())
      .subscribe({
        next: (x) => {
          // console.log(x);
          this.customer=x;
          this.updateDetails.patchValue(this.customer);
          this.router.navigateByUrl('/updatestatus', { state: x });
        },
        error: error => {
          this.error = error;
          alert(error);
          this.loading = false;
          console.log(error);
        }
      });

  }


//to get all the controls of fundTransfer form group
  get f() {
    return this.fundTransfer.controls;
  }


//to get all the controls of updateDetails form group 
  get u() {
    return this.updateDetails.controls;
  }
// to logout the customer  
  logout() {
    this.authenticationService.logoutC();
  }

 
}
