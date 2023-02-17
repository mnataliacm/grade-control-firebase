import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { GradeModel, StudentModel, GradeService } from '../..';
import { isLowResolution as lowres } from 'src/app/utils/screen.utils';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Output() profile = new EventEmitter;
  @Input() student: StudentModel;
  @Input() grade: GradeModel;
  isLowResolution: () => boolean = lowres;

  constructor(
    private gradeSvc: GradeService,
  ) { }

  getGrades() {
    return this.gradeSvc.grades$;
  }

  onEditClick() {
    this.onEdit.emit(this.student);
  }

  onDeleteClick() {
    this.onDelete.emit(this.student);
  }

  @ViewChild('popover') popover;

  isOpen = false;

  presentPopover(e: Event) {
    this.popover.Event = e
    this.isOpen = true;
  }

  onDismiss(result) {
    this.popover.dismiss(null, 'cancel');
  }

  // toProfile() {
  //   this.profile.emit(this.student);
  // }

}
