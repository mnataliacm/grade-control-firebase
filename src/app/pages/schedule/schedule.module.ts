import { NgModule } from '@angular/core';
import { SchedulePageRoutingModule } from './schedule-routing.module';
import { SchedulePage } from './schedule.page';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    SchedulePageRoutingModule,
  ],
  declarations: [SchedulePage]
})
export class SchedulePageModule {}
