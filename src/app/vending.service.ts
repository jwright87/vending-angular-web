import {Injectable} from '@angular/core';
import {Coin} from "./coins/model/CoinDataModel";
import {Drink} from "./drinks/model/DrinksModelData";

@Injectable({
  providedIn: 'root'
})
export class VendingService {

  messages: string[] = []

  refundedCoins:Coin[] = []

  purchasedDrinks:Drink[] = []


  balance:number=0

  /**
   * Converts Coin/Drink name into a json String for sending to the front end.
   * @param name
   */
  convertToJson(name: string): string {
    name = name.split(": ")[1]
    return `{"name":"${name}"}`
  }

  setBalance(amount:number) {
    this.balance=amount
  }

  addPurchasedDrink(drink:Drink) {
    this.purchasedDrinks.push(drink)
  }

  addRefundedCoins(coins:Coin[]) {
    coins.forEach(coin => {
      this.refundedCoins.push(coin)
    })

  }
  addMessage(message: string) {
    this.messages.push(message);
  }

  getMessages(): string[] {
    return this.messages.reverse()
  }

  lastMessage():string {
    return this.messages[0]
  }

  log() {
    console.log("Vending Machine Service Status:")
    console.log("Messages:")
    this.getMessages().forEach((msg) => console.log(msg))
    console.log("Refunded Coins:")
    this.refundedCoins.forEach((coin) => console.log(coin.name))
    console.log("Purchased Drinks:")
    this.purchasedDrinks.forEach((drink) => console.log(drink.name))
  }

  constructor() {
  }
}
