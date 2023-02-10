import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClassroomsPage } from './classrooms.page';

const routes: Routes = [
  {
    path: '',
    component: ClassroomsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClassroomsPageRoutingModule {}
