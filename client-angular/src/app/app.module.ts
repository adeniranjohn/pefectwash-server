import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavComponent } from './nav/nav.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminboardComponent } from './adminboard/adminboard.component';
import { CreateshopComponent } from './createshop/createshop.component';
import { CustomerComponent } from './customer/customer.component';
import { CustomersComponent } from './customers/customers.component';
import { RegCustomerComponent } from './reg-customer/reg-customer.component';
import { EditCustomerComponent } from './edit-customer/edit-customer.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AuthGuard } from './auth.guard';
import { AuthenticateService } from './authenticate.service';
import { JwtModule } from '@auth0/angular-jwt';
import { Interceptor } from './interceptor/interceptor';
import { AdminNavComponent } from './admin-nav/admin-nav.component';
import { ShopsComponent } from './shops/shops.component';
import { ShopComponent } from './shop/shop.component';
import { EditshopComponent } from './editshop/editshop.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { ContactComponent } from './contact/contact.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';

export function getToken(){
  return localStorage.getItem('token');
}
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavComponent,
    FooterComponent,
    AdminComponent,
    DashboardComponent,
    AdminboardComponent,
    CreateshopComponent,
    CustomerComponent,
    CustomersComponent,
    RegCustomerComponent,
    EditCustomerComponent,
    ChangePasswordComponent,
    AdminNavComponent,
    ShopsComponent,
    ShopComponent,
    EditshopComponent,
    ContactComponent,
    PagenotfoundComponent
  ],
  imports: [
    JwtModule.forRoot({
      config: {
        tokenGetter: getToken,
        whitelistedDomains: ['http://localhost:4200/', 'http://localhost:4200/admin' ],
        blacklistedRoutes: []
      }
    }),
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: '',
        component: HomeComponent
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'contact',
        component: ContactComponent
      },
      {
        path: 'admin',
        component: AdminComponent
      },
      {
        path: 'dashboard',
        component: DashboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/createshop',
        component: CreateshopComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/adminboard',
        component: AdminboardComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/washes',
        component: CustomersComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/makeawash',
        component: RegCustomerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/washes/:id',
        component: EditCustomerComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/changepassword/:phonenumber',
        component: ChangePasswordComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/shops',
        component: ShopsComponent,
        canActivate: [AuthGuard]
      },
      {
        path: 'admin/shops/:id',
        component: EditshopComponent,
        canActivate: [AuthGuard]
      },
      {
        path: '**',
        redirectTo: 'home'
      }

    ]),
    BrowserAnimationsModule,
    MaterialModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS,
       useClass: Interceptor,
        multi: true },
        AuthGuard,
    AuthenticateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
