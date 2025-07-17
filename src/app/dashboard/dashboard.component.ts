import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userName: string = 'John Doe';
  isDropdownOpen: boolean = false;

  // --- Data for Existing Components ---
  accounts = [
    { name: 'Savings Account', balance: 7850.50, number: '**** **** **** 1234', icon: 'savings' },
    { name: 'Checking Account', balance: 2130.75, number: '**** **** **** 5678', icon: 'account_balance' }
  ];

  transactions = [
    { description: 'Online Shopping', amount: -150.00, date: new Date('2025-07-15'), category: 'Shopping' },
    { description: 'Salary Deposit', amount: 3500.00, date: new Date('2025-07-14'), category: 'Income' },
    { description: 'Restaurant Dinner', amount: -65.25, date: new Date('2025-07-13'), category: 'Food' },
    { description: 'Utility Bill', amount: -110.00, date: new Date('2025-07-12'), category: 'Bills' },
  ];

  // --- Placeholder Data for New Components ---
  financialGoals = [
    { name: 'Vacation to Hawaii', currentAmount: 2800, targetAmount: 5000, progress: 56 }
  ];

  upcomingBills = [
    { name: 'Credit Card Payment', dueDate: 'July 25, 2025', amount: 250 },
    { name: 'Internet Service', dueDate: 'August 1, 2025', amount: 60 }
  ];

  notifications = [
    { id: 1, message: 'A large deposit of $3,500.00 was made to your account.', type: 'success' },
    { id: 2, message: 'Your upcoming credit card payment is due in 5 days.', type: 'warning' }
  ];

  constructor() { }

  ngOnInit(): void {
    this.createSpendingDoughnutChart();
    this.createIncomeExpenseLineChart();
  }

  // --- Chart Creation ---
  createSpendingDoughnutChart(): void {
    new Chart('spending-chart', {
      type: 'doughnut',
      data: {
        labels: ['Shopping', 'Food', 'Bills', 'Other'],
        datasets: [{
          label: 'Spending by Category',
          data: [150, 65.25, 110, 200],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0']
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          }
        }
      }
    });
  }

  createIncomeExpenseLineChart(): void {
    new Chart('income-expense-chart', {
      type: 'line',
      data: {
        labels: ['April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Income',
            data: [3000, 3200, 2800, 3500],
            borderColor: '#36A2EB',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Expenses',
            data: [2500, 2700, 3100, 2800],
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }

  // --- Component Methods ---
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getAmountColor(amount: number): string {
    return amount < 0 ? '#E53935' : '#43A047';
  }

  getCategoryIcon(category: string): string {
    switch (category) {
      case 'Shopping': return 'shopping_bag';
      case 'Income': return 'attach_money';
      case 'Food': return 'restaurant';
      case 'Bills': return 'receipt_long';
      default: return 'label';
    }
  }

  dismissNotification(notificationId: number): void {
    this.notifications = this.notifications.filter(n => n.id !== notificationId);
  }

  navigateTo(route: string): void {
    console.log(`Navigating to ${route}`);
  }

  logout(): void {
    console.log('Logged out');
  }
}