import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { ModuleModel } from '../models';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {

  private _moduleSubject:BehaviorSubject<ModuleModel[]> = new BehaviorSubject<ModuleModel[]>([]);
  public modules$ = this._moduleSubject.asObservable();
  
  unsubscr;
  constructor(
    private firebase:FirebaseService) 
    { 
      this.unsubscr = this.firebase.subscribeToCollection('modules',this._moduleSubject, this.mapModule);
    }

  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapModule(doc:DocumentData){
    return {
      docId:doc.id,
      name:doc.data().name,
      teacher:doc.data().teacher,
      level:doc.data().level,
      grade:doc.data().grade
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
          teacher: module.data['teacher'],
          level: module.data['level'],
          grade: module.data['grade'],
        });
      } catch (error) {
        reject(error);
      }
    });
  }

 async createModule(module:ModuleModel){
  try {
    await this.firebase.createDocumentWithId('modules', module, module.docId);  
  } catch (error) {
    console.log(error);
  }
    }  
  
  async updateModule(module: ModuleModel){
    var _module = {
      docId: module.docId,
      name: module.name,
      teacher: module.teacher,
      level: module.level,
      grade: module.grade,
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
