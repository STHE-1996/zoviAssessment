import { Component } from '@angular/core';
import { TaskRequest, UpdateTaskRequest } from 'src/app/models/task-requesting';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { TasksService } from 'src/app/services/tasks.service';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
taskRecords: any[] = [];
  errorMessage: string | null = null;

  activeTab: string = 'createWaste';

  selectedRecord: any = null; // To store the selected record for editing
  taskName: string = '';
  description: string = '';
  userRole: string = '';
  dueDate: string = '';
  dueDate1: Date = new Date();
  startDate: Date = new Date();
  // status: string[] = [];  // This will hold the available locations
  status: string = '';     // This will hold the selected location
  dayOfRecycling: string = '';

  selectTab(tab: string) {
    this.activeTab = tab;
  }

  constructor(private taskService: TasksService, private authenticatiservice: AuthenticationService) {}

  ngOnInit(): void {
    this.loadTaskRecords();
    // this.getRecyclingBinLocations();
  }

  // getRecyclingBinLocations(): void {
  //   this.recycling.getAllRecyclingList().subscribe(
  //     (data: RecyclingRequest[]) => {
  //       // Extract the locations from the API response
  //       this.locations = data.map(bin => bin.location);  // Set available locations to the dropdown
  //     },
  //     (error) => {
  //       console.error('Error fetching recycling bin locations', error);
  //     }
  //   );
  // }

  onSubmit(): void {
    const userId = this.authenticatiservice.getUserId();
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    console.log('User ID:', userId);

    // Construct the request object with the selected location and day
    const taskRequest: TaskRequest = {
      userId: userId,
      taskName: this.taskName,
      description: this.description,
      userRole: this.userRole,
      dueDate : this.dueDate1,
      startDate: this.startDate,
      // status: this.status, 
      // dayOfRecycling: this.dayOfRecycling           // Selected day
    };

    this.taskService.createTask(taskRequest).subscribe(
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
  


  loadTaskRecords(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in localStorage');
      this.errorMessage = 'User ID not found';
      return;
    }

    this.taskService.getAllTaskRecords(userId).subscribe(
      (response: any) => {
        this.taskRecords = response;
        if (this.taskRecords.length === 0) {
          this.errorMessage = 'No task records found.';
        }
      },
      (error) => {
        console.error('Error fetching task records', error);
        this.errorMessage = 'Error fetching task records';
      }
    );
  }

  selectRecord(record: any): void {
    this.selectedRecord = record;
    this.taskName = record.taskName;
    this.description = record.description;
    this.userRole = record.userRole;
    this.dueDate = record.dueDate;
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

    const updateRequest: UpdateTaskRequest = {
      userId: userId,
      taskId: this.selectedRecord.id,
      taskName: this.taskName,
      description: this.description,
      dueDate: this.dueDate,
      userRole: this.userRole
    };

    this.taskService.updateTaskRecord(updateRequest).subscribe(
      response => {
        console.log('Task record updated successfully', response);
        this.loadTaskRecords(); // Refresh the list after update
        this.selectedRecord = null; // Clear selection
        this.taskName = '';
        this.description = '';
        this.userRole = '';
        this.dueDate = '';
      },
      error => {
        console.error('Error updating Task record', error);
        this.errorMessage = 'Error updating Task record';
      }
    );
  }

  deleteTask(taskId: string): void {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User ID not found in localStorage');
      return;
    }

    this.taskService.deleteTaskRecord(userId, taskId).subscribe(
      response => {
        console.log('task record deleted successfully', response);
        this.loadTaskRecords(); // Refresh the list after deletion
      },
      error => {
        console.error('Error deleting task record', error);
        this.errorMessage = 'Error deleting task record';
      }
    );
  }

}
