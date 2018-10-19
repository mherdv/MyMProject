import { Component, OnInit, Input } from '@angular/core';
import { MyMEvent } from '../../../sheard/models/event.model';
import { Category } from '../../../sheard/models/category.model';

@Component({
  selector: 'MyM-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {
  @Input() events: MyMEvent[];
  @Input() categoryes: Category[];

  searchValue = ''
  searchPlaceholder = 'summ'
  searchFild = 'amount'

  constructor() { }
  getEventClass(e: MyMEvent) {
    return {
      'label': true,
      "label-danger": e.type === 'outcome',
      " label-success": e.type === 'income'
    }
  }
  ngOnInit() {
    this.events.forEach(e => {
      e.catName = this.categoryes.find(c => c.id === e.category).name;
    })
  }
  changeCriteria(fild: string) {
    this.searchPlaceholder = fild
    this.searchFild = fild

  }

}
