import {Component, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from "rxjs";
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
@Injectable()
export class AppComponent {
  title = 'vending-angular-web';

  coinOptions = []

  constructor(private http: HttpClient) {
  }


  insertCoin() {}

  selectCoin() {}


  fetchCoinList() {
    this.http.get<string>("http://localhost:8080/coins/list").subscribe({
      next(value) {
        console.log(value)
      },
      complete() {
        console.log('coins/list Api Call Complete');

      }
    });

  }

  // Model
//   class Coin {
//   private _name:string = ""
//   private _cost:number=0
//
//
//   constructor(name: string, cost: number) {
//     this._name = name;
//     this._cost = cost;
//   }
//
//
//   get name(): string {
//     return this._name;
//   }
//
//   set name(value: string) {
//     this._name = value;
//   }
//
//   get cost(): number {
//     return this._cost;
//   }
//
//   set cost(value: number) {
//     this._cost = value;
//   }
//
// }
}


