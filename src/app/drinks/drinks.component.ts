import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Drink} from "./model/DrinksModelData";
import {VendingService} from "../vending.service";

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }

  selectedDrinkValue: string = "";
  availableDrinks: Drink[] = []
  selectDrinkForPurchaseControl = new FormControl('', [Validators.required])
  drinkForm = new FormGroup({
    selectedDrink: this.selectDrinkForPurchaseControl
  });

  purchasedDrink = null;

  constructor(private http: HttpClient, private vendingService: VendingService) {

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
    const json = this.vendingService.convertToJson(this.selectedDrinkValue)
    console.log(`Json for purchaseDrink(): ${json}`)

      this.http.post("http://localhost:8080/purchase", json, this.httpOptions).toPromise()
        .then(purchaseResponse => {
          try {
          const str = JSON.stringify(purchaseResponse)
          console.log(str)
          const purchaseData = JSON.parse(str)
          console.log(purchaseData)
          this.purchasedDrink = purchaseData.drink
          // @ts-ignore
          const msg = `${this.purchasedDrink.name} Purchased.`
          console.log(msg);
          this.vendingService.addMessage(msg)
          // @ts-ignore
          this.vendingService.addPurchasedDrink(this.purchasedDrink)
          }catch (e) {
            console.log("Purchase Drink Failed..")
            console.log(e)
          }
        })


  }

  selectDrink($event: Event) {
    console.log($event)
    console.log($event.target)
    const target = $event.target as HTMLOptionElement
    console.log(target)
    this.selectedDrinkValue = target.value
    console.log(`Drink Selected: ${this.selectedDrinkValue}`)
    const json = this.vendingService.convertToJson(this.selectedDrinkValue)
    console.log(`Json:Selected Drink Value on purchaseDrink(): ${json}`)
  }
}
