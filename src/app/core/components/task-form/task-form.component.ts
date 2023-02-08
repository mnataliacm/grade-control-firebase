import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { TaskModel } from '../../models';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.scss'],
})
export class TaskFormComponent {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  @Input('task') set task(task:TaskModel){
    if(task){
      this.form.controls['id'].setValue(task.id);
      this.form.controls['name'].setValue(task.name);
      this.form.controls['type'].setValue(task.type);
      this.form.controls['info'].setValue(task.info);
      this.form.controls['level'].setValue(task.level);
      this.form.controls['grade'].setValue(task.grade);
      this.form.controls['module'].setValue(task.module);
      this.form.controls['date'].setValue(task.date);
      this.mode = "Edit";
    }
  }
  
  constructor(
    private fb:FormBuilder,
    private modal:ModalController,
  ) { 
    this.form = this.fb.group({
      id:[null],
      name:['', [Validators.required]],
      type:[''],
      info:[''],
      level:[''],
      grade:[''],
      module:[''],
      date:[new Date().toISOString()]
    });
  }

  onSubmit(){
    this.modal.dismiss({task: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result:any){
    this.modal.dismiss(null, 'cancel');
  }
}
