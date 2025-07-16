import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userName: string = 'User';
  isDropdownOpen: boolean = false;

  accounts = [
    { name: 'Checking Account', balance: 1999234.56, number: '**** **** **** 1234' },
    { name: 'Savings Account', balance: 5678.90, number: '**** **** **** 5678' }
  ];

  transactions = [
    { description: 'Coffee Shop', amount: -5.50, date: new Date('2025-07-13') },
    { description: 'Salary Deposit', amount: 2500.00, date: new Date('2025-07-12') },
    { description: 'Online Purchase', amount: -75.00, date: new Date('2025-07-11') }
  ];

  constructor(private router: Router, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'no-bg-image');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-bg-image');
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  getAmountColor(amount: number): string {
    return amount < 0 ? '#f44336' : '#4CAF50';
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.isDropdownOpen = false; // Close dropdown on navigation
  }
}
