import { Component, OnInit, Input } from '@angular/core';
import { Bill } from '../../../sheard/models/bill.model';

@Component({
  selector: 'MyM-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill: Bill;
  @Input() currency: any;
  dollar: number;
  euro: number;
  constructor() { }

  ngOnInit() {
    this.dollar = +(this.bill.value / this.currency['Valute']['EUR']['Value']).toFixed(0);
    this.euro = +(this.bill.value / this.currency['Valute']['USD']['Value']).toFixed(0);
  }

}
