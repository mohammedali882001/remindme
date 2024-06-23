import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SharedModule } from '../../models/shared-module';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [CommonModule,SharedModule],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.css'
})
export class StarRatingComponent {
  @Input() rating: number=0;

  get fullStars(): number[] {
    const fullStarsCount = Math.floor(this.rating);
    return Array(fullStarsCount).fill(0);
  }

  get hasHalfStar(): boolean {
    return this.rating - Math.floor(this.rating) >= 0.5;
  }

  get emptyStars(): number[] {
    const emptyStarsCount = 5 - Math.ceil(this.rating);
    return Array(emptyStarsCount).fill(0);
  }
}
