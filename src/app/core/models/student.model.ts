export interface StudentModel {
  id: number;
  docId:string;
  name: string;
  surname: string;
  email?: string;
  picture?: string;  
  pictureFile?:null;
  grade?: string;  
}
