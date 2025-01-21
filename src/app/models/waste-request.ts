export class WasteRequest {
    userId: string;
    type: string;
    quantity: string;
    userRole: string;
    location: string;
    dayOfRecycling: string;
  
    constructor(userId: string, type: string, quantity: string, userRole: string, location: string,  dayOfRecycling: string) {
      this.userId = userId;
      this.type = type;
      this.quantity = quantity;
      this.userRole = userRole;
      this.location = location;
      this.dayOfRecycling = dayOfRecycling;
    }
  }


  export class UpdateWasteRequest {
    userId: string;
    wasteId: string;
    type:string;
    quantity: string;
    date: string; 
    userRole: string;

    constructor(userId: string, wasteId: string, quantity: string,type:string,date: string ,userRole: string) {
        this.userId = userId;
        this.wasteId = wasteId;
        this.type =type;
        this.quantity = quantity;
        this.date = date;
        this.userRole = userRole;
      }
  }
