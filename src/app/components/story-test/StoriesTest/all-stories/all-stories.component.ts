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
import { SharedModule } from '../../../../models/shared-module';

@Component({
  selector: 'app-all-stories',
  standalone: true,
  imports: [CommonModule , SharedModule],
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
    console.log('takeTest called with storytestId:', storytestId);
  
    this.storyService.hasStoryTest(storytestId).subscribe({
      next: (response: GeneralResponse<HasStoryTest>) => {
        console.log('hasStoryTest response:', response);
  
        if (response.isSuccess) {
          console.log('Story test exists:', response.data);

          console.log('Story test exists:', response.data.HasStory);
  
          // Make sure response.data.HasStory is correctly set before proceeding
          const hasStory = response.data.HasStory ?? false; // Default to false if undefined
          this.storyService.assignPatientStoryTest(hasStory, storytestId).subscribe({
            next: (assignResponse: GeneralResponse<TrueAssignStoryTest | StoryDTOs>) => {
              console.log('assignPatientStoryTest response:', assignResponse);
  
              if (assignResponse.isSuccess) {
                if (hasStory) {
                  const score = (assignResponse.data as TrueAssignStoryTest).score;
                  console.log('Navigating to results-test with score:', score);
                  this.router.navigate(['/results-test'], { state: { score } });
                } else {
                  const storyTest = assignResponse.data as StoryDTOs;
                  console.log('Navigating to story-test with data:', storyTest);
                  this.router.navigate(['/story-test'], { state: { storyTest } });
                }
              } else {
                this.errorMessage = 'Failed to assign story test.';
                console.error(this.errorMessage);
              }
            },
            error: (error) => {
              this.errorMessage = 'An error occurred while assigning the story test.';
              console.error('Error during assignPatientStoryTest:', error);
            }
          });
        } else {
          this.errorMessage = 'Failed to check story test.';
          console.error(this.errorMessage);
        }
      },
      error: (error) => {
        this.errorMessage = 'An error occurred while checking the story test.';
        console.error('Error during hasStoryTest:', error);
      }
    });
  }
  
  
  
}
