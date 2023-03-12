import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { ModuleModel } from '../../models';
import { GradeService } from '../../services';

@Component({
  selector: 'app-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.scss'],
})
export class ModuleFormComponent {

  form: FormGroup;
  mode: "New" | "Edit" = "New";

  @Input('module') set module(module: ModuleModel) {
    if (module) {
      this.form.controls.docId.setValue(module.docId);
      this.form.controls.name.setValue(module.name);
      this.form.controls.teacher.setValue(module.teacher);
      this.mode = "Edit";
    }
  }

  constructor(
    private fb: FormBuilder,
    private modal: ModalController,
  ) {
    this.form = this.fb.group({
      docId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      teacher: ['']
    });
  }

  // getGrades() {
  //   var _grades = this.gradeSvc.grades$;
  //   return _grades;
  // }

  onSubmit() {
    this.modal.dismiss({ module: this.form.value, mode: this.mode }, 'ok');
  }

  onDismiss(result: any) {
    this.modal.dismiss(null, 'cancel');
  }
}
