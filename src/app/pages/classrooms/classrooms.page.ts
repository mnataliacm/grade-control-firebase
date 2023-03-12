import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { ClassroomFormComponent, ClassroomService } from 'src/app/core';

@Component({
  selector: 'app-classrooms',
  templateUrl: './classrooms.page.html',
  styleUrls: ['./classrooms.page.scss'],
})
export class ClassroomsPage {

  constructor(
    private classroomSvc: ClassroomService,
    private alert: AlertController,
    private modal: ModalController,
  ) {}

  getClassrooms() {
    return this.classroomSvc._classroom$;
  }

  onEditClassroom(classroom){
    this.presentClassroomForm(classroom);
  }

  async presentClassroomForm(classroom){
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
            this.classroomSvc.createClassroom(result.data.classroom);
            break;
          case 'Edit':
            this.classroomSvc.updateClassroom(result.data.classroom);
            break;
          default:
        }
      }
    });
  }

  async onDeleteClassroom(classroom){
    this.onDeleteAlert(classroom);
  }

  async onDeleteAlert(classroom){
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
            this.classroomSvc.deleteClassroom(classroom);
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  onNewItem(){
    this.presentForm(ClassroomFormComponent, (data)=>{
      this.classroomSvc.createClassroom(data.classroom);
    });
  }

  async presentForm(_class, onDismiss:(any)=>void){
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

}
