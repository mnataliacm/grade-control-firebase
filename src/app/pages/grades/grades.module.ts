import { NgModule } from '@angular/core';
import { GradesPageRoutingModule } from './grades-routing.module';
import { GradesPage } from './grades.page';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    GradesPageRoutingModule,
  ],
  declarations: [GradesPage]
})
export class GradesPageModule {}
