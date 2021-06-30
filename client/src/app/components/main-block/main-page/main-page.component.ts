import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MaterialService} from "../../../shared/material.service";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private material: MaterialService
  ) { }

  ngOnInit(): void {
    this.getParams();
  }

  private getParams(){
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['logged']){
          this.material.showMessage(`Добро пожаловать, ${params['user']}!`);
        }
      }
    )
  }

}
