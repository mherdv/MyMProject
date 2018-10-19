import { Component, OnInit, OnDestroy } from '@angular/core';
import { Category } from '../../sheard/models/category.model';
import { CategoryesService } from '../../sheard/services/categorys.service';
import { EventsService } from '../../sheard/services/events.service';
import { combineLatest, Subscription } from 'rxjs';
import { MyMEvent } from '../../sheard/models/event.model';

import * as moment from "moment";


@Component({
  selector: 'MyM-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  chartDat = []
  isLoadet = false;
  sub1: Subscription;
  isFilterVisible = false;

  categoryes: Category[];
  events: MyMEvent[];
  filtredEvent: MyMEvent[] = [];

  constructor(
    private categoryesService: CategoryesService,
    private eventsService: EventsService
  ) { }


  private setOriginlEvents() {
    this.filtredEvent = this.events.slice();
  }
  calculateChartData(): void {
    this.chartDat = [];
    this.categoryes.forEach((c) => {
      const catEvents = this.filtredEvent.filter((e) => e.category === c.id && e.type === 'outcome')

      this.chartDat.push(
        {
          name: c.name,
          value: catEvents.reduce((total, e) => {
            total += e.amount
            return total
          }, 0)
        }
      )
    })

  }
  ngOnInit() {
    this.sub1 = combineLatest(
      this.categoryesService.getCategoryes(),
      this.eventsService.getEvents())
      .subscribe((data: [Category[], MyMEvent[]]) => {
        this.categoryes = data[0];
        this.events = data[1]
        this.isLoadet = true
        this.setOriginlEvents()
        this.calculateChartData()
      })
  }


  private tooggalFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir
  }

  openFilter() {
    this.tooggalFilterVisibility(true)
  }


  onFilterClansel(event) {
    this.tooggalFilterVisibility(false)
    !event?this.setOriginlEvents():null;
    this.calculateChartData()
  }


  onFilterApplay(filterData) {
    this.setOriginlEvents()
    this.tooggalFilterVisibility(false)

    const startPeriod = moment().startOf(filterData.period).startOf('d')
    const endPeriod = moment().endOf(filterData.period).endOf('d')

    this.filtredEvent = this.filtredEvent
      .filter((e) => {
        return filterData.types.indexOf(e.type) !== -1;
      })
      .filter((e) => {
        console.log(e)
        return filterData.category.indexOf(e.category.toString()) !== -1;
      })
      .filter((e) => {
        console.log(e)
        const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss')
        return momentDate.isBetween(startPeriod, endPeriod)
      })
      console.log(this.filtredEvent)
     this.calculateChartData()

  }


  ngOnDestroy(): void {
    if (this.sub1) this.sub1.unsubscribe();

  }

}
