import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AssignModel } from '../models';
import * as moment from 'moment-timezone';
import { TaskService } from './task.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentService {

  constructor(
    private taskSvc: TaskService
  ) {}

  getListTask() {
    return this.taskSvc.getTasks()
  }

  momentjs:any = moment;
  private _assigns: AssignModel[] = [];
  private _assignsSubject: BehaviorSubject<AssignModel[]> = new BehaviorSubject(this._assigns);
  public _assigns$ = this._assignsSubject.asObservable()

  id: number = this._assigns.length + 1;

  getAssign() {
    return this._assigns;
  }

  // getAssignById(id:string){
  //   return this._assigns.find(a=>a.id==id);
  // }

  // getAssignByStudentId(studentId: string): AssignModel[] {
  //   return this._assigns.filter(p => p.id == studentId);
  // }

  // getAssignByTaskId(taskId: string): AssignModel[] {
  //   return this._assigns.filter(p => p.id == taskId);
  // }

  // deleteAssignById(id: string) {
  //   this._assigns = this._assigns.filter(p => p.id != id);
  //   this._assignsSubject.next(this._assigns);
  // }

  // addAssign(assign: AssignModel) {
  //   assign.id = '';
  //   this._assigns.push(assign);
  //   this._assignsSubject.next(this._assigns);
  // }

  updateAssign(assign: AssignModel) {
    var _assign = this._assigns.find(p => p.id == assign.id)
    if (_assign) {
      _assign.taskId = assign.taskId;
      _assign.dateTime = assign.dateTime;
    }
    this._assignsSubject.next(this._assigns);
  }
}
