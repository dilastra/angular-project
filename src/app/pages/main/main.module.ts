import { NgModule } from '@angular/core';
import { SharedModule, TuiModule } from '../../core';
import { HeaderComponent, SidenavComponent } from './custom-components';
import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';

@NgModule({
  declarations: [MainComponent, SidenavComponent, HeaderComponent],
  imports: [TuiModule, MainRoutingModule, SharedModule],
})
export class MainModule {}
