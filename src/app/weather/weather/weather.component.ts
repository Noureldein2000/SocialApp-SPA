import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.css']
})
export class WeatherComponent implements OnInit {

  weathers: any

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    // this.getWeathers();
  }

  getWeathers() {
    this.http.get('https://localhost:44326/weatherforecast/getweathers').subscribe(
      respone => { this.weathers = respone; },
      error => { console.log(error); }

    );
  }

}
