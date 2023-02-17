import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import { ProfileComponent, StudentFormComponent, StudentModel } from 'src/app/core';
import { GradeService, StudentService } from 'src/app/core/services';

@Component({
  selector: 'app-students',
  templateUrl: './students.page.html',
  styleUrls: ['./students.page.scss'],
})
export class StudentsPage {

  _students: StudentModel[]=[];
  _grades:any;

  constructor(
    private studentSvc: StudentService,
    private alert: AlertController,
    private modal: ModalController,
    private translate: TranslateService,
    private gradeSvc: GradeService
  ) {
  }

  getStudents(){
    return this.studentSvc._students$;
  }
  getGrades() {
    return this.gradeSvc.grades$;
  }

  // getFilteredByGrade(grade:any){
  //   return this._students.filter(s=>s.grade == grade);
  // }

  onEditStudent(student){
    this.presentStudentForm(student);
  }

  async presentStudentForm(student){
    const modal = await this.modal.create({
      component:StudentFormComponent,
      componentProps:{
        student:student
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    modal.onDidDismiss().then(result=>{
      if(result && result.data){
        switch(result.data.mode){
          case 'New':
            this.studentSvc.createStudent(result.data.student);
            break;
          case 'Edit':
            this.studentSvc.updateStudent(result.data.student);
            break;
          default:
        }
      }
    });
  }

  async onDeleteStudent(student) {
    const alert = await this.alert.create({
      header:'Atención',
      message: '¿Está seguro de que desear borrar este estudiante?',
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
            this.studentSvc.deleteStudent(student);
          },
        },
      ],
    });
    await alert.present();
    const { role } = await alert.onDidDismiss();
  }

  async presentForm(_class: typeof StudentFormComponent, onDismiss:(arg0: any)=>void){
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
    this.presentForm(StudentFormComponent, (data)=>{
      this.studentSvc.createStudent(data.student);
    });
  }

  toProfileStudent(student) {
    this.presentProfileStudent(student);
  }

  async presentProfileStudent(student) {
    const modal = await this.modal.create({
      component: ProfileComponent,
      componentProps: {
        student: student
      },
      cssClass:"modal-full-right-side"
    });
    modal.present();
    // modal.onDidDismiss();
    modal.onDidDismiss().then(result => {
      this.studentSvc.getStudentById(result.data.student);
    });
  }
}
