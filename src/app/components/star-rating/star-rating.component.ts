import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SharedModule } from '../../models/shared-module';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})

export class StarRatingComponent implements OnInit {
  @Input() rating: number = 0;
  fullStars: number[] = [];
  halfStars: number[] = [];
  emptyStars: number[] = [];

  ngOnInit(): void {
    this.calculateStars();
  }

  calculateStars(): void {
    const fullStarCount = Math.floor(this.rating);
    const halfStarCount = this.rating % 1 >= 0.5 ? 1 : 0;
    const emptyStarCount = 5 - fullStarCount - halfStarCount;

    this.fullStars = Array(fullStarCount).fill(0).map((_, i) => i);
    this.halfStars = Array(halfStarCount).fill(0).map((_, i) => i);
    this.emptyStars = Array(emptyStarCount).fill(0).map((_, i) => i);
  }
}
