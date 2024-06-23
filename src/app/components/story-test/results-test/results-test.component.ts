import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-results-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-test.component.html',
  styleUrl: './results-test.component.css'
})
export class ResultsTestComponent {
  score: number = 70;
}
