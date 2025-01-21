import { Component } from '@angular/core';
import { RecyclingRequest } from 'src/app/models/recycling-request';
import { UpdateWasteRequest, WasteRequest } from 'src/app/models/waste-request';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { RecyclingService } from 'src/app/services/recycling.service';
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
  locations: string[] = [];  // This will hold the available locations
  location: string = '';     // This will hold the selected location
  dayOfRecycling: string = '';

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(private wasteService: WasteService, private authenticatiservice: AuthenticationService, private recycling: RecyclingService) {}

  ngOnInit(): void {
    this.loadWasteRecords();
    this.getRecyclingBinLocations();
  }

  getRecyclingBinLocations(): void {
    this.recycling.getAllRecyclingList().subscribe(
      (data: RecyclingRequest[]) => {
        // Extract the locations from the API response
        this.locations = data.map(bin => bin.location);  // Set available locations to the dropdown
      },
      (error) => {
        console.error('Error fetching recycling bin locations', error);
      }
    );
  }

  onSubmit(): void {
    const userId = this.authenticatiservice.getUserId();
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    console.log('User ID:', userId);

    // Construct the request object with the selected location and day
    const wasteRequest: WasteRequest = {
      userId: userId,
      type: this.type,
      quantity: this.quantity,
      userRole: this.userRole,
      location: this.location,  // Selected location
      dayOfRecycling: this.dayOfRecycling           // Selected day
    };

    this.wasteService.createWaste(wasteRequest).subscribe(
      response => {
        console.log('Waste record created successfully', response);
        alert('Waste record created successfully!');
      location.reload();
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


  // getRecyclingBinLocations(): void {
  //   this.recycling.getAllRecyclingList().subscribe(
  //     (data: RecyclingRequest[]) => {
  //       // Extract the location names from the response data
  //       this.locations = data.map(bin => bin.location);
  //     },
  //     (error) => {
  //       console.error('Error fetching recycling bin locations', error);
  //     }
  //   );
  // }
  
}
