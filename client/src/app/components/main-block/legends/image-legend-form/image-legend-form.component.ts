import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {MaterialService} from "../../../../shared/material.service";
import {Legend} from "../../../../shared/interfaces";

@Component({
  selector: 'app-image-legend-form',
  templateUrl: './image-legend-form.component.html',
  styleUrls: ['./image-legend-form.component.scss']
})
export class ImageLegendFormComponent implements OnInit {

  @ViewChild('input') inputRef: ElementRef;
  legendsArray: Legend[] = [];
  form: FormGroup;
  imagePreview: any;
  image: string;

  constructor(
    private http: HttpClient,
    private material: MaterialService
  ) {
  }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm() {
    this.form = new FormGroup({
      src: new FormControl(null, Validators.required),
      text: new FormControl('', Validators.required)
    })
  }

  onSubmit() {
    console.log(this.legendsArray)
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
            src: data.image
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


  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  addLegendToArray(){
    this.legendsArray.push(this.form.value)
  }

  onDeleteLegend(i: number){
    this.legendsArray.splice(i, 1);
  }

}
