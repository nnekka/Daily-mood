import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatSidenav} from "@angular/material/sidenav";
import {BreakpointObserver} from "@angular/cdk/layout";
import {AuthService} from "../../../components/auth-block/auth.service";

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  @ViewChild('sidenav') sidenav: MatSidenav;

  show = true;

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit(): void {
  }

  toggleSidebar() {
    this.sidenav.toggle()
  }

  onLogout() {
    this.authService.logout();
  }
}
