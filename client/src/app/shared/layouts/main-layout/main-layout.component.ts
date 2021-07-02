import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {AuthService} from "../../../components/auth-block/auth.service";
import {Calendar, User} from "../../interfaces";
import {CalendarService} from "../../services/calendar.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  user: User;
  calendars: Calendar[];

  constructor(
    private authService: AuthService,
    private calendarService: CalendarService
  ) { }

  ngOnInit(): void {
    this.getLoggedUser();
    this.getCalendars()
  }


  private getCalendars(){
    this.calendarService.calendarsSubject.subscribe(
      (calendars: Calendar[]) => {
        this.calendars = calendars;
      }
    )
  }
  toggleSidebar() {
    this.sidenav.toggle();
  }

  onLogout() {
    this.authService.logout();
  }

  private getLoggedUser() {
    this.authService.loggedUser.subscribe(
      (user: User) => {
        this.user = user;
      }
    )
  }
}
