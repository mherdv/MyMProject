import { Component, OnInit } from '@angular/core';
import { Category } from '../../sheard/models/category.model';
import { CategoryesService } from '../../sheard/services/categorys.service';

@Component({
  selector: 'MyM-recods-page',
  templateUrl: './recods-page.component.html',
  styleUrls: ['./recods-page.component.scss']
})
export class RecodsPageComponent implements OnInit {

  categoryes:Category[] = [];
  isLoaded = false;
  constructor(
    private categoryService: CategoryesService
  ) { }

  ngOnInit() {
    this.categoryService.getCategoryes()
        .subscribe((categoryes:Category[])=>{
            this.categoryes = categoryes
            this.isLoaded = true
        })
  }

  categoryWasEdited(e:Category){
    const ind = this.categoryes.findIndex(c=>c.id===e.id)
    this.categoryes.push(e);
    this.categoryes[ind] = e;
    console.log(e);
  }
  newCategoryAdded(e:Category){
    //
    this.categoryes.push(e);
    console.log(e);
  }
}
