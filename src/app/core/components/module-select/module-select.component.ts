import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { IonAccordionGroup } from '@ionic/angular';
import { ModuleModel } from '../../models';
import { ModuleService } from '../../services/module.service';
import { isLowResolution as lowres } from 'src/app/utils/screen.utils';

export const MODULE_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => ModuleSelectComponent),
  multi: true
}

@Component({
  selector: 'app-module-select',
  templateUrl: './module-select.component.html',
  styleUrls: ['./module-select.component.scss'],
  providers: [MODULE_VALUE_ACCESSOR]
})
export class ModuleSelectComponent implements ControlValueAccessor {

  selectedModule: ModuleModel = null;
  propagateChange = (_: any) => { }
  isDisabled: boolean = false;
  isLowResolution = lowres;

  constructor(private moduleSvc: ModuleService) { }

  async writeValue(obj: any) {
    try {
      this.selectedModule = await this.moduleSvc.getModuleById(obj);
    } catch (error) {
      console.log("No se ha podido recupera los datos: " + error);
    }
  }

  registerOnChange(fn: any): void {
    this.propagateChange = fn;
  }

  registerOnTouched(fn: any): void {
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  getModules() {
    return this.moduleSvc.getModules();
  }

  onModuleClicked(module: ModuleModel, accordion: IonAccordionGroup) {
    this.selectedModule = module;
    accordion.value = '';
    this.propagateChange(this.selectedModule.docId);
  }

}
