import { Component } from '@angular/core';
import { UpdateWasteRequest, WasteRequest } from 'src/app/models/waste-request';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { WasteService } from 'src/app/services/waste.service';

@Component({
  selector: 'app-waste',
  templateUrl: './waste.component.html',
  styleUrls: ['./waste.component.css']
})
export class WasteComponent {

  wasteRecords: any[] = [];
  errorMessage: string | null = null;

  activeTab: string = 'createWaste';

  selectedRecord: any = null; // To store the selected record for editing
  type: string = '';
  quantity: string = '';
  userRole: string = '';
  date: string = '';



  selectTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(private wasteService: WasteService,private authenticatiservice: AuthenticationService) {}

  ngOnInit(): void {
    this.loadWasteRecords();
  }

 


  onSubmit(): void {
    const userId = this.authenticatiservice.getUserId();
    console.error('User ID not found in localStorage');

    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    console.log('User ID:', userId); 
    const wasteRequest: WasteRequest = {
      userId: userId,
      type: this.type,
      quantity: this.quantity,
      userRole: this.userRole
    };
    

    this.wasteService.createWaste(wasteRequest).subscribe(
      response => {
        console.log('Waste record created successfully', response);
      },
      error => {
        console.error('Error creating waste record', error);
      }
    );
  }


  loadWasteRecords(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in localStorage');
      this.errorMessage = 'User ID not found';
      return;
    }

    this.wasteService.getAllWasteRecords(userId).subscribe(
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

  selectRecord(record: any): void {
    this.selectedRecord = record;
    this.type = record.type;
    this.quantity = record.quantity;
    this.userRole = record.userRole;
    this.date = record.date;
  }

  onSubmit1(): void {
    if (!this.selectedRecord) {
      console.error('No record selected for update');
      return;
    }

    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    const updateRequest: UpdateWasteRequest = {
      userId: userId,
      wasteId: this.selectedRecord.id,
      type: this.type,
      quantity: this.quantity,
      date: this.date,
      userRole: this.userRole
    };

    this.wasteService.updateWasteRecord(updateRequest).subscribe(
      response => {
        console.log('Waste record updated successfully', response);
        this.loadWasteRecords(); // Refresh the list after update
        this.selectedRecord = null; // Clear selection
        this.type = '';
        this.quantity = '';
        this.userRole = '';
        this.date = '';
      },
      error => {
        console.error('Error updating waste record', error);
        this.errorMessage = 'Error updating waste record';
      }
    );
  }

  deleteWaste(wasteId: string): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    this.wasteService.deleteWasteRecord(userId, wasteId).subscribe(
      response => {
        console.log('Waste record deleted successfully', response);
        this.loadWasteRecords(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting waste record', error);
        this.errorMessage = 'Error deleting waste record';
      }
    );
  }
  
}
