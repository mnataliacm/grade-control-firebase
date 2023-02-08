import {NgModule } from '@angular/core';
import { StudentsPageRoutingModule } from './students-routing.module';
import { StudentsPage } from './students.page';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    StudentsPageRoutingModule
  ],
  declarations: [StudentsPage],
})
export class StudentsPageModule {}
