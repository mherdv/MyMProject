import { BaseApi } from "../core/base-api";

import { Http } from "@angular/http";
import { Injectable } from "@angular/core";
import { MyMEvent } from "../models/event.model";
import { Observable } from "rxjs";


@Injectable()
export class EventsService extends BaseApi{

    constructor(public http:Http){
        super(http);
    }
    addEvent(event:MyMEvent):Observable<MyMEvent>{
        return this.post('events',event)
    }
    getEvents():Observable<MyMEvent[]>{
        return this.get('events')
    }

    getEventById(id:string):Observable<MyMEvent[]>{
        return this.get('events/'+id+'')
    }
}