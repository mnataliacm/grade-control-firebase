import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { ModuleModel } from '../models';
import { FirebaseService } from './firebase/firebase-service';
import { GradeService } from './grade.service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private _moduleSubject:BehaviorSubject<ModuleModel[]> = new BehaviorSubject<ModuleModel[]>([]);
  public modules$ = this._moduleSubject.asObservable();
  
  unsubscr;
  constructor(
    private firebase:FirebaseService,
    private gradeSvc:GradeService) 
    { 
      this.unsubscr = this.firebase.subscribeToCollection('modules',this._moduleSubject, this.mapModule);
    }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapModule(doc:DocumentData){
    return {
      docId:doc['id'],
      name:doc['data']().name,
      acronym:doc['data']().acronym,
      grade:doc['data']().grade
    };
  }

  getModules(){
    return this._moduleSubject.value;
  }

  getModuleById(id:string):Promise<ModuleModel>{
    return new Promise<ModuleModel>(async (resolve, reject)=>{
      try {
        var module = (await this.firebase.getDocument('modules', id));
        resolve({
          docId: module.id,
          name: module.data['name'],
          acronym: module.data['acronym'],
          grade: module.data['grade']
        });
      } catch (error) {
        reject(error);
      }
    });
  }

 async createModule(module:ModuleModel){
  try {
    await this.firebase.createDocument('modules', module);  
  } catch (error) {
    console.log(error);
  }
    }  
  
  async updateModule(module: ModuleModel){
    var _module = {
      docId: module.docId,
      name: module.name,
      acronym: module.acronym,
      grade: module.grade
    };
    try {
      await this.firebase.updateDocument('modules', _module.docId, _module);  
    } catch (error) {
      console.log(error);
    }
  }

  async deleteModuleById(module:ModuleModel){
    await this.firebase.deleteDocument('modules', module.docId);
  }
}
