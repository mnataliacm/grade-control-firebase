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
      tutor:doc.data().tutor,
      module1:doc.data().module1,
      module2:doc.data().module2,
      module3:doc.data().module3,
      module4:doc.data().module4,
      module5:doc.data().module5,
      module6:doc.data().module6,
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
          tutor: classroom.data.tutor,
          module1: classroom.data.module1,
          module2: classroom.data.module2,
          module3: classroom.data.module3,
          module4: classroom.data.module4,
          module5: classroom.data.module5,
          module6: classroom.data.module6,
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
      tutor: classroom.tutor,
      module1: classroom.module1,
      module2: classroom.module2,
      module3: classroom.module3,
      module4: classroom.module4,
      module5: classroom.module5,
      module6: classroom.module6,
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
