import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardServiceService } from 'src/app/services/dashboard-service.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponentimplements implements AfterViewInit {

  wasteRecords: any[] = []; // Assuming wasteRecords is populated via an API call
  errorMessage: string | null = null;  // Add error message handling
  chart: Chart | null = null;

  constructor(private genderCountService: DashboardServiceService) {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.initializeCharts();
    this.loadWasteRecords();
  }

  ngOnDestroy(): void {
    if (this.chart) {
      this.chart.destroy();
    }
  }

  loadWasteRecords(): void {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      console.error('User ID not found in localStorage');
      this.errorMessage = 'User ID not found';
      return;
    }

    this.genderCountService.getAllWasteRecords(userId).subscribe(
      (response: any) => {
        this.wasteRecords = response;
        if (this.wasteRecords.length === 0) {
          this.errorMessage = 'No waste records found.';
        } else {
          this.initializeCharts();
        }
      },
      (error) => {
        console.error('Error fetching waste records', error);
        this.errorMessage = 'Error fetching waste records';
      }
    );
  }

  initializeCharts() {
    
      // Initialize data for the chart
      const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const pickedData = new Array(6).fill(0);  // Array for "Picked" data, initialized to 0
    const notPickedData = new Array(6).fill(0);  // Array for "Not Picked" data, initialized to 0

    // Map waste records to the chart data
    this.wasteRecords.forEach((record: any) => {
      console.log('Processing Record:', record);  // Debug log to check the record

      if (record.dayOfRecycling === null || !daysOfWeek.includes(record.dayOfRecycling)) {
        console.log('Skipping invalid or null dayOfRecycling for record:', record);
        return;  // Skip invalid or null dayOfRecycling
      }

      const dayIndex = daysOfWeek.indexOf(record.dayOfRecycling);  // Find the day index
      console.log(`Day Index for ${record.dayOfRecycling}:`, dayIndex);  // Debug log to check the day index
      const quantity = parseInt(record.quantity, 10);  // Ensure quantity is parsed as an integer
      console.log('Parsed Quantity:', quantity);  // Debug log to check the quantity

      if (record.status === 'true') {  // If the record is "Picked"
        pickedData[dayIndex] += quantity;  // Add the quantity to the picked data
      } else {  // If the record is "Not Picked"
        notPickedData[dayIndex] += quantity;  // Add the quantity to the not picked data
      }
    });

    // Debug logs to check the final data for the chart
    console.log('Picked Data:', pickedData);
    console.log('Not Picked Data:', notPickedData);

    // Destroy previous chart if it exists
    if (this.chart) {
      this.chart.destroy();
    }

    // Create new chart
    const ctx2 = document.getElementById('chart2') as HTMLCanvasElement;
    this.chart = new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: daysOfWeek,  // Labels for each day of the week
        datasets: [
          {
            label: 'Picked',
            data: pickedData,  // Populated "Picked" data
            backgroundColor: '#109928',
            borderColor: 'rgba(0, 0, 62, 0.8)',
            borderWidth: 1
          },
          {
            label: 'Not Picked',
            data: notPickedData,  // Populated "Not Picked" data
            backgroundColor: 'rgb(1, 235, 252)',
            borderColor: 'rgba(126, 3, 17, 0.8)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'Picked vs. Not Picked'
          }
        }
      }
    });
    

    // Fetch gender counts and update the pie chart
    this.genderCountService.getGenderCounts().subscribe(data => {
      this.updatePieChart(data.maleCount, data.femaleCount);
    });

    // Chart 3
    const ctx4 = document.getElementById('chart3') as HTMLCanvasElement;
    new Chart(ctx4, {
      type: 'bar',
      data: {
        labels: ['Jun 2023', 'Jul 2023', 'Aug 2023', 'Sep 2023', 'Oct 2023', 'Nov 2023', 'Dec 2023', 'Jan 2024', 'Feb 2024', 'Mar 2024', 'Apr 2024', 'May 2024'],
        datasets: [
          {
            label: 'Actual Amount',
            data: [65, 59, 80, 81, 56, 55, 40, 70, 65, 55, 50, 60],
            backgroundColor: 'rgba(10, 238, 227, 0.171)',
            borderColor: 'rgba(0, 0, 62, 0.8)',
            borderWidth: 1
          },
          {
            label: 'Desired',
            data: [55, 50, 70, 71, 46, 45],
            backgroundColor: 'rgb(1, 235, 252)',
            borderColor: 'rgba(126, 3, 17, 0.8)',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        scales: {
          x: {
            beginAtZero: true
          },
          y: {
            beginAtZero: true
          }
        },
        plugins: {
          legend: {
            display: true,
            position: 'top'
          },
          title: {
            display: true,
            text: 'PROJECT CASHFLOW VS EXPENDITURE'
          }
        }
      }
    });
  }

  updatePieChart(maleCount: number, femaleCount: number): void {
    const ctx3 = document.getElementById('myPieChart') as HTMLCanvasElement;

    if (ctx3) {
      new Chart(ctx3, {
        type: 'pie',
        data: {
          labels: ['Boys', 'Girls'],
          datasets: [{
            label: '',
            data: [maleCount, femaleCount],
            backgroundColor: [
              '#109928',
              'rgb(1, 235, 252)' 
            ],
            borderColor: [
              'rgba(0, 0, 62, 0.8)',
              'rgba(126, 3, 17, 0.8)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true
        }
      });
    } else {
      console.error('Canvas element for pie chart not found');
    }
  }
}
