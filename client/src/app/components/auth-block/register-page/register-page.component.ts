import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MaterialService} from "../../../shared/material.service";
import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {Subscription} from "rxjs/internal/Subscription";

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss']
})
export class RegisterPageComponent implements OnInit, OnDestroy {

  @ViewChild('input') inputRef: ElementRef;
  form: FormGroup;
  image: string;
  imagePreview: any;
  unSub: Subscription;

  constructor(
    private http: HttpClient,
    private material: MaterialService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    if (this.unSub){
      this.unSub.unsubscribe();
    }
  }
  private initForm() {
    this.form = new FormGroup({
      name: new FormControl(null),
      // avatar: new FormControl(null),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      avatar: new FormControl(null)
    })
  }

  onSubmit() {
    this.unSub = this.authService.register(this.form.value).subscribe(
      (response) => {
        this.router.navigate(['/login'], {
          queryParams: {
            registered: true,
            message: response.message
          }
        })
      },
      error => this.material.showMessage(error.error.errors[0].msg)
    )
  }

  triggerClick() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('image', file);
    this.http.post<{ image: string }>('/api/upload', formData)
      .subscribe(
        (data) => {
          this.image = Object.values(data)[0];
          this.form.patchValue({
            avatar: data.image
          });
          const reader = new FileReader();
          reader.onload = () => {
            this.imagePreview = reader.result;
          }
          reader.readAsDataURL(file);
        },
        error => this.material.showMessage(error.error.errors[0].message)
      )
  }
}
