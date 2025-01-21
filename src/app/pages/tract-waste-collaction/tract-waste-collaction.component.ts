import { Component } from '@angular/core';
import { WasteService } from 'src/app/services/waste.service';

@Component({
  selector: 'app-tract-waste-collaction',
  templateUrl: './tract-waste-collaction.component.html',
  styleUrls: ['./tract-waste-collaction.component.css']
})
export class TractWasteCollactionComponent {
updateStatus(_t21: any,arg1: string) {
throw new Error('Method not implemented.');
}
selectRecord(_t20: any) {
throw new Error('Method not implemented.');
}
deleteWaste(arg0: any) {
throw new Error('Method not implemented.');
}

  wasteRecords: any[] = [];
  errorMessage: string | null = null;


  type: string = '';
  quantity: string = '';
  userRole: string = '';
  date: string = '';
  locations: string[] = []; 
  location: string = '';     
  dayOfRecycling: string = '';

constructor(private wasteService: WasteService) {}

ngOnInit(): void {
  this.loadWasteRecords();
}


  loadWasteRecords(): void {
    
    this.wasteService.getAllWasteRecordsForAllUsers().subscribe(
      (response: any) => {
        this.wasteRecords = response;
        if (this.wasteRecords.length === 0) {
          this.errorMessage = 'No waste records found.';
        }
      },
      (error) => {
        console.error('Error fetching waste records', error);
        this.errorMessage = 'Error fetching waste records';
      }
    );
  }


  updateWasteStatus(record: any, status: string): void {
    this.wasteService.updateWasteStatus(record.id, status).subscribe(
      (updatedRecord) => {
        // Update the status locally after the update
        record.status = updatedRecord.status;
      },
      (error) => {
        console.error("Error updating waste status", error);
      }
    );
  }
}
