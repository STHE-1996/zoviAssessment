import { Component } from '@angular/core';
import { RecyclingRequest, UpdateLocationRequest } from 'src/app/models/recycling-request';
import { WasteRequest, UpdateWasteRequest } from 'src/app/models/waste-request';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RecyclingService } from 'src/app/services/recycling.service';
import { WasteService } from 'src/app/services/waste.service';

@Component({
  selector: 'app-recycling-location',
  templateUrl: './recycling-location.component.html',
  styleUrls: ['./recycling-location.component.css']
})
export class RecyclingLocationComponent {
  locationRecored: any[] = [];
  errorMessage: string | null = null;

  activeTab: string = 'createLocation';

  selectedRecord: any = null; // To store the selected record for editing
  type: string = '';
  location: string = '';
  availability: string = '';
  date: string = '';



  selectTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(private authenticatiservice: AuthenticationService,private recycling: RecyclingService) {}

  ngOnInit(): void {
    this.loadLocationRecords();
  }

 


  onSubmit(): void {
    const userId = this.authenticatiservice.getUserId();
    console.error('User ID not found in localStorage');

    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    console.log('User ID:', userId); 
    const recyclingRequest: RecyclingRequest = {
      userId: userId,
      type: this.type,
      location: this.location,
      availability: this.availability
    };
    

    this.recycling.createLocation(recyclingRequest).subscribe(
      response => {
        console.log('Location record created successfully', response);
      },
      error => {
        console.error('Error creating waste record', error);
      }
    );
  }


  loadLocationRecords(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in localStorage');
      this.errorMessage = 'User ID not found';
      return;
    }

    this.recycling.getAllLocationRecords(userId).subscribe(
      (response: any) => {
        this.locationRecored = response;
        if (this.locationRecored.length === 0) {
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
    this.location = record.location;
    this.availability = record.availability;
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

    const updateRequest: UpdateLocationRequest = {
      userId: userId,
      recyclingId: this.selectedRecord.id,
      type: this.type,
      location: this.location,
      date: this.date,
      availability: this.availability
    };

    this.recycling.updateLocationRecord(updateRequest).subscribe(
      response => {
        console.log('Waste record updated successfully', response);
        this.loadLocationRecords(); // Refresh the list after update
        this.selectedRecord = null; // Clear selection
        this.type = '';
        this.location = '';
        this.availability = '';
        this.date = '';
      },
      error => {
        console.error('Error updating waste record', error);
        this.errorMessage = 'Error updating waste record';
      }
    );
  }

  deleteLocation(recyclingId: string): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    this.recycling.deleteLocationRecord(userId, recyclingId).subscribe(
      response => {
        console.log('Waste record deleted successfully', response);
        this.loadLocationRecords(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting waste record', error);
        this.errorMessage = 'Error deleting waste record';
      }
    );
  }
}
