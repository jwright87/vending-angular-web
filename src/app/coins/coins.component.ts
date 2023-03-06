import {Component, Injectable, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Coin} from "./model/CoinDataModel";


function convertToPojo(value: Object) {
  const str = JSON.stringify(value)
  const pojo = JSON.parse(str)
  return pojo;
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

  selectedCoinValue: string = ""
  acceptedCoins: Coin[] = []
  selectedCoinControl = new FormControl('', [Validators.required])
  form = new FormGroup({
    selectedCoin: this.selectedCoinControl
  });


  constructor(private http: HttpClient) {

  }

  ngOnInit(): void {
    this.getCoinList()
    this.updateBalance()
  }


  selectCoin(e: Event) {
    const target = e.target as HTMLOptionElement
    this.selectedCoinValue = target.value
  }

  updateBalance() {
    this.http.get("http://localhost:8080/coins/balance", this.httpOptions).toPromise().then(balanceResponse => {
      console.log("Updating Balance...")
      const str: string = JSON.stringify(balanceResponse)
      const balance = JSON.parse(str)
      this.balance = balance.balance;
      console.log("Balance is: " + balance.balance)
    });

  }

  getCoinList() {
    this.http.get("http://localhost:8080/coins/list", this.httpOptions).toPromise().then(coinResponse => {
      const str: string = JSON.stringify(coinResponse)
      this.acceptedCoins = JSON.parse(str).coins
    });
  }

  insertCoin() {
    console.log(`Selected Coin Value on insertCoin(): ${this.selectedCoinValue}`)
    const selectedCoinValue = this.selectedCoinValue
    this.http.post("http://localhost:8080/coins/insert", selectedCoinValue, this.httpOptions)
      .toPromise().then(() => this.updateBalance())

  }

  refundCoins():string {
    var message = "";
    this.http.put("http://localhost:8080/coins/refund", this.httpOptions).subscribe({
      next(value) {
        console.log(value)
        const pojo = convertToPojo(value);
        message = pojo.message;
      },
      error(e) {
        console.log(e)
        message = convertToPojo(e).message
      },
      complete() {
        console.log('Coins ');
      }
    })
    return message;
  }
}
