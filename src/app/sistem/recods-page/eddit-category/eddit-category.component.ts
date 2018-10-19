import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Category } from '../../../sheard/models/category.model';
import { CategoryesService } from '../../../sheard/services/categorys.service';
import { Massage } from '../../../sheard/models/massage.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'MyM-eddit-category',
  templateUrl: './eddit-category.component.html',
  styleUrls: ['./eddit-category.component.scss']
})
export class EdditCategoryComponent implements OnInit, OnDestroy {
  @Input() categoryes: Category[] = [];
  @Output() onCategoryEdit = new EventEmitter<Category>();
  category: Category;
  message: Massage;

  sub1:Subscription;
  currentCategoryId = 1;
  currentCategory: Category;

  constructor(
    private categoryService: CategoryesService
  ) {}

  ngOnInit() {
    this.onCaegoryChange()
    this.message = new Massage('success', '')
  }

  onSubmit(form: NgForm) {
    let { name, capacity } = form.value;
    if (capacity < 0) capacity *= -1;
    this.category = new Category(name, capacity, this.currentCategoryId);

    this.sub1 = this.categoryService.updateCategory(this.category)
      .subscribe((category: Category) => {

        this.onCategoryEdit.emit(category)
        this.message.text = 'the category succesful reducted ';

        window.setTimeout(() => {
          this.message.text = '';
        }, 5000)

      })
      
  }

  onCaegoryChange() {
    this.currentCategory = this.categoryes
      .find(c => c.id === +this.currentCategoryId)
  }

  ngOnDestroy(): void {
   if(this.sub1) this.sub1.unsubscribe();
    
  }
}
