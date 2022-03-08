import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode: boolean = false;
  weathers: any;
  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getWeathers();
  }

  registerToggle() {
    console.log('clicked show register btn');
    this.registerMode = true  ;
  }

  getWeathers() {
    this.http.get('https://localhost:44326/weatherforecast/getweathers').subscribe(
      respone => { this.weathers = respone; },
      error => { console.log(error); }

    );
  }

  cancelRegister(registerMode:boolean){
    this.registerMode=registerMode;
  }

}
