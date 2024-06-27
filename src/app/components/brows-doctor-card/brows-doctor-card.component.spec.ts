import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrowsDoctorCardComponent } from './brows-doctor-card.component';

describe('BrowsDoctorCardComponent', () => {
  let component: BrowsDoctorCardComponent;
  let fixture: ComponentFixture<BrowsDoctorCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BrowsDoctorCardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BrowsDoctorCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
