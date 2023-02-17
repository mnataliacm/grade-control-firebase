import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { GradeModel } from '../../models';

@Component({
  selector: 'app-grade-form',
  templateUrl: './grade-form.component.html',
  styleUrls: ['./grade-form.component.scss'],
})
export class GradeFormComponent {

  form: FormGroup;
  mode: "New" | "Edit" = "New";
  @Input('grade') set grade(grade: GradeModel) {
    if (grade) {
      this.form.controls.docId.setValue(grade.docId);
      this.form.controls['name'].setValue(grade.name);
      this.mode = "Edit";
    }
  }

  constructor(
    private fb: FormBuilder,
    private modal: ModalController
  ) {
    this.form = this.fb.group({
      docId: ['', [Validators.required]],
      name: ['', [Validators.required]]
    });
  }

  onSubmit() {
    this.modal.dismiss({ grade: this.form.value, mode: this.mode }, 'ok');
  }

  onDismiss(result) {
    this.modal.dismiss(null, 'cancel');
  }

}
