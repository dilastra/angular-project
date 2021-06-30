import { NgModule } from '@angular/core';
import { SharedModule, TuiModule } from '../../core';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent],
  imports: [TuiModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
