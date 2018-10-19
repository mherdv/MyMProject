import { Component, OnInit ,Input} from '@angular/core';
import { Bill } from '../../../sheard/models/bill.model';

@Component({
  selector: 'MyM-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {
  
  dollar: number;
  euro: number;
  date: Date;
  @Input() currency: any;
  constructor() { }

  ngOnInit() { 
    this.date = new Date();
    this.dollar = +(this.currency['Valute']['EUR']['Value']).toFixed(0);
    this.euro = +(this.currency['Valute']['USD']['Value']).toFixed(0);
  }

}
