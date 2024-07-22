export interface RecyclingRequest {
    userId: string;
    type: string;
    location: string;
    availability: string;
  
    // constructor(userId: string, type: string, location: string, availability: string) {
    //   this.userId = userId;
    //   this.type = type;
    //   this.location = location;
    //   this.availability = availability;
    // }
  }


  export class UpdateLocationRequest {
    userId: string;
    recyclingId: string;
    type:string;
    location: string;
    date: string; 
    availability: string;

    constructor(userId: string, recyclingId: string, location: string,type:string,date: string ,availability: string) {
        this.userId = userId;
        this.recyclingId = recyclingId;
        this.type =type;
        this.location = location;
        this.date = date;
        this.availability = availability;
      }
}
