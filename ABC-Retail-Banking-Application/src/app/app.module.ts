import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { CustomerHomeComponent } from './customer-home/customer-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ErrorInterceptor } from './_helpers';
import { ViewTransactionsComponent } from './view-transactions/view-transactions.component';
import { FundTransferStatusComponent } from './fund-transfer-status/fund-transfer-status.component';
import { UpdateDetailsStatusComponent } from './update-details-status/update-details-status.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { CreateAccountComponent } from './create-account/create-account.component';
import { CreateAccountStatusComponent } from './create-account-status/create-account-status.component';
import { ViewAccountSummaryComponent } from './view-account-summary/view-account-summary.component';
import { ViewDetailedTransactionsComponent } from './view-detailed-transactions/view-detailed-transactions.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CustomerHomeComponent,
    AdminHomeComponent,
    ViewTransactionsComponent,
    FundTransferStatusComponent,
    UpdateDetailsStatusComponent,
    CreateAccountComponent,
    CreateAccountStatusComponent,
    ViewAccountSummaryComponent,
    ViewDetailedTransactionsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SearchPipeModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
