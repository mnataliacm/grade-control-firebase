import { Component, Input, OnInit } from '@angular/core';
import { AssignmentService, GradeService, TaskService } from '../../services';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { AssignModel, GradeModel, TaskModel } from '../../models';

@Component({
  selector: 'app-assign-schedule',
  templateUrl: './assign-schedule.component.html',
  styleUrls: ['./assign-schedule.component.scss'],
})
export class AssignScheduleComponent implements OnInit {

  //@Input() assign:AssignModel;
  isLowResolution = lowres;
  constructor(
    private gradeSvc: GradeService,
    private tasksSvc:TaskService,
    private assignmentsSvc:AssignmentService,
  ){

  }

  ngOnInit(
  ) {

  }

  // getTask():Promise<TaskModel>{
  //   var taskId = this.assign.taskId;
  //   if(taskId)
  //     return this.tasksSvc.getTask(taskId);
  //   return undefined;
  // }

  // getGrade():Promise<GradeModel>{
  //     return this.gradeSvc.getGrade(this.assign.gradeId);
  // }
}

