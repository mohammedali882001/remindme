import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-results-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './results-test.component.html',
  styleUrl: './results-test.component.css'
})
export class ResultsTestComponent implements OnInit  {
  score: number=0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
  ) {}


  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const scoreParam = params.get('score');
      if (scoreParam !== null) {
        this.score = +scoreParam;
      } else {
        // Handle the case where 'score' parameter is null or undefined
        console.error('Score parameter is null or undefined.');
      }
    });
  }

}
