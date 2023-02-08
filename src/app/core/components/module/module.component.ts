import { Component, Input, Output, EventEmitter} from '@angular/core';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { ModuleModel } from '../../models';
import { ModuleService } from '../../services/module.service';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() module:ModuleModel | any;
  isLowResolution = lowres;
  constructor(
    private moduleSvc:ModuleService,
  ) { }

  onEditClick(slide:IonItemSliding){
    slide.close();
    this.onEdit.emit(this.module);
  }

  onDeleteClick(slide:IonItemSliding){
    slide.close();
    this.onDelete.emit(this.module);
  }

}
