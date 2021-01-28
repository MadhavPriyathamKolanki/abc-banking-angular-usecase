import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from '@app/_models';
import { AuthenticationService } from '@app/_services';

@Component({
  selector: 'app-update-details-status',
  templateUrl: './update-details-status.component.html',
  styleUrls: ['./update-details-status.component.css']
})
export class UpdateDetailsStatusComponent implements OnInit {
  customer:Customer;
  
  constructor(private Activatedroute:ActivatedRoute,
    private router:Router,private authenticationService: AuthenticationService) { 
     // console.log("from constructor"+this.router.getCurrentNavigation().extras.state);
    }

  ngOnInit(): void {
    // get the state from route
    this.customer=history.state;
    console.log(history.state+"update success");
  }
  logout(){
    this.authenticationService.logoutC();
   }
}
