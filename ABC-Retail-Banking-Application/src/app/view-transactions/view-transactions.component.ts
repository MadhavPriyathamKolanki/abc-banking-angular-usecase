import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Transaction } from '@app/_models';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-view-transactions',
  templateUrl: './view-transactions.component.html',
  styleUrls: ['./view-transactions.component.css']
})
export class ViewTransactionsComponent implements OnInit {

account:Account;
minitransactions: Transaction[];
routingbool: boolean;

  constructor(private Activatedroute:ActivatedRoute,
    private router:Router,private authenticationService: AuthenticationService) { 
     this.account=history.state;
     this.getminitransactions();
     if(this.authenticationService.adminValue.username=='admin'){
      this.routingbool=true;
    }
    else {
      this.routingbool=false;
    }
    }

    ngOnInit(): void {
      //console.log("from inint"+ history.state);
      this.account=history.state;
     
    }
i

// method to get last 10 transactions of this account from backend    
getminitransactions(){
  this.authenticationService.getMiniTransactionsOfAccountNumber(this.account.accountid).subscribe(
    message => {
     this.minitransactions=message;
    }
  )
}

//logout method
  logout(){
    this.authenticationService.logoutC();
  
   }
}
