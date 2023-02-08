import { NgModule } from '@angular/core';
import { ModulesPageRoutingModule } from './modules-routing.module';
import { ModulesPage } from './modules.page';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    ModulesPageRoutingModule
  ],
  declarations: [ModulesPage]
})
export class ModulesPageModule {}
