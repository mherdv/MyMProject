import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { EventsService } from '../../../sheard/services/events.service';
import { CategoryesService } from '../../../sheard/services/categorys.service';
import { pipe } from '@angular/core/src/render3/pipe';
import { mergeMap } from 'rxjs/operators';
import { MyMEvent } from '../../../sheard/models/event.model';
import { Category } from '../../../sheard/models/category.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'MyM-history-datail',
  templateUrl: './history-datail.component.html',
  styleUrls: ['./history-datail.component.scss']
})
export class HistoryDatailComponent implements OnInit ,OnDestroy {

  events: MyMEvent;
  category: Category;

  isLoadet:boolean =  false;
  sub1:Subscription;


  constructor(private route: ActivatedRoute,
    private eventService: EventsService,
    private categoryService: CategoryesService
  ) { }

  ngOnInit() {
    this.sub1 = this.route.params
      .pipe(mergeMap(
        (params: Params) =>
          this.eventService.getEventById(params['id'])
      ), mergeMap((events: MyMEvent) => {
        this.events = events;
        return this.categoryService.getCategoryById(events.category)
      })
      )
      .subscribe((category: Category) => {
        this.category = category;
        this.isLoadet = true;
        console.log(1)
      })
  }

  
  ngOnDestroy(): void {
    if(this.sub1) this.sub1.unsubscribe()
    
  }

}
