import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
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

  // getFilteredStudents(grade){
  //   return this.student.filter((s:any)=>s.grade == grade);
  // }

  onEditClick(slide: IonItemSliding) {
    slide.close();
    this.onEdit.emit(this.student);
  }

  onDeleteClick(slide: IonItemSliding) {
    slide.close();
    this.onDelete.emit(this.student);
  }

  toProfile() {
    this.profile.emit(this.student);
  }

}
