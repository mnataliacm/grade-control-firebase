import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { ClassroomModel } from '../models';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class ClassroomService {

  private _classroomSubject:BehaviorSubject<ClassroomModel[]> = new BehaviorSubject([]);
  public _classroom$ = this._classroomSubject.asObservable();
  
  unsubscr;
  constructor(
    private firebase:FirebaseService
    ) 
    { 
      this.unsubscr = this.firebase.subscribeToCollection('classrooms',this._classroomSubject, this.mapGrade);
    }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapGrade(doc:DocumentData){
    return {
      docId:doc.id,
      level:doc.data().level,
      grade:doc.data().grade,
      // modules:doc.data().modules,
      // students:doc.data().students,
      // tasks:doc.data().tasks
    };
  }

  getClassrooms(){
    return this._classroomSubject.value;
  }

  getClassroomById(id:string):Promise<ClassroomModel>{
    return new Promise<ClassroomModel>(async (resolve, reject)=>{
      try {
        var classroom = (await this.firebase.getDocument('classrooms', id));
        resolve({
          docId: classroom.id,
          level: classroom.data.level,
          grade: classroom.data.grade,
          // modules: classroom.data.modules,
          // students: classroom.data.students,
          // tasks: classroom.data.tasks
        });
      } catch (error) {
        reject(error);
      }
    });
  }

 async createClassroom(classroom: ClassroomModel){
  try {
    await this.firebase.createDocument('classrooms', classroom);  
  } catch (error) {
    console.log(error);
  }
    }  
  
  async updateClassroom(classroom: ClassroomModel){
    var _classroom = {
      docId: classroom.docId,
      level: classroom.level,
      grade: classroom.grade,
      // modules: classroom.modules,
      // students: classroom.students,
      // tasks: classroom.tasks
    };
    try {
      await this.firebase.updateDocument('classrooms', _classroom.docId, _classroom);  
    } catch (error) {
      console.log(error);
    }
  }

  async deleteClassroom(classroom: ClassroomModel){
    try {
      await this.firebase.deleteDocument('classrooms', classroom.docId);
    } catch (error) {
      console.log(error);
    }  
  }
}
