import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute, Router} from "@angular/router";
import {MaterialService} from "../../shared/material.service";
import {User} from "../../shared/interfaces";
import {Observable} from "rxjs/internal/Observable";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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

  }

  login(user: User): Observable<User>{
    return this.http.post<User>('/api/users/login', user).pipe(
      tap(
        (user: User) => {
          this.user = user;
          this.setToken(user.token);
          localStorage.setItem('loggedUser', JSON.stringify(user));
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
