import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SelectedOptionStoryTestDirective } from '../../../directives/selected-option-story-test.directive';
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule,],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})

export class QuestionsComponent {
  options = ['Option A', 'Option B', 'Option C', 'Option D'];
  selectedOption: string='';

  selectOption(option: string) {
    this.selectedOption = option;
    console.log('Selected option:', this.selectedOption);
  }
}
