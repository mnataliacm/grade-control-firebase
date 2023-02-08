import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModuleModel } from '../../models';

@Component({
  selector: 'app-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.scss'],
})
export class ModuleFormComponent {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  @Input('module') set module(module:ModuleModel){
    if(module){
      this.form.controls['docId'].setValue(module.docId);
      this.form.controls['name'].setValue(module.name);
      this.form.controls['acronym'].setValue(module.acronym);
      this.form.controls['grade'].setValue(module.grade);
      this.mode = "Edit";
    }
  }
  
  constructor(
    private fb:FormBuilder,
    private modal:ModalController
  ) { 
    this.form = this.fb.group({
      docId:[''],
      name:['', [Validators.required]],
      acronym:[''],
      grade:['']
    });
  }

  onSubmit(){  
    this.modal.dismiss({module: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result: any){
    this.modal.dismiss(null, 'cancel');
  }
}
