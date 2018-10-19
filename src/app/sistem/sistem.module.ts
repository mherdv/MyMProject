import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SheardModule } from '../sheard/sheard.modules';
import { SistemRoutingModule } from './sistem-routing.module';
import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { PlanningPageComponent } from './planning-page/planning-page.component';
import { RecodsPageComponent } from './recods-page/recods-page.component';
import { SistemComponent } from './sistem.component';
import { SitebarComponent } from '../sheard/components/sitebar/sitebar.component';
import { HeaderComponent } from '../sheard/components/header/header.component';
import { DropdownDirective } from '../sheard/directives/drop-down.directive';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { BillService } from '../sheard/services/bill.service';
import { MomentPipe } from '../sheard/pipes/moment.pipe';
import { AddEventComponent } from './recods-page/add-event/add-event.component';
import { AddCategoryComponent } from './recods-page/add-category/add-category.component';
import { EdditCategoryComponent } from './recods-page/eddit-category/eddit-category.component';
import { CategoryesService } from '../sheard/services/categorys.service';
import { EventsService } from '../sheard/services/events.service';
import { HistoryChartComponent } from './history-page/history-chart/history-chart.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryDatailComponent } from './history-page/history-datail/history-datail.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';
import { FilterPipe } from '../sheard/pipes/filter.pipe';

@NgModule({
    declarations: [
        FilterPipe,
        SistemComponent,
        DropdownDirective,
        HeaderComponent,
        SitebarComponent,
        BillPageComponent,
        HistoryPageComponent,
        PlanningPageComponent,
        RecodsPageComponent,
        BillCardComponent,
        CurrencyCardComponent,
        MomentPipe,
        AddEventComponent,
        AddCategoryComponent,
        EdditCategoryComponent,
        HistoryChartComponent,
        HistoryEventsComponent,
        HistoryDatailComponent,
        HistoryFilterComponent
    ],
    imports: [
        CommonModule,
        SheardModule,
        SistemRoutingModule
    ],
    exports: [],
    providers: [BillService, CategoryesService, EventsService],
})
export class SistemModule { }