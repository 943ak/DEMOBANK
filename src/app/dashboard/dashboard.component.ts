import { Component, OnInit, ElementRef, Renderer2, ViewChild, AfterViewInit } from '@angular/core';
import { TextScramble } from '../shared/text-scramble';
import { CommonModule } from '@angular/common';
import { AppDockComponent } from '../app-dock/app-dock.component';
import Chart from 'chart.js/auto';
import { gsap } from 'gsap';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, AppDockComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  @ViewChild('scrambleText') scrambleTextElement!: ElementRef;
  private fx!: TextScramble;
  userName: string = 'John Doe';
  isDropdownOpen: boolean = false;
  isFabMenuOpen: boolean = false; // Added for FAB menu

  // --- Data for Existing Components ---
  accounts = [
    { name: 'Savings Account', balance: 1000000, number: '**** **** **** 1234', icon: 'savings' },
    { name: 'Checking Account', balance: 100000, number: '**** **** **** 5678', icon: 'account_balance' }
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

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.createSpendingDoughnutChart();
    this.createIncomeExpenseLineChart();
    this.animateAccountCards();
    this.animateTransactions();
    this.animateFinancialGoals();
    this.animateUpcomingBills();
    this.animateAlertBanners();
  }

  ngAfterViewInit(): void {
    this.fx = new TextScramble(this.scrambleTextElement.nativeElement);
    this.scrambleText();
  }

  scrambleText(): void {
    const phrases = [
      'Welcome to DemoBank',
      'Your financial journey starts here',
      'Secure and reliable banking',
      'Manage your money with ease'
    ];
    let counter = 0;
    const next = () => {
      this.fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 3000);
      });
      counter = (counter + 1) % phrases.length;
    };
    next();
  }

  private animateAccountCards(): void {
    gsap.from('.account-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      onComplete: () => {
        this.accounts.forEach((account, index) => {
          this.animateNumber(account.balance, `.account-cards div:nth-child(${index + 1}) .balance`);
        });
      }
    });
  }

  private animateNumber(targetNumber: number, selector: string): void {
    const obj = { value: 0 };
    gsap.to(obj, {
      value: targetNumber,
      duration: 1.5,
      ease: 'power1.out',
      onUpdate: () => {
        const element = this.el.nativeElement.querySelector(selector);
        if (element) {
          element.textContent = obj.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
        }
      }
    });
  }

  private animateTransactions(): void {
    gsap.from('.transaction-item', {
      x: -100,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.05,
      delay: 0.5 // Delay after account cards animation
    });
  }

  private animateFinancialGoals(): void {
    this.financialGoals.forEach((goal, index) => {
      const progressBar = this.el.nativeElement.querySelector(`.goal-tracker:nth-child(${index + 1}) .goal-progress-bar`);
      if (progressBar) {
        gsap.fromTo(progressBar, 
          { scaleX: 0, transformOrigin: 'left center' },
          { scaleX: goal.progress / 100,
            duration: 1.5,
            ease: 'power2.out',
            delay: 1 + index * 0.2, // Stagger and delay after other animations
            onComplete: () => {
              if (goal.progress === 100) {
                this.renderer.addClass(progressBar, 'shimmer');
              }
            }
          }
        );
      }
    });
  }

  private animateUpcomingBills(): void {
    gsap.from('.bill-item', {
      y: 50,
      opacity: 0,
      duration: 0.6,
      ease: 'power3.out',
      stagger: 0.05,
      delay: 1.5 // Delay after other animations
    });
  }

  private animateAlertBanners(): void {
    gsap.from('.notification-card', {
      x: 100,
      opacity: 0,
      duration: 0.8,
      ease: 'power3.out',
      stagger: 0.1,
      delay: 2 // Delay after other animations
    });

    this.notifications.forEach(notification => {
      if (notification.type === 'critical') {
        // Add pulsing border animation for critical alerts
        gsap.to(this.el.nativeElement.querySelector(`#notification-${notification.id}`), {
          borderColor: 'red',
          repeat: -1,
          yoyo: true,
          duration: 1,
          ease: 'power1.inOut'
        });
      }
      // Auto-dismiss with fade + slide-out after 5 seconds
      gsap.to(this.el.nativeElement.querySelector(`#notification-${notification.id}`), {
        opacity: 0,
        x: 100,
        duration: 0.5,
        ease: 'power1.in',
        delay: 5,
        onComplete: () => {
          this.dismissNotification(notification.id);
        }
      });
    });
  }

  

  

  onMouseEnterBill(event: MouseEvent, bill: any): void {
    const target = event.currentTarget as HTMLElement;
    gsap.to(target, {
      borderLeftColor: '#4ECDC4', // Cyan glow
      borderLeftWidth: '5px',
      duration: 0.3,
      ease: 'power1.out'
    });
    gsap.to(target.querySelector('.bill-reminder-icon'), {
      x: 0,
      opacity: 1,
      duration: 0.3,
      ease: 'power1.out'
    });
  }

  onMouseLeaveBill(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    gsap.to(target, {
      borderLeftColor: 'transparent',
      borderLeftWidth: '1px',
      duration: 0.3,
      ease: 'power1.out'
    });
    gsap.to(target.querySelector('.bill-reminder-icon'), {
      x: 10,
      opacity: 0,
      duration: 0.3,
      ease: 'power1.out'
    });
  }

  // --- Parallax/Tilt Effect ---
  onMouseMove(event: MouseEvent, card: HTMLElement): void {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((event.clientY - centerY) / centerY) * 10; // Adjust sensitivity
    const rotateY = ((event.clientX - centerX) / centerX) * -10; // Adjust sensitivity

    gsap.to(card, {
      duration: 0.5,
      rotationX: rotateX,
      rotationY: rotateY,
      ease: "power1.out",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" // Original shadow
    });
  }

  onMouseLeave(card: HTMLElement): void {
    gsap.to(card, {
      duration: 0.5,
      rotationX: 0,
      rotationY: 0,
      ease: "power1.out",
      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" // Original shadow
    });
  }

  // --- Chart Creation ---
  createSpendingDoughnutChart(): void {
    const chart = new Chart('spending-chart', {
      type: 'doughnut',
      data: {
        labels: ['Shopping', 'Food', 'Bills', 'Other'],
        datasets: [{
          label: 'Spending by Category',
          data: [150, 65.25, 110, 200],
          backgroundColor: ['#7B7481', '#4ECDC4', '#C44E8A', '#F7B844'],
          hoverOffset: 10,
          borderWidth: 0
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: '#FFFFFF'
            }
          }
        },
        animation: {
          onComplete: (animation) => {
            const arcs = animation.chart.getDatasetMeta(0).data;
            gsap.from(arcs, {
              scale: 0,
              duration: 1,
              ease: 'elastic.out(1, 0.75)',
              stagger: 0.1
            });
          }
        }
      }
    });

    // Hover effect for doughnut chart slices
    chart.canvas.addEventListener('mousemove', (evt) => {
      const res = chart.getElementsAtEventForMode(evt, 'nearest', { intersect: true }, true);
      if (res.length) {
        const firstPoint = res[0];
        const dataIndex = firstPoint.index;
        const datasetIndex = firstPoint.datasetIndex;
        const arc = chart.getDatasetMeta(datasetIndex).data[dataIndex];
        gsap.to(arc, { scale: 1.05, duration: 0.3, ease: 'power1.out' });
      } else {
        chart.getDatasetMeta(0).data.forEach(arc => {
          gsap.to(arc, { scale: 1, duration: 0.3, ease: 'power1.out' });
        });
      }
    });
  }

  createIncomeExpenseLineChart(): void {
    const chart = new Chart('income-expense-chart', {
      type: 'line',
      data: {
        labels: ['April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Income',
            data: [3000, 3200, 2800, 3500],
            borderColor: '#4ECDC4',
            backgroundColor: 'rgba(78, 205, 196, 0.2)',
            fill: true,
            tension: 0.4
          },
          {
            label: 'Expenses',
            data: [2500, 2700, 3100, 2800],
            borderColor: '#C44E8A',
            backgroundColor: 'rgba(196, 78, 138, 0.2)',
            fill: true,
            tension: 0.4
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: '#FFFFFF'
            }
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { color: '#BBBBBB' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          },
          x: {
            ticks: { color: '#BBBBBB' },
            grid: { color: 'rgba(255, 255, 255, 0.1)' }
          }
        },
        animation: {
          
        }
      }
    });
  }

  // --- Component Methods ---
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  // FAB methods
  toggleFabMenu(): void {
    this.isFabMenuOpen = !this.isFabMenuOpen;
    const fabMenu = this.el.nativeElement.querySelector('.fab-menu');
    if (this.isFabMenuOpen) {
      gsap.fromTo(fabMenu, 
        { scale: 0.8, opacity: 0, y: 20, transformOrigin: 'bottom right' },
        { scale: 1, opacity: 1, y: 0, duration: 0.3, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(fabMenu, {
        scale: 0.8, opacity: 0, y: 20, duration: 0.2, ease: 'power1.in',
        onComplete: () => {
          // Optionally reset display to none if needed after animation
        }
      });
    }
  }

  addTransaction(): void {
    console.log('Add Transaction clicked');
    // Implement navigation or modal for adding transaction
    this.isFabMenuOpen = false; // Close menu after action
  }

  addGoal(): void {
    console.log('Add Goal clicked');
    // Implement navigation or modal for adding goal
    this.isFabMenuOpen = false; // Close menu after action
  }

  // Profile Dropdown methods
  onMouseEnterProfile(): void {
    const dropdownMenu = this.el.nativeElement.querySelector('.dropdown-menu');
    gsap.to(dropdownMenu, { maxHeight: '500px', opacity: 1, duration: 0.3, ease: 'power1.out' });
  }

  onMouseLeaveProfile(): void {
    const dropdownMenu = this.el.nativeElement.querySelector('.dropdown-menu');
    gsap.to(dropdownMenu, { maxHeight: '0', opacity: 0, duration: 0.3, ease: 'power1.out' });
  }

  editProfile(): void {
    console.log('Edit Profile clicked');
    // Implement navigation or modal for editing profile
    this.isDropdownOpen = false; // Close menu after action
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