import { Pipe, PipeTransform } from '@angular/core';
import { NgSelectMultipleOption } from '@angular/forms/src/directives';

@Pipe({ name: 'MyMFilter' })
export class FilterPipe implements PipeTransform {
    transform(items: any, value: string, field: string): any {


        if (items.length === 0 || !value) {
            return items
        }
        return items.filter((i) => {
            const t = Object.assign({}, i)

            if (field === 'category') {
                t[field] = t['catName']
            } else if (field === 'type') {
                t[field] = t[field] === 'income' ? 'coming' : 'going';
            }

            
            let fi = '' + t[`${field}`];
    
            fi = fi.toLowerCase();
            return fi.indexOf(value.toLowerCase()) !== -1;

        })
    }
}