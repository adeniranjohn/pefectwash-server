import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';


interface Customer {
  data: object;
}


@Injectable({
  providedIn: 'root'
})

export class ApiService {
  private apiurl = `http://localhost:7000/api/v1`;
  customers: any;
  constructor(private http: HttpClient) {

   }

   getCustomer(customer) {
     return this.http.get<Customer>(`${this.apiurl}/${customer.phonenumber}`).pipe(
       map(res => {
         return res;
        }),
       catchError(err => of([]))
     );
   }

   getCustomers(){
      return this.http.get<Customer>(this.apiurl + '/admin/customers');
    }

    getShopCustomers(phoneNumber){
      return this.http.get<Customer>(this.apiurl + `/admin/${phoneNumber}/customers`);
    }

    getTheCustomer(id){
      return this.http.get<Customer>(`${this.apiurl}/admin/customers/${id}`);
    }

    postCustomer(user){
      return this.http.post(`${this.apiurl}/admin/customers`, user);
    }

    deleteCustomer(id){
      return this.http.delete(this.apiurl + '/admin/customers/' + id);
    }

    saveCustomer(customer){
      return this.http.put(this.apiurl + '/admin/customers/' + customer._id, customer);
    }

    changePassword(value){
      console.log(value);
      return this.http.put(this.apiurl + '/admin/changePassword', value);
    }

    getShops(){
      return this.http.get(`${this.apiurl}/admin/shops`);
    }

    getTheShop(id){
      return this.http.get(`${this.apiurl}/admin/shops/${id}`);
    }

    deleteShop(id){
      return this.http.delete(this.apiurl + '/admin/shops/' + id);
    }

    getTotalWash(phone){
      return this.http.get(`${this.apiurl}/shops/${phone}`);
    }

    getDailyWash(){

    }
}
