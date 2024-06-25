import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild ,ElementRef, TemplateRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModal for modal functionality
import { StoryDTOs } from '../../models/Story/story-dtos';
import { SharedModule } from '../../models/shared-module';
declare const Plyr: any;

@Component({
  selector: 'app-story-test',
  standalone: true,
  imports: [CommonModule , SharedModule],
  templateUrl: './story-test.component.html',
  styleUrl: './story-test.component.css'
})
export class StoryTestComponent  implements OnInit, AfterViewInit {
  @ViewChild('attentionModal', { static: true }) attentionModal!: TemplateRef<any>;

  storyTest?: StoryDTOs;
  audioPlayed = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    // private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.storyTest = navigation.extras.state['storyTest'];
    } else {
      console.error('No storyTest data found in router state.');
    }
  }

  ngAfterViewInit(): void {
    const player = new Plyr('#audioPlayer');
  }


  openModal(content: any) {
   this.modalService.open(content, { size: 'lg', centered: true });

  }

  dismissModal() {
    this.modalService.dismissAll();
  }


    Play the audio only when the user confirms understanding in the modal
    const audio = document.getElementById(audioId) as HTMLAudioElement;
    audio.onended = () => {
      this.modalService.dismissAll(); // Dismiss the modal when audio ends
    };

  playAudioOnce() {
    if (!this.audioPlayed) {
      const audio = document.getElementById('audioPlayer') as HTMLAudioElement;
      if (audio) {
        audio.play();
        this.audioPlayed = true;
        audio.onended = () => {
          this.dismissModal();
        };
      } else {
        console.error('Audio element not found');
      }
    }
  }

  goToQuestions(storyId?: number) {
    if (storyId) {
      this.router.navigate(['/Question'], { state: { storyId } });
    } else {
      console.error('Story ID is not defined.');
    }

  }
}



implements OnInit, AfterViewInit {
[x: string]: any;
  storyTest?: StoryDTOs;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras.state) {
      this.storyTest = navigation.extras.state['storyTest'];
    } else {
      console.error('No storyTest data found in router state.');
    }
  }

  ngAfterViewInit(): void {
    const player = new Plyr('#audioPlayer');
  }

  openModal(content: any) {
    this.modalService.open(content, { size: 'lg', centered: true });
  }

  playAudio(audioId: string, modalContent: any) {
    // Open the modal warning before playing the audio
    this.openModal(modalContent);

    // Play the audio only when the user confirms understanding in the modal
    const audio = document.getElementById(audioId) as HTMLAudioElement;
    audio.onended = () => {
      this.modalService.dismissAll(); // Dismiss the modal when audio ends
    };
  }
}
