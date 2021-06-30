import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {User} from "../../../shared/interfaces";
import {MaterialService} from "../../../shared/material.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private material: MaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getParams();
  }

  private initForm(){
    this.form = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    })
  }

  private getParams(){
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['accessDenied'] || params['sessionFailed']){
          this.material.showMessage('Залогиньтесь для этого действия');
        }
      }
    )
  }

  onSubmit(){
    this.authService.login(this.form.value).subscribe(
      (user: User) => {
        this.router.navigate(['/main-page'], {
          queryParams: {
            logged: true,
            user: user.name
          }
        })
      },
      error => this.material.showMessage(error.error.errors[0].msg)
    )
  }

}
