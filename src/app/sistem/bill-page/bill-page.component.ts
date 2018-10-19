import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../../sheard/services/bill.service';
import { combineLatest, Subscription } from 'rxjs';

import { Observable } from 'rxjs';
import { Bill } from '../../sheard/models/bill.model';

@Component({
  selector: 'MyM-bill-page',
  templateUrl: './bill-page.component.html',
  styleUrls: ['./bill-page.component.scss']
})
export class BillPageComponent implements OnInit, OnDestroy {
  corrancy: any;
  sub1: Subscription;
  sub2: Subscription;
  bill: Bill;
  constructor(
    private billService: BillService
  ) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.billService.getCurrency()
    ).subscribe((data: [Bill, any]) => {
      console.log(data)
      this.bill = data[0];
      this.corrancy = data[1];

      console.log(this.bill, this.corrancy)
    })
  }

  onRefresh() {
    this.sub2 = this.billService.getCurrency()
      .subscribe((corrancy: any) => {
        this.corrancy = corrancy
      })
  }
  ngOnDestroy(): void {
    if (this.sub2 != undefined) {
      this.sub2.unsubscribe()
    }
    
    this.sub1.unsubscribe()

  }
}
