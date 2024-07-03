import { PatientStoryTest } from "./patient-story-test";

export interface SubmitStoryTestResponse {
  isSuccess: boolean;
   data: PatientStoryTest // | string; // It could be PatientStoryTest or a string (NotFound message)
}
