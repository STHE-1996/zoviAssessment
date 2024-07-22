import { AfterViewInit, Component } from '@angular/core';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-dash',
  templateUrl: './dash.component.html',
  styleUrls: ['./dash.component.css']
})
export class DashComponentimplements implements AfterViewInit {

  constructor() {
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
              labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saterday'],
              datasets: [
                  {
                      label: 'Picked ',
                      data: [65, 59, 80, 81, 56, 55],
                      backgroundColor: 'rgba(10, 238, 227, 0.171)',
                      borderColor: 'rgba(0, 0, 62, 0.8)',
                      borderWidth: 1
                  },
                  {
                      label: ' Not Picked',
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

      // Chart 2
      const ctx3 = document.getElementById('myPieChart') as HTMLCanvasElement;
      new Chart(ctx3, {
          type: 'pie',
          data: {
              labels: ['Boys', 'Girls'],
              datasets: [{
                  label: '# of Votes',
                  data: [19, 19],
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

      // Chart 4
      const ctx5 = document.getElementById('riskChart') as HTMLCanvasElement;
      new Chart(ctx5, {
          type: 'bar',
          data: {
              labels: [
                  'Legal Risks',
                  'Financial Risks',
                  'Commercial Risks',
                  'Administration Risks',
                  'Public Risks',
                  'Professional Risks',
                  'HSE Risks',
                  'Business Conti Risks'
              ],
              datasets: [
                  {
                      label: 'Catastrophic',
                      data: [2, 0, 1, 0, 2, 0, 0, 0],
                      backgroundColor: 'rgba(255, 0, 0, 0.8)',
                      stack: 'Stack 0',
                      barThickness: 20
                  },
                  {
                      label: 'Critical',
                      data: [2, 3, 3, 2, 1, 3, 2, 4],
                      backgroundColor: 'rgba(255, 165, 0, 0.8)',
                      stack: 'Stack 0',
                      barThickness: 20
                  },
                  {
                      label: 'Marginal',
                      data: [2, 2, 3, 4, 2, 3, 4, 3],
                      backgroundColor: 'rgba(255, 255, 0, 0.8)',
                      stack: 'Stack 0',
                      barThickness: 20
                  },
                  {
                      label: 'Negligible',
                      data: [4, 5, 3, 4, 5, 4, 4, 3],
                      backgroundColor: 'rgba(0, 128, 0, 0.8)',
                      stack: 'Stack 0',
                      barThickness: 20
                  }
              ]
          },
          options: {
              indexAxis: 'y',
              scales: {
                  x: {
                      stacked: true,
                      title: {
                          display: true,
                          text: 'SEVERITY TOTALS'
                      }
                  },
                  y: {
                      stacked: true,
                      title: {
                          display: true,
                          text: 'RISK IDENTIFICATIONS'
                      }
                  }
              },
              plugins: {
                  title: {
                      display: true,
                      text: 'PROJECT RISKS IDENTIFICATION AND SEVERITY'
                  },
                  legend: {
                      display: true,
                      position: 'right',
                      labels: {
                          boxWidth: 20
                      }
                  }
              },
              responsive: true,
              maintainAspectRatio: false
          }
      });
  }
}