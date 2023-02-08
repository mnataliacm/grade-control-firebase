import { NgModule } from '@angular/core';
import { AssignDatePageRoutingModule } from './assign-date-routing.module';
import { AssignDatePage } from './assign-date.page';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    AssignDatePageRoutingModule
  ],
  declarations: [AssignDatePage]
})
export class AssignDatePageModule {}
