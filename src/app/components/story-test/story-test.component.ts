import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
declare const Plyr: any;

@Component({
  selector: 'app-story-test',
  standalone: true,
  imports: [],
  templateUrl: './story-test.component.html',
  styleUrl: './story-test.component.css'
})
export class StoryTestComponent implements AfterViewInit {

  title = 'audio-player';
  
    ngAfterViewInit() {
      const player = new Plyr('#audioPlayer');
     
  }

}
