import { Injectable } from '@angular/core';
import { DocumentData } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';
import { TaskModel } from '../models';
import { FirebaseService } from './firebase/firebase-service';

@Injectable({
  providedIn: 'root'
})

export class TaskService {

  private _tasksSubject:BehaviorSubject<TaskModel[]> = new BehaviorSubject<TaskModel[]>([]);
  public tasks$ = this._tasksSubject.asObservable();
  
  unsubscr;
  constructor(
    private firebase:FirebaseService) 
    {
      this.unsubscr = this.firebase.subscribeToCollection('tasks',this._tasksSubject, this.mapTask);
    }
  
  ngOnDestroy(): void {
    this.unsubscr();
  }

  private mapTask(doc:DocumentData){
    return {
      docId:doc['id'],
      name:doc['data']().name,
      type:doc['data']().type,
      info:doc['data']().info,
      module:doc['data']().module,
      date:doc['data']().date
    };
  }

  getTasks(){
    return this._tasksSubject.value;
  }

  getTaskById(id:string): Promise<TaskModel> {
    return new Promise<TaskModel>(async (resolve, reject)=>{
      try {
        var task = (await this.firebase.getDocument('tasks', id));
          resolve({
            docId: task['id'],
            name: task['name'],
            type: task['type'],
            info: task['info'],       
            module: task['module'],  
            date: task['date']     
          });
        } catch (error) {
          reject(error);
        }
      });
  }

  async createTask(task: TaskModel){
    try {
      await this.firebase.createDocument('tasks', task);  
    } catch (error) {
      console.log(error);
    }
  }

  async updateTask(task: TaskModel){
    var _task = {
      id:0,
      docId: task.docId,
          name: task.name,
          type: task.type,
          info: task.info,
          module: task.module,
          date: task.date
    };
    try {
      await this.firebase.updateDocument('tasks', _task.docId, _task);  
    } catch (error) {
      console.log(error);
    }
  }

  async deleteTask(task:TaskModel) {
    await this.firebase.deleteDocument('tasks', task.docId);
  }
  
}