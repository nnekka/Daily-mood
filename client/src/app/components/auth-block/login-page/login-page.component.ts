import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../auth.service";
import {User} from "../../../shared/interfaces";
import {MaterialService} from "../../../shared/material.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  form: FormGroup;
  unSub: Subscription;

  constructor(
    private authService: AuthService,
    private material: MaterialService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.initForm();
    this.getParams();
    this.authService.loggedUser.subscribe(
      (user: User) => {
        if (user){
          this.router.navigate(['/main-page']);
        }
      }
    )
  }

  ngOnDestroy(): void {
    if (this.unSub){
      this.unSub.unsubscribe();
    }
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
        if (params['registered']){
          this.material.showMessage(params['message']);
        }
      }
    )
  }

  onSubmit(){
    this.unSub = this.authService.login(this.form.value).subscribe(
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
