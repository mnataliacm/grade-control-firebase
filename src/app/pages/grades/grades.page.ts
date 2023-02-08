import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { GradeFormComponent, GradeModel, GradeService } from 'src/app/core';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.page.html',
  styleUrls: ['./grades.page.scss'],
})
export class GradesPage {

  constructor(
    private gradeSvc: GradeService,
    private modal:ModalController,
    private alert:AlertController,
    private translate:TranslateService,
  ) { }

  getGrades(){
    return this.gradeSvc.grades$ ;
  }

  async presentGradeForm(grade: GradeModel){
    const modal = await this.modal.create({
      component:GradeFormComponent,
      componentProps:{
        grade:grade
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.gradeSvc.createGrade(result.data.grade);
            break;
          case 'Edit':
            this.gradeSvc.updateGrade(result.data.grade);
            break;
          default:
        }
      }
    });
  }

  onEditGrade(grade: GradeModel){
    this.presentGradeForm(grade);
  }

  async onDeleteGrade(grade: GradeModel){
    const alert = await this.alert.create({
      header: 'Atención',
      message: '¿Está seguro de que desear borrar el curso?',
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
            this.gradeSvc.deleteGrade(grade);
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async presentForm(_class: typeof GradeFormComponent, onDismiss:(arg0: any)=>void){
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
    this.presentForm(GradeFormComponent, (data)=>{
      this.gradeSvc.createGrade(data.grade);
    });
  }
}
