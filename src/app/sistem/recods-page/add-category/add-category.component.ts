import { Component, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { CategoryesService } from '../../../sheard/services/categorys.service';
import { Category } from '../../../sheard/models/category.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'MyM-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss']
})
export class AddCategoryComponent implements OnDestroy {

  sub1:Subscription;

  @Output() onCategoryAdd = new EventEmitter<Category>();

  constructor(
    private categoryesService: CategoryesService
  ) { }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;

    if (capacity < 0) capacity *= -1;

    const category = new Category(name, capacity)

    this.sub1 = this.categoryesService.addCategory(category)
      .subscribe((category) => {
        this.onCategoryAdd.emit(category)
        form.reset();
        form.form.patchValue({capacity:1})
      })
     
  }

  ngOnDestroy(){
    if(this.sub1)this.sub1.unsubscribe()
  }

}
