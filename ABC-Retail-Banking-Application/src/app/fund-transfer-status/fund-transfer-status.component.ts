import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer, Transaction } from '@app/_models';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-fund-transfer-status',
  templateUrl: './fund-transfer-status.component.html',
  styleUrls: ['./fund-transfer-status.component.css']
})
export class FundTransferStatusComponent implements OnInit {
transaction:Transaction;

constructor(private Activatedroute:ActivatedRoute,
  private router:Router,private authenticationService: AuthenticationService) { 
   // console.log("from constructor"+this.router.getCurrentNavigation().extras.state);
  }

  ngOnInit(): void {
    //get the state from route
    this.transaction=history.state;
    console.log(this.transaction);
  }
  logout(){
    this.authenticationService.logoutC();
   }
}
