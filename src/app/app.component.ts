import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { trigger, transition, style, animate, query, group } from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls:   ['./app.component.css'],
  imports: [RouterOutlet],
  animations: [
    trigger('routeAnimation', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'absolute', width: '100%' }), { optional: true }),
        group([
          query(':enter', [
            style({ opacity: 0 }),
            animate('0.6s ease-in-out', style({ opacity: 1 }))
          ], { optional: true }),
          query(':leave', [
            style({ opacity: 1 }),
            animate('0.6s ease-in-out', style({ opacity: 0 }))
          ], { optional: true })
        ])
      ])
    ])
  ]
})
export class AppComponent {}
