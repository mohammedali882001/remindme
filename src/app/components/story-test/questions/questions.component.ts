import { CommonModule } from '@angular/common';
import { Component, NgModule, OnInit } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { SelectedOptionStoryTestDirective } from '../../../directives/selected-option-story-test.directive';
import { StoryDTOs } from '../../../models/Story/story-dtos';
import { ActivatedRoute, Router } from '@angular/router';
import { StoryServicesService } from '../../../services/StoryService/story-services.service';
import { GeneralResponse } from '../../../models/Story/general-response';
import { PatientStoryAnswersDTO } from '../../../models/Story/patient-story-answers-dto';
import { SubmitStoryTestResponse } from '../../../models/Story/submit-story-test-response';
import { PatientStoryTest } from '../../../models/Story/patient-story-test';
import { SharedModule } from '../../../models/shared-module';
@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule, FormsModule,SharedModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})

 export class QuestionsComponent implements OnInit {
  storyTestId?: number;
  storyTestDetails: StoryDTOs | null = null;
  errorMessage: string = '';
  selectedOptions: { [key: number]: string } = {}; // Track selected options per question

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storyService: StoryServicesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.storyTestId = +params['storyTestId']; // Ensure it's a number
      this.getStoryTestDetails(this.storyTestId);
    });
  }

  getStoryTestDetails(storyTestId: number): void {
    this.storyService.getStoryTest(storyTestId).subscribe(
      (response: GeneralResponse<StoryDTOs>) => {
        if (response.isSuccess) {
          this.storyTestDetails = response.data;
        } else {
          this.errorMessage = 'Failed to fetch story test details.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching story test details.';
        console.error('Error:', error);
      }
    );
  }

  selectOption(questionId: number, option: string) {
    this.selectedOptions[questionId] = option;
    console.log('Selected option for question', questionId, ':', option);
  }

  submitAnswers() {
    if (!this.storyTestId || !this.storyTestDetails) {
      this.errorMessage = 'Story test details are missing.';
      return;
    }

    const patientStoryAnswers: PatientStoryAnswersDTO[] = this.storyTestDetails.storyQuestionAndAnswers.map(question => ({
      StoryQuestionId: question.questionId,
      StoryAnswer: this.selectedOptions[question.questionId] || ''
    }));

    this.storyService.submitStoryTest(this.storyTestId, patientStoryAnswers).subscribe(
      (response: GeneralResponse<SubmitStoryTestResponse>) => {
        if (response.isSuccess) {
          const data = response.data;
          if (typeof data === 'object' && 'score' in data) {
            const score = data.score;
            this.router.navigate(['/results-test'], { queryParams: { score } });
          } else {
            this.errorMessage = 'Unexpected response data format.';
          }
        } else {
          this.errorMessage = 'Failed to submit story test.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while submitting story test.';
        console.error('Error:', error);
      }
    );
  }
}
//  implements OnInit {
//   storyTestId?: number;
//   storyTestDetails: StoryDTOs | null = null;
//   errorMessage: string = '';
//   selectedOptions: { [key: number]: string } = {}; // Track selected options per question

//   constructor(private route: ActivatedRoute, private storyService: StoryServicesService) {}

//   ngOnInit(): void {
//     this.route.params.subscribe(params => {
//       this.storyTestId = +params['storyTestId']; // Ensure it's a number
//       this.getStoryTestDetails(this.storyTestId);
//     });
//   }

//   getStoryTestDetails(storyTestId: number): void {
//     this.storyService.getStoryTest(storyTestId).subscribe(
//       (response: GeneralResponse<StoryDTOs>) => {
//         if (response.isSuccess) {
//           this.storyTestDetails = response.data;
//         } else {
//           this.errorMessage = 'Failed to fetch story test details.';
//         }
//       },
//       (error) => {
//         this.errorMessage = 'An error occurred while fetching story test details.';
//         console.error('Error:', error);
//       }
//     );
//   }

//   selectOption(questionId: number, option: string) {
//     this.selectedOptions[questionId] = option;
//     console.log('Selected option for question', questionId, ':', option);
//   }
// }
