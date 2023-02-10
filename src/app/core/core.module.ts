import { LOCALE_ID, NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { createTranslateLoader } from 'src/app/core/utils/translate';
import es from '@angular/common/locales/es';
import en from '@angular/common/locales/en';
import { IonicStorageModule } from '@ionic/storage-angular';
import { Drivers } from '@ionic/storage';
import { DateTimeSelectableComponent } from './components/date-time-selectable/date-time-selectable.component';
import { AssignScheduleComponent, GradeComponent, GradeFormComponent, GradeSelectComponent, ModuleComponent, ModuleFormComponent, ProfileComponent, StudentComponent, StudentFormComponent, TaskComponent, TaskFormComponent } from './components';
import { OrderByPipe } from './pipes/orderByPipe';
import { Camera } from '@awesome-cordova-plugins/camera/ngx';
import { File } from '@awesome-cordova-plugins/file/ngx';

registerLocaleData(en);
registerLocaleData(es);

@NgModule({
  declarations: 
  [
    DateTimeSelectableComponent,
    ProfileComponent,
    GradeComponent,
    GradeFormComponent,
    GradeSelectComponent,
    AssignScheduleComponent,
    StudentComponent,
    StudentFormComponent,
    ModuleComponent,
    ModuleFormComponent,
    TaskComponent,
    TaskFormComponent,
    OrderByPipe
  ],
  imports: 
  [
    CommonModule,
    FormsModule,
    IonicModule.forRoot(),
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forChild({
      loader: {
      provide: TranslateLoader,
      useFactory: (createTranslateLoader),
      deps: [HttpClient]
      }
    }),
    IonicStorageModule.forRoot({
      name: '__gradecontroldb',
          driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
    }),
    
  ],
  exports: 
  [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule,    
    DateTimeSelectableComponent,
    ProfileComponent,
    GradeComponent,
    GradeFormComponent,
    GradeSelectComponent,
    AssignScheduleComponent,
    StudentComponent,
    StudentFormComponent,
    ModuleComponent,
    ModuleFormComponent,
    TaskComponent,
    TaskFormComponent,
    OrderByPipe
  ],
  providers: [
  {
    provide: LOCALE_ID,
    useValue: 'es'
  },
  Camera,
  File
]
})

export class CoreModule { }
