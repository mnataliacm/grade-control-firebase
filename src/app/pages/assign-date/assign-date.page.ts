import { Component } from '@angular/core';
import { AlertController, IonAccordionGroup } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { TaskModel, TaskService } from 'src/app/core';

@Component({
  selector: 'app-assign-date',
  templateUrl: './assign-date.page.html',
  styleUrls: ['./assign-date.page.scss'],
})
export class AssignDatePage {

  _tasks: any;
  selectedDateTime: string = '';
  propagateChange = (_: any) => { }
  isDisabled: boolean = false;

  constructor(

    private taskSvc: TaskService,
    private alert: AlertController,
    private translate: TranslateService,
  ) {}

  ionViewWillEnter() {
    this.getAllTasks();
  }

  getAllTasks() {
    this.taskSvc.getListTask().subscribe(response => {
      console.log(response);
      this._tasks = response;
    })
  }
  
  isWeekday = (dateString: string) => {
    const date = new Date(dateString);
    const utcDay = date.getUTCDay();

    /**
     * Date will be enabled if it is not
     * Sunday or Saturday
     */
    return utcDay !== 0 && utcDay !== 6;
  };

  writeValue(obj: any): void {
    this.selectedDateTime = obj;
  }
  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }
  registerOnTouched(fn: any): void {
  }
  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  getDateTime() {
    
  }

  onDateTimeChanged(dateTime: string, accordion:IonAccordionGroup) {
    this.selectedDateTime = dateTime;
    accordion.value = '';
    this.propagateChange(this.selectedDateTime)
  }

  onConfirm(dateTime: string, accordion:IonAccordionGroup) {
    this.onDateTimeChanged(dateTime, accordion);
    accordion.value = '';
  }

  onCancel(dateTime: string, accordion:IonAccordionGroup) {
    this.selectedDateTime = dateTime;
    accordion.value = '';
  }

  onTaskDateTime(event:any, task:TaskModel){
    task.date = event;
    this.taskSvc.updateTask(task.id, task);
    console.log(event);
  }

}
