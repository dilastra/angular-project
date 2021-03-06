import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  TuiRootModule,
  TuiThemeNightModule,
  TuiModeModule,
  TuiDialogModule,
  TuiLoaderModule,
} from '@taiga-ui/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TUI_LANGUAGE, TUI_RUSSIAN_LANGUAGE } from '@taiga-ui/i18n';
import { of } from 'rxjs';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptor } from './core';
import { TUI_VALIDATION_ERRORS } from '@taiga-ui/kit';
import { TextMaskModule } from 'angular2-text-mask';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    HttpClientModule,
    TuiRootModule,
    TuiDialogModule,
    TuiModeModule,
    TuiThemeNightModule,
    TuiLoaderModule,
    TextMaskModule,
  ],
  providers: [
    {
      provide: TUI_LANGUAGE,
      useValue: of(TUI_RUSSIAN_LANGUAGE),
    },
    { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptor, multi: true },
    {
      provide: TUI_VALIDATION_ERRORS,
      useValue: {
        required: 'Поле обязательно должно быть заполнено',
        email: 'Формат email неверный',
      },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
