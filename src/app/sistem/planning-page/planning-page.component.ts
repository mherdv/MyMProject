import { Component, OnInit, OnDestroy } from '@angular/core';
import { BillService } from '../../sheard/services/bill.service';
import { CategoryesService } from '../../sheard/services/categorys.service';
import { EventsService } from '../../sheard/services/events.service';
import { Category } from '../../sheard/models/category.model';
import { MyMEvent } from '../../sheard/models/event.model';
import { Bill } from '../../sheard/models/bill.model';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Subscription } from 'rxjs';

@Component({
  selector: 'MyM-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.scss']
})
export class PlanningPageComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  isLoadet = true;
  bill: Bill;
  categoryes: Category[] = [];
  MyMEvents: MyMEvent[] = [];

  constructor(
    private billService: BillService,
    private categoryesService: CategoryesService,
    private eventsService: EventsService
  ) { }

  ngOnInit() {
    this.sub1 = combineLatest(
      this.billService.getBill(),
      this.categoryesService.getCategoryes(),
      this.eventsService.getEvents()
    ).subscribe(
      (data: [Bill, Category[], MyMEvent[]]): void => {
        this.bill = data[0],
          this.categoryes = data[1],
          this.MyMEvents = data[2]
        this.isLoadet = false;
        console.log(data)
      })
  }

  getCategoryCost(cat: Category): number {

    const CatEvents = this.MyMEvents.filter(e => e.category === cat.id && e.type === 'outcome')
    return CatEvents.reduce((total, e) => {
      total += e.amount
      return total
    }, 0)
  }

  getProcent(cat: Category): number {
    const percent = (this.getCategoryCost(cat) * 100) / cat.capacity
    return percent > 100 ? 100 : percent
  }

  getCatPercent(cat: Category): string {
    return this.getProcent(cat) + '%'
  }

  getCatColorClass(cat: Category): string {
    const percent = this.getProcent(cat);
    return percent < 60 ? 'success' :
     percent < 100 ? 'worning' :
      percent == 100 ? 'danger': '';
  }

  ngOnDestroy() {
    if (this.sub1) this.sub1.unsubscribe();
  }

}
