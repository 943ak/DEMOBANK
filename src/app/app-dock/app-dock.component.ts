import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gsap } from 'gsap';

@Component({
  selector: 'app-app-dock', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app-dock.component.html',
  styleUrl: './app-dock.component.css'
})
export class AppDockComponent {
  baseItemSize: number = 54; // Base size of each dock item in pixels
  magnification: number = 70; // Magnification decreased by 50%
  distance: number = 100; // Distance from mouse for magnification effect
  mouseX: number = 0; // Current mouse X position
  isHovered: boolean = false; // Whether the dock is being hovered
  showTransactions: boolean = false; // State for showing/hiding transactions
  hoveredItem: string | null = null; // Tracks the name of the currently hovered item
  isTransactionsIconEnlarged: boolean = false; // New: State for transactions icon enlargement

  dockApps = [
    { name: 'Home', icon: 'home' },
    { name: 'Accounts', icon: 'account_balance_wallet' },
    { name: 'Transactions', icon: 'receipt_long' },
    { name: 'Settings', icon: 'settings' }
  ];

  transactions = [
    { description: 'Online Shopping', amount: -150.00, date: new Date('2025-07-15'), category: 'Shopping' },
    { description: 'Salary Deposit', amount: 3500.00, date: new Date('2025-07-14'), category: 'Income' },
    { description: 'Restaurant Dinner', amount: -65.25, date: new Date('2025-07-13'), category: 'Food' },
    { description: 'Utility Bill', amount: -110.00, date: new Date('2025-07-12'), category: 'Bills' },
  ];

  constructor(private renderer: Renderer2) { }

  @HostListener('document:mousemove', ['$event']) // Listen to mousemove on the entire document
  onMouseMove(event: MouseEvent): void {
    if (this.isHovered) {
      this.mouseX = event.clientX;
    }
  }

  onMouseEnter(appName: string): void {
    this.isHovered = true;
    this.hoveredItem = appName;
  }

  onMouseLeave(): void {
    this.isHovered = false;
    this.mouseX = 0; // Reset mouseX when not hovered
    this.hoveredItem = null;
  }

  getItemSize(elementRef: HTMLElement, appName: string): number {
    if (appName === 'Transactions' && this.isTransactionsIconEnlarged) {
      return this.magnification; // Keep enlarged if clicked
    }

    if (!this.isHovered) return this.baseItemSize;

    const rect = elementRef.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const distanceFromMouse = Math.abs(this.mouseX - centerX);

    if (distanceFromMouse > this.distance) {
      return this.baseItemSize;
    }

    const scale = this.magnification - ((this.magnification - this.baseItemSize) * distanceFromMouse) / this.distance;
    return Math.max(this.baseItemSize, scale);
  }

  toggleTransactions(): void {
    this.showTransactions = !this.showTransactions;
    this.isTransactionsIconEnlarged = !this.isTransactionsIconEnlarged;
  }

  getAmountColor(amount: number): string {
    return amount < 0 ? '#f44336' : '#4CAF50';
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

  onMouseEnterTransaction(event: MouseEvent, transaction: any): void {
    const target = event.currentTarget as HTMLElement;
    const color = transaction.amount < 0 ? 'rgba(244, 67, 54, 0.5)' : 'rgba(76, 175, 80, 0.5)'; // Red or Green glow
    gsap.to(target, {
      boxShadow: `0 0 15px ${color}, 0 0 25px ${color}`,
      scale: 1.02,
      duration: 0.3,
      ease: 'power1.out'
    });
  }

  onMouseLeaveTransaction(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    gsap.to(target, {
      boxShadow: 'none',
      scale: 1,
      duration: 0.3,
      ease: 'power1.out'
    });
  }
}