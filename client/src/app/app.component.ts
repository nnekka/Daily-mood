import {Component, OnInit} from '@angular/core';
import {AuthService} from "./components/auth-block/auth.service";
import {User} from "./shared/interfaces";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  constructor(
    private authService: AuthService
  ){}

  ngOnInit(): void {
    const user: User = JSON.parse(localStorage.getItem('loggedUser'));

    if (user){
      this.authService.setToken(user.token);
      this.authService.loggedUser.next(user);
    }
  }
}
