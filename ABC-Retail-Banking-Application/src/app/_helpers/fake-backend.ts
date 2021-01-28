/*
 import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { delay, materialize, dematerialize } from 'rxjs/operators';

import { Account, Role, Transaction } from '@app/_models';

const users = [
    { id: 1, username: 'admin', password: 'admin', role: Role.Admin },
    { id: 2, username: 'admin1', password: 'admin1', role: Role.Admin }
];
export const customers = [
    {
        customerId:1,
        cname: "Madhav",
        cpasssword :"qwerty",
        accts :[
            {
                AccId: 10,
                cId:1,
                Aname: "savings account",
                branch: "chennai",
                balance: 10000,
                txns :[
                    {
                        txnId: 1,
                        txnAmount: 100,
                        fromAccId: 1,
                        toAccId: 2,
                    },
                    {
                        txnId: 2,
                        txnAmount: 200,
                        fromAccId: 2,
                        toAccId: 1,
                    }
                ]
            },
            {
                AccId: 20,
                cId:1,
                Aname: "savings account",
                branch: "banglore",
                balance: 20000,
                txns :[
                    {
                        txnId: 1,
                        txnAmount: 300,
                        fromAccId: 1,
                        toAccId: 2,
                    },
                    {
                        txnId: 2,
                        txnAmount: 400,
                        fromAccId: 2,
                        toAccId: 1,
                    }
                ]
            }

        ]
    },
    {
        customerId:2,
        cname: "krishna",
        cpasssword :"qwerty",
        accts :[
            {
                AccId: 30,
                cId:2,
                Aname: "savings account",
                branch: "chennai",
                balance: 20000,
                txns :[
                    {
                        txnId: 1,
                        txnAmount: 140,
                        fromAccId: 1,
                        toAccId: 2,
                    },
                    {
                        txnId: 2,
                        txnAmount: 230,
                        fromAccId: 2,
                        toAccId: 1,
                    }
                ]
            },
            {
                AccId: 40,
                cId:2,
                Aname: "savings account",
                branch: "banglore",
                balance: 20000,
                txns :[
                    {
                        txnId: 1,
                        txnAmount: 300,
                        fromAccId: 1,
                        toAccId: 2,
                    },
                    {
                        txnId: 2,
                        txnAmount: 440,
                        fromAccId: 2,
                        toAccId: 1,
                    }
                ]
            }

        ]
    }
];
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
            
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = request;

        return handleRoute();        

        function handleRoute() {
            switch (true) {
                case url.endsWith('/users/authenticate') && method === 'POST':
                    return authenticate();
                    
                    case url.endsWith('/users/fundtransfer') && method === 'POST':
                    return fundTransfer();
                case url.endsWith('/users/cauthenticate') && method === 'POST':
                    return authenticatec();
                case url.endsWith('/users') && method === 'GET':
                    return getUsers();
                    case url.endsWith('/users/getallcust') && method === 'GET':
                    return getCusts();
                    case url.endsWith('/users/updatdetails') && method === 'POST':
                    return updateUser();
                    case url.endsWith('/users/createacc') && method === 'POST':
                    return createac();
                case url.match(/\/users\/\d+$/) && method === 'GET':
                    return getUserById();
                default:
                    // pass through any requests not handled above
                    return next.handle(request);
            }

        }

        // route functions
// Admin Authenticate
        function authenticate() {
            const { username, password } = body;
           
              const user = users.find(x => x.username === username && x.password === password);
              
              if (!user) return error('Username or password is incorrect');
              return ok({
                id: user.id,
                username: user.username,
                role: user.role,
                token: `fake-jwt-token.${user.id}`
                });
             
        }
//Customer Authenticate
        function authenticatec() {
            const { username, password} = body;
           
              const customer = customers.find(x => x.cname === username && x.cpasssword === password);
              if (!customer) return error('Username or password is incorrect');
              return ok({
                  custom: customer,
                token: `fake-jwt-token.${customer.customerId}`
                });
             
        }
// get all customers
        function getUsers() {
            if (!isAdmin()) return unauthorized();
            return ok(users);
        }
        function getCusts() {
            
            return ok(customers);
        }
        
//fund transfer 1st method
        function fundTransfer() {
            let fundtrans = body;
            //console.log(fundtrans);
            let Acc: Account;
            let ToAcc: Account;
            //console.log(fundtrans.fund.toCustName);
            let user1 = customers.find(x => x.accts.forEach(element => {
                if(element.AccId==fundtrans.fund.fromAcc){
                   
                    Acc=element;
                   // console.log("keep going"+ element.branch);
                }
            }) );
            let user2 = customers.find(x => x.accts.forEach(element => {
                if(element.AccId==fundtrans.fund.toAcc){
                   
                    ToAcc=element;
                    //console.log("keep going"+ element.branch);
                }
            }) );
            //var idtre:any =user1.accts;
            //for(var res of idtre ){
               // if(res.AccId==30){
                //    console.log(res.branch+"successful");
                //}
            //}
            //console.log(idtre);
            return transaction(Acc,ToAcc,fundtrans.fund.amount);
            //Object.assign
           // console.log(ToAcc);
           // console.log(Acc);
             
        }
 //Fund transfer 2nd call       
        function transaction(fromac:Account , toAc:Account,amt:number) {
            fromac.balance=fromac.balance-amt;
            toAc.balance=toAc.balance+amt;
            let Txns:Transaction=new Transaction();
            
            customers.find(x => x.accts.forEach(element => {
                if(element.AccId==fromac.AccId){
                   element.balance=fromac.balance;
                   //localStorage.setItem('custom', JSON.stringify(x));
                }
            }) );
            customers.find(x => x.accts.forEach(element => {
                if(element.AccId==toAc.AccId){
                   element.balance=toAc.balance;
                   //localStorage.setItem('custom', JSON.stringify(x));
                }
            }) );
            Txns.txnAmount=amt;
            Txns.fromAccId=fromac.AccId;
            Txns.toAccId=toAc.AccId;
            //Add Txn to From Account
            customers.find(x => x.accts.forEach(element => {
                if(element.AccId==fromac.AccId){
                    element.txns.concat(Txns);
                  // localStorage.setItem('custom', JSON.stringify(x));
                }
            }) );
            customers.find(x => x.accts.forEach(element => {
                if(element.AccId==toAc.AccId){
                    element.txns.concat(Txns);
                  // localStorage.setItem('custom', JSON.stringify(x));
                }
            }) );
            
            return ok(Txns);
            
            //console.log(customers);
            //console.log(toAc.balance);
           //console.log(fromac.balance);
        }
 //Update user       
        function updateUser() {
            
            console.log(body.id);
            console.log(body.params);
            let user = customers.find(x => x.customerId === body.id);
            delete body.params.confirmpass;
            

        // only update password if entered
           

            // update and save user
            Object.assign(user, body.params);
        
            //localStorage.setItem('custom', JSON.stringify(user));

            return ok(user);
        }
 //Create new acc       
        function createac() {
            
            
            let user = customers.find(x => x.customerId === body.id);
            body.params.AccId = newUserId();
            body.params.cId=user.customerId;
            Object.assign(user, body.params);
            console.log(body.id);
            console.log(body.params);
            //localStorage.setItem('custom', JSON.stringify(user));

            return ok(body.params);
        }

        function getUserById() {
            if (!isLoggedIn()) return unauthorized();

            // only admins can access other user records
            if (!isAdmin() && currentUser().id !== idFromUrl()) return unauthorized();

            const user = users.find(x => x.id === idFromUrl());
            return ok(user);
        }

        // helper functions

        function ok(body) {
            return of(new HttpResponse({ status: 200, body }))
                .pipe(delay(500)); // delay observable to simulate server api call
        }

        function unauthorized() {
            return throwError({ status: 401, error: { message: 'unauthorized' } })
                .pipe(materialize(), delay(500), dematerialize()); // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648);
        }

        function error(message) {
            return throwError({ status: 400, error: { message } })
                .pipe(materialize(), delay(500), dematerialize());
        }

        function isLoggedIn() {
            const authHeader = headers.get('Authorization') || '';
            return authHeader.startsWith('Bearer fake-jwt-token');
        }

        function isAdmin() {
            return isLoggedIn() && currentUser().role === Role.Admin;
        }

        function currentUser() {
            if (!isLoggedIn()) return;
            const id = parseInt(headers.get('Authorization').split('.')[1]);
            return users.find(x => x.id === id);
        }

        function idFromUrl() {
            const urlParts = url.split('/');
            return parseInt(urlParts[urlParts.length - 1]);
        }
        function newUserId() {
            return customers.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
        }
    }
}

export const fakeBackendProvider = {
    // use fake backend in place of Http service for backend-less development
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
}
*/
