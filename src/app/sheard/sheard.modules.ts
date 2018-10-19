import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {NgxChartsModule} from '@swimlane/ngx-charts';
@NgModule({
    declarations: [
        
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        RouterModule,
        NgxChartsModule
    ],
    exports: [
        ReactiveFormsModule,
        FormsModule,
        NgxChartsModule
    ],
    providers: [],
})
export class SheardModule { }