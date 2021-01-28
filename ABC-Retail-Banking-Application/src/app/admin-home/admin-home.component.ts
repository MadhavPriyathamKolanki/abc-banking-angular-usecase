import { Component, OnInit } from '@angular/core';
import { Customer } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
  customers: Observable<Customer[]>;
  data:Customer[];
  term: string;

  
  constructor(private authenticationService: AuthenticationService) {
    this.customers=this.authenticationService.loadcustomer();
    this.customers.subscribe((x)=>this.data=x);
   }

  ngOnInit(): void {
  }
  
  logout(){
    this.authenticationService.logout();
   }
}
