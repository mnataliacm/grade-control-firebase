import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { StudentModel } from '../../models';
import { GradeService, StudentService } from '../../services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  id: string = "";
  //task: any;
 //student: any;
  //grades: GradeModel;


  @Input('student') set student(student:StudentModel){
    if(student){
      this.form.controls['name'].setValue(student.name);
      this.form.controls['surname'].setValue(student.surname);
      this.form.controls['email'].setValue(student.email);
      this.form.controls['picture'].setValue(student.picture);
      this.form.controls['grade'].setValue(student.grade);
    }
  }

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modal: ModalController,
    private route: ActivatedRoute,
    private router: Router,
    private gradeSvc: GradeService,
    private studentSvc: StudentService
  ) { 
    //this.task = new TaskModel();
    //this.grades = new GradeModel();
    //this.student = StudentModel;
    this.form = this.formBuilder.group({
      id:[""],
      name:["", Validators.required],
      surname:["", Validators.required],
      email:["", [Validators.required, Validators.email]],
      picture:[""],
      grade:["", Validators.required]
    });

  }

  ngOnInit() {
    // this.id = this.route.snapshot.params['id'];
    // this.studentSvc.getStudent(Number(this.id)).subscribe(response => {
    //   console.log(response);
    //   this.form.controls['name'].setValue(response.name);
    //   this.form.controls['surname'].setValue(response.surname);
    //   this.form.controls['email'].setValue(response.email);
    //   this.form.controls['picture'].setValue(response.picture);
    //   this.form.controls['grade'].setValue(response.grade);
    // });
  }

  update() {
    // var student = this.form.value;
    // this.studentSvc.updateStudent(student.id, student).subscribe(
    //   {next:(data) => {
    //     this.router.navigate(['students']);
    //   }      
    // })
  }

  onSubmit(){
    // var student = this.form.value;
    // if(student.id!="-1")
    //   this.studentSvc.updateStudent(student.id, student);
    // else
    //   this.studentSvc.createStudent(student).subscribe(
    //     {next:(data)=>{
    //       this.router.navigate(['students']);
    //     },error:err=>{
    //       console.log(err);
    //     }}
    //   );
  }

  onDismiss(){
    this.modal.dismiss(null, 'cancel');
  }
}
