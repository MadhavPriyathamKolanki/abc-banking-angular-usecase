import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Account, Transaction } from '@app/_models';
import { AuthenticationService } from '@app/_services';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-view-detailed-transactions',
  templateUrl: './view-detailed-transactions.component.html',
  styleUrls: ['./view-detailed-transactions.component.css']
})
export class ViewDetailedTransactionsComponent implements OnInit {
searchfilter:string;
  account:Account;
  detailedtransactions:Transaction[];
  searchbydate:FormGroup;
  searchbyamt:FormGroup;
  searchByFromAccount: FormGroup;
  SearchByToAccount:FormGroup;
  routingbool: boolean;

  constructor(private Activatedroute:ActivatedRoute,private formBuilder: FormBuilder,
    private router:Router,private authenticationService: AuthenticationService) { 
      this.account=history.state;
     if(this.authenticationService.adminValue.username=='admin'){
      this.routingbool=true;
    }
    else if(this.authenticationService.customerValue){
      this.routingbool=false;
    }
    }

  ngOnInit(): void {
    this.searchbydate = this.formBuilder.group({
      fromdate: ['', Validators.required],
      todate: ['', Validators.required]
    });
    this.searchbyamt = this.formBuilder.group({
      minamnt: ['', Validators.required],
      maxamnt: ['', Validators.required]
    });
    this.searchByFromAccount = this.formBuilder.group({
      fromaccid: ['', Validators.required]
    });
    this.SearchByToAccount = this.formBuilder.group({
      toaccid: ['', Validators.required]
    });
  }


 //to get all the controls of searchbydate form group 
  get f() { return this.searchbydate.controls; }

  //to get all the controls of searchbyamt form group
  get g() { return this.searchbyamt.controls; }

  //to get all the controls of searchByFromAccount form group
  get h() { return this.searchByFromAccount.controls; }

  //to get all the controls of SearchByToAccount form group
  get i() { return this.SearchByToAccount.controls; }


// method to call when searchbydate formgroup is submitted
onDateSubmit(){
    console.log(this.f.fromdate.value+this.f.todate.value);
this.authenticationService.gettxnsbydate(this.account.accountid,
  this.f.fromdate.value,this.f.todate.value).subscribe(
    message => {
      this.detailedtransactions=message;
    }
  )
  }
  logout(){
    this.authenticationService.logoutC();
  
   }

// method to call when searchByFromAccount formgroup is submitted  
   onFromAccountSubmit(){
     console.log(this.account.accountid + 
      this.h.fromaccid.value)
    this.authenticationService.gettxnsbyfromacc(this.account.accountid,
      this.h.fromaccid.value).subscribe(
        message => {
          this.detailedtransactions=message;
        }
      )
   }


// method to call when SearchByToAccount formgroup is submitted  
   onToAccountSubmit(){
    console.log(this.account.accountid + 
      this.i.toaccid.value)
    this.authenticationService.gettxnsbytoacc(this.account.accountid,
      this.i.toaccid.value).subscribe(
        message => {
          this.detailedtransactions=message;
        }
      )
   }


// method to call when searchbyamt formgroup is submitted ie max and min amnt
  onAmtSubmit(){
    this.authenticationService.gettxnsbyAmnt(this.account.accountid,
      this.g.minamnt.value,this.g.maxamnt.value).subscribe(
        message => {
          this.detailedtransactions=message;
        }
      )
  }


// method to save table values to excel sheet  
  exportexcel(): void 
    {
       /* table id is passed over here */   
       let element = document.getElementById('excel-table'); 
       const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);

       /* generate workbook and add the worksheet */
       const wb: XLSX.WorkBook = XLSX.utils.book_new();
       XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

       /* save to file */
       XLSX.writeFile(wb, 'DetailedTransactionSummary.xlsx');
			
    }

// method to set the form group to be selected based on radio button selected
  setradio(filtervalue: string): void   
  {  
  
        this.searchfilter = filtervalue;  
          
  } 
  
// method called to check if a form group should be displayed
  isSelected(name: string): boolean   
  {  
  
        if (!this.searchfilter) { // if no radio button is selected, always return false so nothing is shown  
            return false;  
  }  
  
        return (this.searchfilter === name); // if current radio button is selected, return true, else return false  
    }  
}
