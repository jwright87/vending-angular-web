import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Coin} from "../coins/model/CoinDataModel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Drink} from "./model/DrinksModelData";
import {cleanPackageJson} from "@angular/compiler-cli/ngcc/src/packages/build_marker";
import {map} from "rxjs";

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  selectedDrinkValue: string="";
  form: any;

  availableDrinks: Drink[] = []
  selectDrinkForPurchaseControl = new FormControl('', [Validators.required])
  drinkForm = new FormGroup({
    selectedDrink: this.selectDrinkForPurchaseControl
  });

  purchasedDrink = null;

  constructor(private http: HttpClient) {

  }


  ngOnInit(): void {
    this.getDrinksInStock();
  }

  getDrinksInStock() {
    this.http.get("http://localhost:8080/drinks/choices", this.httpOptions).toPromise()
      .then(choicesResponse => {
        const str = JSON.stringify(choicesResponse)
        console.log(str)
        const drinkStockData = JSON.parse(str)
        console.log("Drinks In Stock:")
        console.log(drinkStockData.drinksInStock.length)
        this.availableDrinks = drinkStockData.drinksInStock
        console.log(drinkStockData)
        console.log(drinkStockData.drinksInStock)
      })
  }

  purchaseDrink() {
    console.log(`Selected Drink Value on purchaseDrink(): ${this.selectedDrinkValue}`)
    const json = drinkNameToJson(this.selectedDrinkValue)
    console.log(`Json for purchaseDrink(): ${json}`)
    this.http.post("http://localhost:8080/drinks/purchase", json, this.httpOptions).toPromise()
      .then(purchaseResponse => {
        const str = JSON.stringify(purchaseResponse)
        console.log(str)
        const purchaseData = JSON.parse(str)
        console.log(purchaseData)
        this.purchasedDrink = purchaseData.drink
        console.log(`${this.purchasedDrink} Purchased!`);
      })

  }

  selectDrink($event: Event) {
    console.log($event)
    console.log($event.target)
    const target = $event.target as HTMLOptionElement
    console.log(target)
    this.selectedDrinkValue = target.value
    console.log(`Drink Selected: ${this.selectedDrinkValue}`)
    const json = drinkNameToJson(this.selectedDrinkValue)
    console.log(`Json:Selected Drink Value on purchaseDrink(): ${json}`)
  }
}

function drinkNameToJson(drinkName: string): string {
  drinkName = drinkName.split(": ")[1]
  return `{"name":"${drinkName}"}`
}
