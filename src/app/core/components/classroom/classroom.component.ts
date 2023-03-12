import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { ClassModulesComponent, ClassroomModel } from '../..';

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
  isModalOpen = false;

  onEditClick(){
    this.onEdit.emit(this.classroom);
  }

  onDeleteClick(){
    this.onDelete.emit(this.classroom);
  }
   
  onModulesClick() {

  }

  constructor(private modalCtrl: ModalController) {}

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: ClassModulesComponent,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

  }

}
