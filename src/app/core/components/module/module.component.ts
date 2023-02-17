import { Component, Input, Output, EventEmitter } from '@angular/core';
import { isLowResolution as lowres } from 'src/app/utils/screen.utils';
import { IonItemSliding } from '@ionic/angular';
import { ModuleModel } from '../../models';

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss'],
})
export class ModuleComponent {

  @Output() onEdit = new EventEmitter;
  @Output() onDelete = new EventEmitter;
  @Input() module: ModuleModel;
  isLowResolution = lowres;

  constructor() { }

  onEditClick(slide: IonItemSliding) {
    slide.close();
    this.onEdit.emit(this.module);
  }

  onDeleteClick(slide: IonItemSliding) {
    slide.close();
    this.onDelete.emit(this.module);
  }

}
