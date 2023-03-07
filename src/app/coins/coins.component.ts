import {Component, Injectable, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Coin} from "./model/CoinDataModel";
import {VendingService} from "../vending.service";
import {verifyHostBindings} from "@angular/compiler";


function convertToPojo(value: Object) {
  const str = JSON.stringify(value)
  const pojo = JSON.parse(str)
  return pojo
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
  message: string = "";

  selectedCoinValue: string = ""
  acceptedCoins: Coin[] = []
  selectedCoinControl = new FormControl('', [Validators.required])
  form = new FormGroup({
    selectedCoin: this.selectedCoinControl
  });


  constructor(private http: HttpClient,private vendingService:VendingService) {

  }

  ngOnInit(): void {
    this.getCoinList()
    this.updateBalance()
  }

  convertToView(coin:Coin):string {
    if (coin.valueInPence<100) {
      return `${coin.valueInPence}p`
    }else {
      return "£1"
    }
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
      console.log("Balance is: " + balance.balance)
      this.vendingService.setBalance(balance.balance)
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
    const json = this.vendingService.convertToJson(this.selectedCoinValue)
    console.log(`Json for insertCoin(): ${json}`)
    this.http.post("http://localhost:8080/coins/insert", json, this.httpOptions)
      .toPromise().then((response) => {
        this.updateBalance()
      let str = JSON.stringify(response)
      let pojo =JSON.parse(str)
      this.vendingService.addMessage(pojo.message)
      this.vendingService.log()
    })

  }

  refundCoins() {
    let pojo = null;
    const putObservable = this.http.put("http://localhost:8080/coins/refund", this.httpOptions)
      putObservable.subscribe({
      next(value) {
        console.log("Refunding Coins! - First Subscriber..")
      },
      error(e) {
        console.log(e)
        pojo = convertToPojo(e)
        console.log("Pojo:")
        console.log(pojo)
      },
      complete() {
        console.log('refundCoins Complete ');
      }
    })
    putObservable.subscribe(data => {
      console.log("Data Settting Subscriber...")
      pojo = convertToPojo(data)
      console.log(pojo.refundedCoins)
      console.log(pojo.message)
      this.updateBalance();
      // @ts-ignore
      this.vendingService.addMessage(pojo.message)
      // @ts-ignore
      this.vendingService.addRefundedCoins(pojo.refundedCoins)
      this.vendingService.log()
    })

  }


}
