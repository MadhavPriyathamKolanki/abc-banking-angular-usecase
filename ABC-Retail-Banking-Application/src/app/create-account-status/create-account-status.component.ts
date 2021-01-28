import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Customer } from '@app/_models';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-create-account-status',
  templateUrl: './create-account-status.component.html',
  styleUrls: ['./create-account-status.component.css']
})
export class CreateAccountStatusComponent implements OnInit {
  account:Account;
  constructor(private authenticationService: AuthenticationService,
    
    private route: ActivatedRoute, 
    private router: Router) { }

  ngOnInit(): void {
    this.account=history.state;
    console.log(history.state+"acc create success");
  }
  
  logout(){
      this.authenticationService.logout();
     }
}
