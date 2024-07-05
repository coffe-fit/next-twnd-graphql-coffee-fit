import { CompanyInterface, RoleInterface } from "./";

export interface ExerciseInterface {
  "exerciseId"?: string,
  "imgGood": string,
  "imgBad"?: string,
  "movie": string,
  "name": string,
  "rutineTypeId":string
  "metrics":[string]
}