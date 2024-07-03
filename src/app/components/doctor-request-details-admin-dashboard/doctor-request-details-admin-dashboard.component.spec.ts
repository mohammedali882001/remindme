import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorRequestDetailsAdminDashboardComponent } from './doctor-request-details-admin-dashboard.component';

describe('DoctorRequestDetailsAdminDashboardComponent', () => {
  let component: DoctorRequestDetailsAdminDashboardComponent;
  let fixture: ComponentFixture<DoctorRequestDetailsAdminDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorRequestDetailsAdminDashboardComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DoctorRequestDetailsAdminDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
