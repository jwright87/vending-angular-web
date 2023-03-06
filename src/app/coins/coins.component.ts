import {Component, Injectable, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as http from "http";
import {map, Observable} from "rxjs";

class Balance {

  balance: number
  message: string

  constructor(balance: number, message: string) {
    this.balance = balance;
    this.message = message;
  }
}


class CoinsAccepted {

  coins: Coin[] = [];
  message: string = "";


  constructor(coins: Coin[], message: string) {
    this.coins = coins;
    this.message = message;
  }
}

class Coin {

  name: string = "";
  valueInPence: number = 0;


  constructor(name: string, valueInPence: number) {
    this.name = name;
    this.valueInPence = valueInPence;
  }
}

@Component({
  selector: 'app-coins',
  templateUrl: './coins.component.html',
  styleUrls: ['./coins.component.css']
})
@Injectable()
export class CoinsComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }
  balance: Object | undefined = "0"
  message: string = "";

  acceptedCoins: Coin[] = []
  selectedCoin = new FormControl('', [Validators.required])
  form = new FormGroup({
    selectedCoin: this.selectedCoin
  });


  constructor(private http: HttpClient) {

  }

  selectCoin(e: Event) {
    console.log("Select Coin Event..")
    const target = e.target as HTMLOptionElement
    console.log(target.value)
  }

  updateBalance() {
    this.http.get("http://localhost:8080/coins/balance", this.httpOptions).toPromise().then(balanceResponse => {
      console.log(`Promise Then Called with value`)
      // @ts-ignore
      console.log(balanceResponse.toString())
      // @ts-ignore
      const str: string = JSON.stringify(balanceResponse)
      const balance = JSON.parse(str)
      console.log(`Balance: ${balance.balance}`)
      // @ts-ignore
      this.balance = balance.balance;
      console.log(balance.message)
    });


  }

  getCoinList() {
    this.http.get("http://localhost:8080/coins/list", this.httpOptions).toPromise().then(coinResponse => {
      // @ts-ignore
      console.log(coinResponse)
      // @ts-ignore
      const str: string = JSON.stringify(coinResponse)
      const coinListResponse = JSON.parse(str)
      console.log(`Coins Size: ${coinListResponse.coins.length} Message: ${coinListResponse.message}`)
      this.acceptedCoins = coinListResponse.coins
      console.log(coinListResponse.message)
    });
  }

  insertCoin() {

    const selectedCoinValue = this.selectedCoin.value
    const tmpExample: string = `{"name":"FIVE_PENCE"}`
    console.log(`Coin Insert Request Json:  ${tmpExample}`)
    this.http.post("http://localhost:8080/coins/insert", tmpExample, this.httpOptions)
      .subscribe({
        next(value) {
          console.log(value)
        },
        error(e) {
          console.log(e)
        },
        complete() {
          console.log('coins/list Api Call Complete');

        }
      });
    this.updateBalance()
  }

  ngOnInit(): void {
    this.getCoinList()
  }

}
