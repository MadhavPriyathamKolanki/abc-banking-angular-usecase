export class Customer {
    customerid: number;
    firstname: string;
    lastname: string;
    username: string;
    password: string;
    address: string;
    email: string;
    
    constructor(){

    }
    
    
   
   public get value() : string {
       return this.lastname;
   }
   
    
}