import {Component, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'Drink Vending Machine';

  constructor(private http: HttpClient) {
  }

  fetchCoinList():string {
    let x = ""
    this.http.get<string>("http://localhost:8080/coins/list").subscribe({
      next(value) {
        console.log(value)
        x=value
      },
      complete() {
        console.log('coins/list Api Call Complete');

      }
    });
return x;
  }
}


