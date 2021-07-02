import { BrowserModule } from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from "./angular-material.module";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TextInputComponent } from './components/custom/text-input/text-input.component';
import { LoginPageComponent } from './components/auth-block/login-page/login-page.component';
import { RegisterPageComponent } from './components/auth-block/register-page/register-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './shared/layouts/main-layout/main-layout.component';
import { MainPageComponent } from './components/main-block/main-page/main-page.component';
import {AuthInterceptor} from "./shared/auth.interceptor";
import { CalendarComponent } from './components/main-block/calendar/calendar.component';
import { StylesDirective } from './directives/styles.directive';
import { CalendarFormComponent } from './components/main-block/calendar/calendar-form/calendar-form.component';
import {MAT_RADIO_DEFAULT_OPTIONS} from "@angular/material/radio";
import {MonthPipe} from "./pipes/month.pipe";
import { LegendsComponent } from './components/main-block/legends/legends.component';
import { ColorLegendFormComponent } from './components/main-block/legends/color-legend-form/color-legend-form.component';
import { ImageLegendFormComponent } from './components/main-block/legends/image-legend-form/image-legend-form.component';
import { MAT_COLOR_FORMATS, NgxMatColorPickerModule, NGX_MAT_COLOR_FORMATS } from '@angular-material-components/color-picker';
import {LengthPipe} from "./pipes/length.pipe";
import { ConfirmComponent } from './components/main-block/confirm/confirm.component';
const INTERCEPT_PROVIDER: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptor,
  multi: true
};

const RADIO_BUTTON_PROVIDER: Provider = {
  provide: MAT_RADIO_DEFAULT_OPTIONS,
  useValue: { color: 'primary' }
};

const COLOR_PICKER_PROVIDER: Provider = {
  provide: MAT_COLOR_FORMATS,
  useValue: NGX_MAT_COLOR_FORMATS
};
@NgModule({
  declarations: [
    AppComponent,
    TextInputComponent,
    LoginPageComponent,
    RegisterPageComponent,
    AuthLayoutComponent,
    MainLayoutComponent,
    MainPageComponent,
    CalendarComponent,
    StylesDirective,
    CalendarFormComponent,
    MonthPipe,
    LegendsComponent,
    ColorLegendFormComponent,
    ImageLegendFormComponent,
    LengthPipe,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    NgxMatColorPickerModule
  ],
  providers: [
    INTERCEPT_PROVIDER,
    RADIO_BUTTON_PROVIDER,
    COLOR_PICKER_PROVIDER
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
