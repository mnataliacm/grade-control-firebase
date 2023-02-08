import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GradeModel } from '../../models';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { GradeService } from '../../services';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.scss'],
})
export class GradeComponent {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() grade: GradeModel;
  isLowResolution:()=>boolean = lowres;
  constructor(
    private gradeSvc:GradeService,
  ) {
      
   }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.grade);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.grade);
  }

}
