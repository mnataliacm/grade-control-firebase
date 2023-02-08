import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { StudentModel } from '../models';
import { ApiService } from './api.service';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private _studentsSubject:BehaviorSubject<StudentModel[]> = new BehaviorSubject<StudentModel[]>([]);
  public _students$ = this._studentsSubject.asObservable();

  unsubscr;
  constructor(
    private api:ApiService,
    private firebase:FirebaseService) {
      this.unsubscr = this.firebase.subscribeToCollection('usuarios',this._studentsSubject, this.mapStudents);
     }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapStudents(doc:DocumentData){
    return {
      id:0,
      docId:doc['id'],
      first_name:doc['data']().first_name,
      last_name:doc['data']().last_name,
      nickname:doc['data']().nickname,
      picture:doc['data']().picture,
    };
  }

  getStudents(){
    return this._studentsSubject.value;
  }

  getStudentById(id:string):Promise<StudentModel>{
    return new Promise<StudentModel>(async (resolve, reject)=>{
      try {
        var student = (await this.firebase.getDocument('students', id));
        resolve({
          id:0,
          docId:student.id,
          name:student.data['name'],
          surname:student.data['surname'],
          email:student.data['email'],
          picture:student.data['picture'], 
        });  
      } catch (error) {
        reject(error);
      }
    });
  }

  async deleteStudent(student:StudentModel){
    try {
      await this.firebase.deleteDocument('students', student.docId);  
    } catch (error) {
      console.log(error);
    }
  }

  async createStudent(student:StudentModel){
    try {
      await this.firebase.createDocument('students', student);  
    } catch (error) {
      console.log(error);
    }
  }

  uploadImage(file: Blob):Promise<any>{  
    return new Promise(async (resolve, reject)=>{
      try {
        const data = await this.firebase.imageUpload(file);  
        resolve(data);
      } catch (error) {
        resolve(error);
      }
    });
  }

  async updateStudent(student:StudentModel){
    var _student = {
      docId:student.docId,
      name:student.name,
      surname:student.surname,
      email:student.email,
      picture:student.picture
    };
    if(student['pictureFile']){
      var response = await this.uploadImage(student['pictureFile']);
      _student['picture'] = response.image;
    }
    try {
      await this.firebase.updateDocument('students', student.docId, _student);  
    } catch (error) {
      console.log(error);
    }
      
  }


  
}
