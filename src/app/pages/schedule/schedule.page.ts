import { Component, OnInit, ViewContainerRef } from '@angular/core';
import * as moment from 'moment';
import { StudentService, TaskModel, TaskService } from 'src/app/core';


@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.page.html',
  styleUrls: ['./schedule.page.scss'],
})
export class SchedulePage {

  // constructor(
  //   private studentSvc: StudentService,
  //   private tasksSvc: TaskService,
  //   private containerRef: ViewContainerRef
  // ) {
    // this.tasksSvc.getTask.subscribe((task: TaskModel)=>{     
    //   this.calendarOptions = {
    //     locale:esLocale,
    //     initialView: 'timeGridWeek',
    //     height: 'auto',
    //     slotDuration: '01:00:00',
    //     slotLabelInterval: '01:00',
    //     slotMinTime: '08:00:00',
    //     slotMaxTime: '16:00:00',
    //     weekends: false,
    //     eventOverlap:false,
    //     contentHeight:'auto',
    //     eventChange:(event)=>{
    //       console.log(event.event.start);
    //       console.log(event.event.extendedProps['task'].date)         
    //       var task = {...event.event.extendedProps['task']};
    //       task.date = moment(event.event.start).toISOString();
    //       this.tasksSvc.updateTask(task.id, task);         
    //     },
    //     editable:true,
    //     events: task.map((a: { id: any; date: moment.MomentInput; })=>{
    //       var task = this.tasksSvc.getTask(a.id);
    //       return {
    //         "title":task.name, 
    //         "start":moment(a.date).toISOString(), 
    //         "end":moment(a.date).add(task.date, 'seconds').toISOString(),
    //         "assignment":a
    //       };
    //     }),
    //     eventContent:(arg)=>{
    //         var comp:ComponentRef<AssignmentScheduleComponent> = this.containerRef.createComponent(AssignmentScheduleComponent);
    //         comp.instance.assign = arg.event.extendedProps.task;
    //         return { domNodes: [comp.location.nativeElement] }

    //       }
    //    };     
    //   });
//   }

//   public ngOnInit(): void {
//     // HACK Rerender the calendar and correctly display it
//     setTimeout(() => {
//       this.calendarOptions.footerToolbar = false;
//     }, 300);
//   }

//   private initCalendar(): CalendarOptions {
//     return {
//       initialView: 'timeGridWeek',
//       height: 'auto',
//       slotDuration: '01:00:00',
//       slotLabelInterval: '01:00',
//       editable: true,
//       slotMinTime: '08:00:00',
//       slotMaxTime: '16:00:00',
//       weekends: false,
//       businessHours: {
//         daysOfWeek: [1, 2, 3, 4, 5],
//         startTime: '08:00',
//         endTime: '1:00',
//       },
//       events: [
//       ],
//     };
//   }
}
