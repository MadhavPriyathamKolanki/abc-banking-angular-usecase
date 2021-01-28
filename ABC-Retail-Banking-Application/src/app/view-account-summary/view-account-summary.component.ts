import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@app/_models';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-view-account-summary',
  templateUrl: './view-account-summary.component.html',
  styleUrls: ['./view-account-summary.component.css']
})
export class ViewAccountSummaryComponent implements OnInit {
  customer:Customer;
  accounts:Account[];
  constructor(private authenticationService: AuthenticationService,
    
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.customer=history.state;
    this.getaccounts();
    console.log(history.state+"acc create success");
  }

  
  // method to get all accounts of this customer from backend
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

  //logout
  logout(){
    this.authenticationService.logout();
   }
}
