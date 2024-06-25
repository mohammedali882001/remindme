import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { StoryInfoDto } from '../../../../models/Story/story-info-dto';
import { StoryServicesService } from '../../../../services/StoryService/story-services.service';
import { GeneralResponse } from '../../../../models/Story/general-response';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HasStoryTest } from '../../../../models/Story/has-story-test';
import { TrueAssignStoryTest } from '../../../../models/Story/true-assign-story-test';
import { StoryDTOs } from '../../../../models/Story/story-dtos';

@Component({
  selector: 'app-all-stories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './all-stories.component.html',
  styleUrl: './all-stories.component.css'
})
export class AllStoriesComponent
implements OnInit {
  stories: StoryInfoDto[] = [];
  errorMessage: string = '';

  constructor(private storyService: StoryServicesService, private router: Router) { }

  ngOnInit(): void {
    this.getAllStories();
  }

  getAllStories(): void {
    this.storyService.getAllStoryTests().subscribe(
      (response: GeneralResponse<StoryInfoDto[]>) => {
        if (response.isSuccess) {
          this.stories = response.data;
        } else {
          this.errorMessage = 'Failed to load stories.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while fetching the stories.';
        console.error('Error:', error);
      }
    );
  }

  takeTest(storytestId: number): void {
    this.storyService.hasStoryTest(storytestId).subscribe(
      (response: GeneralResponse<HasStoryTest>) => {
        if (response.isSuccess) {
          this.storyService.assignPatientStoryTest(response.data.HasStory, storytestId).subscribe(
            (assignResponse: GeneralResponse<TrueAssignStoryTest | StoryDTOs>) => {
              if (assignResponse.isSuccess) {
                if (response.data.HasStory) {
                  const score = (assignResponse.data as TrueAssignStoryTest).score;
                  this.router.navigate(['/results-test'], { state: { score } });
                } else {
                  const storyTest = assignResponse.data as StoryDTOs;
                  this.router.navigate(['/story-test'], { state: { storyTest } });
                }
              } else {
                this.errorMessage = 'Failed to assign story test.';
              }
            },
            (error) => {
              this.errorMessage = 'An error occurred while assigning the story test.';
              console.error('Error:', error);
            }
          );
        } else {
          this.errorMessage = 'Failed to check story test.';
        }
      },
      (error) => {
        this.errorMessage = 'An error occurred while checking the story test.';
        console.error('Error:', error);
      }
    );
  }
}
