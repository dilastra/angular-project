import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuestionnaireComponent } from './questionnaire.component';
import { SharedModule } from 'src/app/core';
import { QuestionnaireRoutingModule } from './questionnaire-routing.module';

@NgModule({
  declarations: [QuestionnaireComponent],
  imports: [CommonModule, QuestionnaireRoutingModule, SharedModule],
})
export class QuestionnaireModule {}
