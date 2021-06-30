import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {User} from "../../../shared/interfaces";
import {MaterialService} from "../../../shared/material.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private material: MaterialService
  ) { }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(){
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  onSubmit(){
    this.authService.login(this.form.value).subscribe(
      (user: User) => {
        console.log(user)
      },
      error => console.log(error)
    )
  }

}
