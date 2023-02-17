import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StudentModel } from '../../models';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  @Input() student:StudentModel;
  // @Input('student') set student(student:StudentModel){

  // }
  constructor(
    private modal:ModalController,
  ) { }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }

}
