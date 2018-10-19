import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { Bill } from '../models/bill.model';
import { map } from 'rxjs/operators';
import { pipe } from '@angular/core/src/render3/pipe';
import { BaseApi } from '../core/base-api';
@Injectable()
export class BillService extends BaseApi {

    constructor(
    
        public http: Http
    ) {
        super(http);
    }

    getBill(): Observable<Bill> {
        return this.get('bill')
    }
    getCurrency() :Observable<any> {
        return this.http.get("https://www.cbr-xml-daily.ru/daily_json.js")
            .pipe(map((response: Response) =>
                response.json()
            ))
    }

    updateBill(bill:Bill):Observable<Bill>{
        return this.put('bill',bill)
    }
}