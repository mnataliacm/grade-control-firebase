import { Component, OnInit } from '@angular/core';
import { isLowResolution as lowres} from 'src/app/utils/screen.utils';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  isLowResolution:()=>boolean = lowres;

  constructor() { }

  ngOnInit() {
  }

}
