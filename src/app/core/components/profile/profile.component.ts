import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';
import { StudentModel } from '../../models';
import { PhotoItem, PhotoService } from '../../services/photo.service';
import { PlatformService } from '../../services/platform.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent {

  form:FormGroup;
  mode:"New" | "Edit" = "New";
  currentImage = new BehaviorSubject<string>("");
  currentImage$ = this.currentImage.asObservable();
  @Input('student') set student(student:StudentModel){
    if(student){
      this.form.controls.docId.setValue(student.docId);
      this.form.controls.name.setValue(student.name);
      this.form.controls.surname.setValue(student.surname);
      this.form.controls.email.setValue(student.email);      
      this.form.controls.picture.setValue(student.picture);
      if(student.picture)
        this.currentImage.next(student.picture);
      this.form.controls.pictureFile.setValue(null);
      this.mode = "Edit";
    }
  }
  
  constructor(
    public platform:PlatformService,
    private photoSvc:PhotoService,
    private fb:FormBuilder,
    private modal:ModalController,
    private cdr:ChangeDetectorRef
  ) { 
    this.form = this.fb.group({
      docId:[''],
      name:['', [Validators.required]],
      surname:['', [Validators.required]],
      email:['', [Validators.required, Validators.email]],
      picture:[''],
      pictureFile:[null]
    });
  }

  onSubmit(){   
    this.modal.dismiss({student: this.form.value, mode:this.mode}, 'ok');
  }

  onDismiss(result){
    this.modal.dismiss(null, 'cancel');
  }
  
  async changePic(fileLoader:HTMLInputElement, mode:'library' | 'camera' | 'file'){
    var item:PhotoItem = await this.photoSvc.getPicture(mode, fileLoader);
    this.currentImage.next(item.base64);
    this.cdr.detectChanges();
    this.form.controls.pictureFile.setValue(item.blob);
  }
}
