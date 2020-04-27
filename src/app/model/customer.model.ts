export class Customer {
    _id: string;
    name: string;
    phoneNumber: string;
    numberItems: number;
    amountPaid: number;
    status: string;
    eventDate: Date;
    shopName: string;
    createdAt?: Date;
    shopPhone?: string;

    constructor(
      _id?: string,
      name?: string,
      phoneNumber?: string,
      numberItems?: number,
      amountPaid?: number,
      status?: string,
      eventDate?: Date,
      shopPhone?: string,
      createdAt?: Date ){

    }

    getId(){
      return this._id;
    }

   
}
