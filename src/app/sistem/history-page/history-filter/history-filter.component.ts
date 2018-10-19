import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Category } from '../../../sheard/models/category.model';

@Component({
    selector: 'MyM-history-filter',
    templateUrl: './history-filter.component.html',
    styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

    @Output() public onFilterClansel = new EventEmitter<any>();
    @Output() public onFilterApplay = new EventEmitter<any>();
    @Input() categoryes: Category[];

    selectedPeriod = 'd';
    selectedTTypes = [];
    selectedCategoryes = [];

    constructor() { }
    timePeriods = [{
        type: 'd', label: 'day'
    },
    {
        type: 'w', label: 'wek'
    },
    {
        type: 'M', label: 'mounth'
    }

    ]

    types = [
        { type: 'income', label: 'coming' },
        { type: 'outcome', label: 'going' }
    ]

    private calculateInputParams(field: string, checked: boolean, value: string) {
        if (checked) {
            this[field].indexOf(value) === -1 ? this[field].push(value) : null;
        } else {
            this[field] = this[field].filter(i => i !== value)
        }
    }

    handleChangeType({ checked, value }) {
        this.calculateInputParams('selectedTTypes', checked, value)

    }

    handleChangeCategory({ checked, value }) {
        this.calculateInputParams('selectedCategoryes', checked, value)
    }



    applayFilter() {
        this.onFilterApplay.emit({
            types: this.selectedTTypes,
            category: this.selectedCategoryes,
            period: this.selectedPeriod
        })
        this.closeFilter(true)
    }


    closeFilter(bool = false) {
        this.onFilterClansel.emit(bool)
        this.selectedCategoryes = [];
        this.selectedPeriod = 'd';
        this.selectedTTypes = []
    }
    ngOnInit() {
    }

}
