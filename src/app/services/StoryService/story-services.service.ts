import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.development';
import { Observable } from 'rxjs';
import { StoryDTOs } from '../../models/Story/story-dtos';
import { GeneralResponse } from '../../models/Story/general-response';
import { StoryTest } from '../../models/Story/story-test';
import { PatientStoryAnswersDTO } from '../../models/Story/patient-story-answers-dto';
import { HasStoryTest } from '../../models/Story/has-story-test';
import { TrueAssignStoryTest } from '../../models/Story/true-assign-story-test';
import { StoryInfoDto } from '../../models/Story/story-info-dto';
import { StoryFormFileDto } from '../../models/Story/story-form-file-dto';
import { StoryTestResponse } from '../../models/Story/story-test-response';
import { PatientStoryTest } from '../../models/Story/patient-story-test';
import { SubmitStoryTestResponse } from '../../models/Story/submit-story-test-response';


@Injectable({
  providedIn: 'root'
})
export class StoryServicesService {
  private apiUrl = `${environment.baseUrl}/Story`; // Adjust URL as needed


  constructor(private http: HttpClient) { }

  getAllStoryTests(): Observable<GeneralResponse<StoryInfoDto[]>> {
    return this.http.get<GeneralResponse<StoryInfoDto[]>>(`${this.apiUrl}/AllStorytest`);
  }

  getStoryTestsOfPatient(): Observable<GeneralResponse<StoryDTOs[]>> {
    return this.http.get<GeneralResponse<StoryDTOs[]>>(`${this.apiUrl}`);
  }

  getStoryTest(storytestId: number): Observable<GeneralResponse<StoryDTOs>> {
    return this.http.get<GeneralResponse<StoryDTOs>>(`${this.apiUrl}/Storytest/${storytestId}`);
  }

  //Admin
  addStoryTest(storyFormFileDto: StoryFormFileDto): Observable<GeneralResponse<StoryTest>> {
    return this.http.post<GeneralResponse<StoryTest>>(`${this.apiUrl}/AddStoryTest`, storyFormFileDto);
  }
  //Admin
  updateStoryTest(storyTestId: number, storyFormFileDto: StoryFormFileDto): Observable<GeneralResponse<StoryTestResponse>> {
    return this.http.put<GeneralResponse<StoryTestResponse>>(`${this.apiUrl}/UpdateStoryTest/${storyTestId}`, storyFormFileDto);
  }
  //Admin
  deleteStoryTest(storyTestId: number): Observable<GeneralResponse<StoryTestResponse>> {
    return this.http.delete<GeneralResponse<StoryTestResponse>>(`${this.apiUrl}/DeleteStoryTest/${storyTestId}`);
  }

  submitStoryTest(storyTestId: number, patientStoryAnswers: PatientStoryAnswersDTO[]): Observable<GeneralResponse<SubmitStoryTestResponse>> {
    return this.http.post<GeneralResponse<SubmitStoryTestResponse>>(`${this.apiUrl}/submitStoryTest`, { storyTestId, patientStoryAnswers });
  }

  hasStoryTest(storytestId: number): Observable<GeneralResponse<HasStoryTest>> {
    return this.http.post<GeneralResponse<HasStoryTest>>(`${this.apiUrl}/HasStoryTest`, { storytestId });
  }

  assignPatientStoryTest(hasStoryTest: boolean, storytestId: number): Observable<GeneralResponse<TrueAssignStoryTest | StoryDTOs>> {
    return this.http.post<GeneralResponse<TrueAssignStoryTest | StoryDTOs>>(`${this.apiUrl}/AssignPatientStoryTest`, { hasStoryTest, storytestId });
  }
}
