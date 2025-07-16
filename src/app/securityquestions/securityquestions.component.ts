import { Component, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface SecurityQuestion {
  id: number;
  question: string;
  answer: string;
  expanded: boolean;
  answered: boolean;
}

@Component({
  selector: 'app-securityquestions',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './securityquestions.component.html',
  styleUrl: './securityquestions.component.css'
})
export class SecurityquestionsComponent implements OnInit, OnDestroy {
  questions: SecurityQuestion[] = [
    { id: 1, question: "What's your dream job?", answer: '', expanded: false, answered: false },
    { id: 2, question: "What's your favorite comfort food?", answer: '', expanded: false, answered: false },
    { id: 3, question: "What's your biggest fear?", answer: '', expanded: false, answered: false },
    { id: 4, question: "What was the name of your first pet?", answer: '', expanded: false, answered: false },
    { id: 5, question: "What is your mother's maiden name?", answer: '', expanded: false, answered: false }
  ];

  minQuestionsToAnswer = 2;

  constructor(private router: Router, private renderer: Renderer2, private el: ElementRef) { }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'no-bg-image');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-bg-image');
  }

  toggleQuestion(question: SecurityQuestion): void {
    question.expanded = !question.expanded;
  }

  onAnswerChange(question: SecurityQuestion): void {
    question.answered = question.answer.trim().length > 0;
  }

  get answeredQuestionsCount(): number {
    return this.questions.filter(q => q.answered).length;
  }

  get canProceed(): boolean {
    return this.answeredQuestionsCount >= this.minQuestionsToAnswer;
  }

  goBack(): void {
    this.router.navigate(['/login']); // Assuming /login is the previous page
  }

  goNext(): void {
    if (this.canProceed) {
      // Here you would typically send the answers to a backend service
      console.log('Security questions answered:', this.questions.filter(q => q.answered));
      // Navigate to the next page, e.g., dashboard or home
      this.router.navigate(['/dashboard']); // Placeholder for next page
    } else {
      alert(`Please answer at least ${this.minQuestionsToAnswer} security questions.`);
    }
  }
}
