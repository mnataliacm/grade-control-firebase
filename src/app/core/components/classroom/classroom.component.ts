import { Component, EventEmitter, Input, Output } from '@angular/core';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { ClassroomModel } from '../..';

@Component({
  selector: 'app-classroom',
  templateUrl: './classroom.component.html',
  styleUrls: ['./classroom.component.scss'],
})
export class ClassroomComponent {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() classroom: ClassroomModel;
  isLowResolution:()=>boolean = lowres;

  onEditClick(){
    this.onEdit.emit(this.classroom);
  }

  onDeleteClick(){
    this.onDelete.emit(this.classroom);
  }
   
}
