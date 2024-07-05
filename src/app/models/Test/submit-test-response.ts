import { PatientTest } from "./patient-test";

export interface SubmitTestResponse {
    isSuccess: boolean;
    data: PatientTest // | string; // It could be PatientStoryTest or a string (NotFound message)
}
