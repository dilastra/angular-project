import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SharedModule, TuiModule } from '../../core';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';

@NgModule({
  declarations: [AuthComponent],
  imports: [AuthRoutingModule, CommonModule, SharedModule],
})
export class AuthModule {}
