import { NgModule } from '@angular/core';
import { TasksPageRoutingModule } from './tasks-routing.module';
import { TasksPage } from './tasks.page';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    TasksPageRoutingModule
  ],
  declarations: [TasksPage]
})
export class TasksPageModule {}
