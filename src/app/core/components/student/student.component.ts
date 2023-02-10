import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonItemSliding } from '@ionic/angular';
import { GradeModel, StudentModel } from '../../models';
import { GradeService, StudentService } from '../../services';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.scss'],
})
export class StudentComponent {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Output() profile = new EventEmitter;
  @Input() student:StudentModel;
  @Input() grade:GradeModel;
  isLowResolution:()=>boolean = lowres;

  constructor(
    private studentSvc:StudentService,
    private gradeSvc:GradeService,
    private translate:TranslateService,
  ){}

  getGrades() {
    return this.gradeSvc.grades$;
  }

  // getFilteredStudents(grade){
  //   return this.student.filter((s:any)=>s.grade == grade);
  // }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.student);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.student);
  }

  toProfile(){
    this.profile.emit(this.student);
  }

}
