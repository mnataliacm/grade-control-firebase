import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ClassroomFormComponent, ClassroomModel, ClassroomService, TaskModel } from 'src/app/core';
import { isLowResolution as lowres } from 'src/app/utils/screen.utils';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.page.html',
  styleUrls: ['./classrooms.page.scss'],
})
export class ClassroomsPage {

  _classroom: any;
  isLowResolution = lowres;

  constructor(
    private classroomkSvc: ClassroomService,
    private alert: AlertController,
    private modal: ModalController,
  ) {}

  getClassrooms() {
    return this.classroomkSvc.classroom$;
  }

  onEditClassroom(classroom: any){
    this.presentClassroomForm(classroom);
  }

  async presentClassroomForm(classroom:TaskModel){
    const modal = await this.modal.create({
      component:ClassroomFormComponent,
      componentProps:{
        classroom:classroom
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.classroomkSvc.createClassroom(result.data.classroom);
            break;
          case 'Edit':
            this.classroomkSvc.updateClassroom(result.data.classroom);
            break;
          default:
        }
      }
    });
  }

  async onDeleteAlert(classroom:ClassroomModel){
    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar la clase?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log("Operacion cancelada");
          },
        },
        {
          text: 'Borrar',
          role: 'confirm',
          handler: () => {
            this.classroomkSvc.deleteClassroom(classroom);
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async onDeleteClassroom(classroom:ClassroomModel){
    this.onDeleteAlert(classroom);
  }

  async presentForm(_class: typeof ClassroomFormComponent, onDismiss:(arg0: any)=>void){
    const modal = await this.modal.create({
      component:_class,
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        onDismiss(result.data);
      }
    });
  }

  onNewItem(){
    this.presentForm(ClassroomFormComponent, (data)=>{
      this.classroomkSvc.createClassroom(data.classroom);
    });
  }

}
