import { CompanyInterface, RoleInterface } from "./";

export interface UserInterface {
  age: number,
  company: CompanyInterface,
  document: string,
  email:string,
  gender:string,
  role:RoleInterface,
  id: string,
  phone: string,
  username: string,
  imgUser: string,
  rutines?: any,
  userId?: string
  resalt?: boolean,
  resaltBtn0?: boolean,
  resaltBtn2?: boolean
}