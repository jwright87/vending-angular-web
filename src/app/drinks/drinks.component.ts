import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-drinks',
  templateUrl: './drinks.component.html',
  styleUrls: ['./drinks.component.css']
})
export class DrinksComponent implements OnInit {
  selectedDrink: any;
  form: any;

  constructor() { }

  ngOnInit(): void {
  }

  purchaseDrink() {
    
  }

  selectDrink($event: Event) {
    
  }
}
