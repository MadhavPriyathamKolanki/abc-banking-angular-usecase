import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CreateAccountStatusComponent } from './create-account-status/create-account-status.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { FundTransferStatusComponent } from './fund-transfer-status/fund-transfer-status.component';
import { LoginComponent } from './login/login.component';
import { UpdateDetailsStatusComponent } from './update-details-status/update-details-status.component';
import { ViewAccountSummaryComponent } from './view-account-summary/view-account-summary.component';
import { ViewDetailedTransactionsComponent } from './view-detailed-transactions/view-detailed-transactions.component';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { AuthGuard } from './_helpers';
import { Role } from './_models';

const routes: Routes = [
  {
    path: 'customer',
    component: CustomerHomeComponent,  //the path to a customer home page
    canActivate: [AuthGuard],
    data: { roles: [Role.User] }
  },
  {
  path: 'transactions',
  component: ViewTransactionsComponent,  //the path for customer to view mini-transactions summary
  
  },
  {
  path: 'detailedtransactions',
  component: ViewDetailedTransactionsComponent, //the path for customers to view detailed-transaction summary
 
  },

  {
  path: 'accsumry',
  component: ViewAccountSummaryComponent,  //the path for admin to view a customer's Account summary
  canActivate: [AuthGuard],
  data: { roles: [Role.Admin] }
  },
  {
  path: 'acccreatestatus',
  component: CreateAccountStatusComponent, //the path for admin to view account-creation-status after he created an account for a customer
  canActivate: [AuthGuard],
  data: { roles: [Role.Admin] }
  },
  {
  path: 'createAcc',
  component: CreateAccountComponent,//the path for admin to create an account for a customer
  canActivate: [AuthGuard],
  data: { roles: [Role.Admin] }
  },
  {
  path: 'updatestatus',
  component: UpdateDetailsStatusComponent, //the path for customer to view updation-status after he updated personal-details
  canActivate: [AuthGuard],
  data: { roles: [Role.User] }
  },
  {
  path: 'fundtransfer',
  component: FundTransferStatusComponent, //the path for customer to do a fund transfer
  canActivate: [AuthGuard],
  data: { roles: [Role.User] }
  },
  {
  path: 'admin',
  component: AdminHomeComponent,  //the path to a admin home page
  canActivate: [AuthGuard],
  data: { roles: [Role.Admin] }
  },
  {
  path: 'login',
  component: LoginComponent,    // the path to login page
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // default root path
  { path: '**', component: LoginComponent }  //wildcard path
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
