import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from '@environments/environment';

import { Customer } from '@app/_models/customer';
import { FundTransfer } from '@app/_models/fundtransfer';
import { Login } from '@app/_models/login';
import { Admin } from '@app/_models/admin';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private adminSubject: BehaviorSubject<Admin>;
    public admin: Observable<Admin>;        //Admin observable
    private customerSubject: BehaviorSubject<Customer>;
    public customer: Observable<Customer>;   //Customer Observable

    constructor(
        private router: Router,
        private http: HttpClient
    ) {
        this.adminSubject = new BehaviorSubject<Admin>(new Admin);
        this.admin = this.adminSubject.asObservable();
        this.customerSubject = new BehaviorSubject<Customer>(new Customer);
        this.customer = this.customerSubject.asObservable();
    }


// to check in auth gaurd if admin subject is null for routing
    public get adminValue(): Admin {
        return this.adminSubject.value;
    }


// to check in auth gaurd if admin subject is null for routing
    public get customerValue(): Customer {
        return this.customerSubject.value;
    }
 

//to return an observable of customer
    onMessage(): Observable<any> {
        return this.customerSubject.asObservable();
    }

//to return an observable of admin    
    onAdminMessage(): Observable<any> {
        return this.adminSubject.asObservable();
    }


//admin login
    login(adminlogin: Login) {

        return this.http.post<any>(`${environment.apiUrl}/adminlogin`, adminlogin)
            .pipe(map(admin => {
                this.adminSubject.next(admin);
                return admin;
            }));
    }


//customer login
    loginC(login:Login) {
        console.log(login);
        return this.http.post<any>(`${environment.apiUrl}/customerlogin`, login)
            .pipe(map(customer => {
                this.customerSubject.next(customer);
                return customer;
            }));
    }


// Retrieve all customers
    loadcustomer() {
        return this.http.get<any>(`${environment.apiUrl}/getallcustomers`)
            .pipe(map(cust => {
               return cust;
            }));
    }


//create account
    createacc(customerid: number, account: any) {
        return this.http.post<any>(`${environment.apiUrl}/createaccount/${customerid}`, account )
            .pipe(map(data => {
               return data;
            }));
    }


//Fund Transfer
    fundtransfer(fundtransfer: FundTransfer) {
       console.log(fundtransfer);
        return this.http.post<any>(`${environment.apiUrl}/fundtransfer`, fundtransfer )
            .pipe(map(transaction => {
              return transaction;
            }));

    }


//to get all accounts of a customer
    getallaccountsofcustomer(customerid:number){
        return this.http.get<any>(`${environment.apiUrl}/getaccountsofcustomer/${customerid}`)
        .pipe(map(accounts => {
                console.log(accounts);
             return accounts;
        }));
    }


//to get Mini Transactions By Account Number
    getMiniTransactionsOfAccountNumber(accountid:number){
        return this.http.get<any>(`${environment.apiUrl}/getminitxns/${accountid}`)
        .pipe(map(transactions => {
                console.log(transactions);
              return transactions;
        }));
    }


//to get detailed transactions by from date and to date
    gettxnsbydate(accountid:number,fromdate:string,todate:string){
        return this.http.get<any>(`${environment.apiUrl}/getdetailedtxnsbydate/${accountid}/${fromdate}/${todate}`)
        .pipe(map(transactions => {
                console.log(transactions);
             return transactions;
        }));
    }


//to get Detailed Transactions BY Min and Max Amount
    gettxnsbyAmnt(accountid:number,minamnt:number,maxamnt:number){
        return this.http.get<any>(`${environment.apiUrl}/getdetailedtxnsbyamnt/${accountid}/${minamnt}/${maxamnt}`)
        .pipe(map(transactions => {
                console.log(transactions);
                return transactions;
        }));
    }


//to get Detailed Transactions BY From Account
    gettxnsbyfromacc(accountid:number,fromaccid:number){
        console.log(accountid,fromaccid)
        return this.http.get<any>(`${environment.apiUrl}/getdetailedtxnsbyfrmactno/${accountid}/${fromaccid}`)
        .pipe(map(transactions => {
                console.log(transactions);
                 return transactions;
        }));
    }


//to get Detailed Transactions BY To Account
    gettxnsbytoacc(accountid:number,toaccid:number){
        console.log(accountid,toaccid)
        return this.http.get<any>(`${environment.apiUrl}/getdetailedtxnsbytoactno/${accountid}/${toaccid}`)
        .pipe(map(transactions => {
                console.log(transactions);
                 return transactions;
        }));
    }


//Update details of customer
    update(customerid: number, updateCustomer: Customer) {
        console.log(customerid);
        console.log(updateCustomer);
        return this.http.put<any>(`${environment.apiUrl}/updatecustomer/${customerid}`,  updateCustomer )
            .pipe(map(updt => {
                console.log(updt);
                return updt;
            }));
    }


 //Admin Logout
    logout() {
        //nullify the admin subject
        this.adminSubject.next(null);
        this.router.navigate(['/login']);

    }


//Customer Logout
    logoutC() {
       //nullify the customer subject
        this.customerSubject.next(null);
        this.router.navigate(['/login']);
    }
}