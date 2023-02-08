import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AssignDatePage } from './assign-date.page';

const routes: Routes = [
  {
    path: '',
    component: AssignDatePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AssignDatePageRoutingModule {}
