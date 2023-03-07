import {Component, OnInit} from '@angular/core';
import {VendingService} from "../vending.service";
import {interval} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  }


  constructor(private vendingService: VendingService,
              private http: HttpClient) {
  }

  ngOnInit(): void {
    this.vendingService.addMessage("No status messages yet..")
    interval(250)
      .subscribe(() => {
        this.updateStatus()
      });
  }

  statusMessage: String = ""

  drinksList: String[] = []

  balance: number = this.vendingService.balance

  updateStatus() {
    this.statusMessage = this.vendingService.lastMessage()
    this.balance = this.vendingService.balance
    this.drinksList = this.vendingService.purchasedDrinks.map((m) => m.name)
  }


  reset() {
    console.log("Resetting Vending Machine")
    this.http.post("http://localhost:8080/admin/reset", this.httpOptions).toPromise()
      .then(response => {
        const str = JSON.stringify(response)
        console.log(str)
      })
  }
}
