import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {AuthService} from "../../../components/auth-block/auth.service";
import {User} from "../../interfaces";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  user: User;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.getLoggedUser();
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
