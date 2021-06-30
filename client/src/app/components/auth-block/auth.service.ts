import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterialService} from "../../shared/material.service";
import {User} from "../../shared/interfaces";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedUser: BehaviorSubject<User> =  new BehaviorSubject<User>(null);
  private token = null;
  private user: User;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private material: MaterialService
  ) {}

  getToken(){
    return this.token;
  }

  setToken(token: string){
    this.token = token;
  }

  isAuthorized(){
    return !!this.token;

  }

  logout(){
    this.setToken(null);
    this.loggedUser.next(null);
    localStorage.clear();
    this.router.navigate(['/']);
  }

  login(user: User): Observable<User>{
    return this.http.post<User>('/api/users/login', user).pipe(
      tap(
        (user: User) => {
          this.user = user;
          this.setToken(user.token);
          localStorage.setItem('loggedUser', JSON.stringify(user));
          this.loggedUser.next(this.user);
        }
      )
    )
  }

  register(){

  }

  getUserById(){

  }
  updateUser(){

  }
}
