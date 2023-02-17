import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GradeModel, ModuleModel } from '../../models';
import { GradeService } from '../../services';

@Component({
  selector: 'app-module-form',
  templateUrl: './module-form.component.html',
  styleUrls: ['./module-form.component.scss'],
})
export class ModuleFormComponent {

  grade: any;
  _grades: GradeModel;
  form: FormGroup;
  mode: "New" | "Edit" = "New";

  @Input('module') set module(module: ModuleModel) {
    if (module) {
      this.form.controls['docId'].setValue(module.docId);
      this.form.controls['name'].setValue(module.name);
      this.form.controls['teacher'].setValue(module.teacher);
      this.form.controls['level'].setValue(module.level);
      this.form.controls['grade'].setValue(module.grade);
      this.mode = "Edit";
    }
  }

  constructor(
    private fb: FormBuilder,
    private modal: ModalController,
    private gradeSvc: GradeService
  ) {
    this.form = this.fb.group({
      docId: ['', [Validators.required]],
      name: ['', [Validators.required]],
      teacher: [''],
      level: [''],
      grade: ['']
    });
  }

  getGrades() {
    var _grades = this.gradeSvc.grades$;
    return _grades;
  }

  onSubmit() {
    this.modal.dismiss({ module: this.form.value, mode: this.mode }, 'ok');
  }

  onDismiss(result: any) {
    this.modal.dismiss(null, 'cancel');
  }
}
