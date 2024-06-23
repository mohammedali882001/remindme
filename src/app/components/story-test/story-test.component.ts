import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild ,ElementRef} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap'; // Import NgbModal for modal functionality
import { StoryDTOs } from '../../models/Story/story-dtos';

declare const Plyr: any;

@Component({
  selector: 'app-story-test',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './story-test.component.html',
  styleUrl: './story-test.component.css'
})
export class StoryTestComponent implements OnInit, AfterViewInit {
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
