import { Component, Input, ViewChild } from '@angular/core';
import { IonModal } from '@ionic/angular';
import { OverlayEventDetail } from '@ionic/core/components';
import { ClassroomModel } from '../../models';
import { ClassroomService } from '../../services';
import { isLowResolution as lowres } from 'src/app/utils/screen.utils';

@Component({
  selector: 'app-class-modules',
  templateUrl: './class-modules.component.html',
  styleUrls: ['./class-modules.component.scss'],
})
export class ClassModulesComponent {

  @ViewChild(IonModal) modal: IonModal;
  @Input() classroom: ClassroomModel;
  isModalOpen = false;
  isLowResolution: () => boolean = lowres;

  constructor(private classroomSvc: ClassroomService) { }

  getClassrooms() {
    return this.classroomSvc.getClassrooms();
  }

  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  // confirm() {
  //   this.modal.dismiss(this.name, 'confirm');
  // }


  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

}
