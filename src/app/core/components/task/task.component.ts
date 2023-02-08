import { Component, EventEmitter, Input, Output } from '@angular/core';
import { TaskModel } from '../../models';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { GradeService, HttpClientProvider, TaskService } from '../../services';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() task:TaskModel | any;
  @Input() grade:any;
  isLowResolution = lowres;
  constructor(
    private taskSvc:TaskService,
    
    private gradeSvc:GradeService,
    private translate:TranslateService,
    private api:HttpClientProvider,
  ) { }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.task);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.task);
  }

}
