import { NgModule } from '@angular/core';
import { ClassroomsPageRoutingModule } from './classrooms-routing.module';
import { ClassroomsPage } from './classrooms.page';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    ClassroomsPageRoutingModule
  ],
  declarations: [ClassroomsPage]
})
export class ClassroomsPageModule {}
