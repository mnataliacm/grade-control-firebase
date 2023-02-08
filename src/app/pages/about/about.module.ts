import { NgModule } from '@angular/core';
import { AboutPageRoutingModule } from './about-routing.module';
import { AboutPage } from './about.page';
import { CoreModule } from 'src/app/core/core.module';

@NgModule({
  imports: [
    CoreModule,
    AboutPageRoutingModule
  ],
  declarations: [AboutPage]
})
export class AboutPageModule {}
