import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { DashboardServiceService } from 'src/app/services/dashboard-service.service';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponentimplements implements AfterViewInit {

  constructor(private genderCountService: DashboardServiceService) {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngAfterViewInit(): void {
    this.initializeCharts();
  }

  initializeCharts() {
    // Chart 1
    const ctx2 = document.getElementById('chart2') as HTMLCanvasElement;
    new Chart(ctx2, {
      type: 'bar',
      data: {
        labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        datasets: [
          {
            label: 'Picked',
            data: [65, 59, 80, 81, 56, 55],
            backgroundColor: 'rgba(10, 238, 227, 0.171)',
            borderColor: 'rgba(0, 0, 62, 0.8)',
            borderWidth: 1
          },
          {
            label: 'Not Picked',
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
            label: '# of Votes',
            data: [maleCount, femaleCount],
            backgroundColor: [
              'rgba(10, 238, 227, 0.171)',
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
