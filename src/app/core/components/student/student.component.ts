import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AlertController, IonItemSliding, ModalController } from '@ionic/angular';
import { GradeModel, StudentModel } from '../../models';
import { GradeService, HttpClientProvider, StudentService } from '../../services';
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
  @Input() student:StudentModel | any ;
  @Input() grade:any;
  isLowResolution:()=>boolean = lowres;

  constructor(
    private studentSvc:StudentService,
    private gradeSvc:GradeService,
    private translate:TranslateService,
    private api:HttpClientProvider,
  ){}

  getGrades() {
    return this.gradeSvc.grades$;
  }

  getFilteredStudents(grade:string|null){
    return this.student.filter((s:any)=>s.grade == grade);
  }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.student);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.student);
  }

}
