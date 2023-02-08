import { Injectable } from '@angular/core';
import { DocumentData, orderBy } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { GradeModel } from '../models';

import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})

export class GradeService {

  private _gradesSubject: BehaviorSubject<GradeModel[]> = new BehaviorSubject<GradeModel[]>([]);
  public grades$ = this._gradesSubject.asObservable();

  unsubscr;
  constructor(
    private firebase: FirebaseService) {
    this.unsubscr = this.firebase.subscribeToCollection('grades', this._gradesSubject, this.mapGrade);
  }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapGrade(doc: DocumentData) {
    return {
      docId: doc['id'],
      name: doc['data']().name,
      acronym: doc['data']().acronym,
    };
  }

  getGrades() {
    return this._gradesSubject.value;
  }

  getGradeById(id: string): Promise<GradeModel> {
    return new Promise<GradeModel>(async (resolve, reject) => {
      try {
        var grade = (await this.firebase.getDocument('grades', id));
        resolve({
          docId: grade.id,
          name: grade.data['name'],
          acronym: grade.data['acronym']
        });
      } catch (error) {
        reject(error);
      }
    });
  }

  async createGrade(grade: GradeModel) {
    try {
      await this.firebase.createDocument('grades', grade);  
    } catch (error) {
      console.log(error);
    }
  }

  async updateGrade(grade: GradeModel) {
    var _grade = {
      docId: grade.docId,
      name: grade.name,
      acronym: grade.acronym
    };
    try {
      await this.firebase.updateDocument('grades', _grade.docId, _grade);  
    } catch (error) {
      console.log(error);
    }
  }

  async deleteGrade(grade:GradeModel) {
    await this.firebase.deleteDocument('grades', grade.docId);
  }
}
