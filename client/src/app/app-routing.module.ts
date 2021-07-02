import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AuthLayoutComponent} from "./shared/layouts/auth-layout/auth-layout.component";
import {MainLayoutComponent} from "./shared/layouts/main-layout/main-layout.component";
import {LoginPageComponent} from "./components/auth-block/login-page/login-page.component";
import {RegisterPageComponent} from "./components/auth-block/register-page/register-page.component";
import {MainPageComponent} from "./components/main-block/main-page/main-page.component";
import {AuthGuard} from "./shared/auth.guard";
import {CalendarComponent} from "./components/main-block/calendar/calendar.component";
import {CalendarFormComponent} from "./components/main-block/calendar/calendar-form/calendar-form.component";
import {CalendarResolver} from "./components/main-block/calendar/calendar.resolver";
import {ColorLegendFormComponent} from "./components/main-block/legends/color-legend-form/color-legend-form.component";
import {ImageLegendFormComponent} from "./components/main-block/legends/image-legend-form/image-legend-form.component";

const routes: Routes = [
  {
    path: '', component: AuthLayoutComponent, children: [
      { path: '', redirectTo: '/login', pathMatch: 'full' },
      { path: 'login', component: LoginPageComponent },
      { path: 'register', component: RegisterPageComponent }
    ]
  },
  {
    path: '', component: MainLayoutComponent, canActivate: [AuthGuard], children: [
      { path: 'main-page', component: MainPageComponent },
      { path: 'calendar/new', component: CalendarFormComponent, pathMatch: 'full' },
      {
        path: 'calendar/:id',
        component: CalendarComponent,
        pathMatch: 'full',
        resolve: {
          calendar: CalendarResolver
        }
      },
      { path: 'legends/color/:calendarId', component: ColorLegendFormComponent, pathMatch: 'full' },
      { path: 'legends/image/:calendarId', component: ImageLegendFormComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
