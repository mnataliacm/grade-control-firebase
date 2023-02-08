import { AfterViewInit, Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';
import { UserService } from './core';
import { LocaleService } from './core/services/locale.service';
import 'zone.js';
import 'zone.js/dist/long-stack-trace-zone.js';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements AfterViewInit {

  isLowResolution:()=>boolean = lowres;
  public labels = [];
  language = 0; // 0 español, 1 inglés
  constructor(
    private translate: TranslateService,
    private locale:LocaleService,
    public user:UserService,
    private router:Router
  ) {
    this.translate. setDefaultLang('es');
  }
  ngAfterViewInit(): void {
   
  }
  onLanguage(){
    this.language = (this.language+1)%2;
    switch(this.language){
      case 0:
        this.translate.setDefaultLang('es');
        this.locale.registerCulture('es');

        break;
      case 1:
        this.translate.setDefaultLang('en');
        this.locale.registerCulture('en');
        break;
    }
  }

  signOut(){
    this.user.signOut();
    this.router.navigate(['login']);
  }

}
