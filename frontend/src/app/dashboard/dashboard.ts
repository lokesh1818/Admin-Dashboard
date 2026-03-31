import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApiService } from '../services/api';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  totalUsers = 0;
  activeUsers = 0;
  inactiveUsers = 0;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.loadStats();
  }

  loadStats() {
    this.api.getUsers().subscribe((users: any[]) => {

      if (!users) return;

      this.totalUsers = users.length;
      this.activeUsers = users.filter(u => u.status === 'active').length;
      this.inactiveUsers = users.filter(u => u.status === 'inactive').length;

      setTimeout(() => this.renderChart(), 100);
    });
  }

  renderChart() {
    const canvas = document.getElementById('pieChart') as HTMLCanvasElement;

    if (!canvas) return;

    const existing = Chart.getChart(canvas);
    if (existing) existing.destroy();

    new Chart(canvas, {
      type: 'pie',
      data: {
        labels: ['Active', 'Inactive'],
        datasets: [{
          data: [this.activeUsers, this.inactiveUsers],
          backgroundColor: ['#22c55e', '#ef4444']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false   
      }
    });
  }
}