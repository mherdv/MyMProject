import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Category } from '../../../sheard/models/category.model';
import { NgForm } from '@angular/forms';
import { MyMEvent } from '../../../sheard/models/event.model';
import { EventsService } from '../../../sheard/services/events.service';
import { BillService } from '../../../sheard/services/bill.service';
import { Bill } from '../../../sheard/models/bill.model';
import { mergeMap } from 'rxjs/operators';
import { Massage } from '../../../sheard/models/massage.model';
import { Subscription } from 'rxjs';
import * as Moment from 'moment'


@Component({
  selector: 'MyM-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  massage: Massage
  sub1 :Subscription; 	
  sub2 :Subscription;


  ngOnInit() {
    this.massage = new Massage('danger', '')
  }

  private showMassage(text: string) {
    this.massage.text = text;
    window.setTimeout(() => { this.massage.text = '' }, 5000)
  }
  

  @Input() categoryes: Category[] = [];
  constructor(
    private eventServices: EventsService,
    private billService: BillService
  ) { }

  types = [
    { type: 'income', label: 'coming' },
    { type: 'outcome', label: 'going' }
  ]
  onSubmit(form: NgForm) {
    const val = form.value;
    let { type, amount, category, discription } = form.value;
    if (amount < 0) amount *= -1;
    const NewEvent = new MyMEvent(
      type,
      +amount,
      +category,
      Moment(new Date()).format('DD.MM.YYYY'),
      discription
    )

    this.sub1 = this.billService.getBill()
      .subscribe((bill: Bill) => {
        let value = 0;
        if (type === 'outcome') {
          if (amount > bill.value) {
            this.showMassage(`there is ont inaf mony you nid mor den ${amount -bill.value} rubls`)
            return
          };

          value = bill.value - amount;

        }
        else {
          value = bill.value + amount;
        }

        this.sub2 = this.billService.updateBill({ value, currency: bill.currency })
          .pipe(mergeMap(() => this.eventServices.addEvent(NewEvent)))
          .subscribe(() => {
            form.setValue({
              amount: 1,
              discription: ' ',
              category: 1,
              type: 'outcome'
            })
          })
      })
  }

  ngOnDestroy(){
    if(this.sub1)this.sub1.unsubscribe()
    if(this.sub2)this.sub2.unsubscribe()
  }

}
