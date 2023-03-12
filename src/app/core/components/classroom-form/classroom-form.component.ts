import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ClassroomModel } from '../..';


@Component({
  selector: 'app-classroom-form',
  templateUrl: './classroom-form.component.html',
  styleUrls: ['./classroom-form.component.scss'],
})
export class ClassroomFormComponent {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  level: string;

  
  @Input('classroom') set classroom(classroom:ClassroomModel){
    if(classroom){
      this.form.controls.docId.setValue(classroom.docId);
      this.form.controls.level.setValue(classroom.level);
      this.form.controls.grade.setValue(classroom.grade);
      this.form.controls.tutor.setValue(classroom.tutor);
      this.form.controls.module1.setValue(classroom.module1);
      this.form.controls.module2.setValue(classroom.module2);
      this.form.controls.module3.setValue(classroom.module3);
      this.form.controls.module4.setValue(classroom.module4);
      this.form.controls.module5.setValue(classroom.module5);
      this.form.controls.module6.setValue(classroom.module6);
      this.mode = "Edit";
    }
  }
  
  constructor(
    private fb:FormBuilder,
    private modal:ModalController,    
  ) { 
    this.form = this.fb.group({
      docId:[''],
      level:[''],
      grade:[''],
      tutor:[''],
      module1:[''],
      module2:[''],
      module3:[''],
      module4:[''],
      module5:[''],
      module6:[''],
    });
  }

  onSubmit(){  
    this.modal.dismiss({classroom: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }

}
