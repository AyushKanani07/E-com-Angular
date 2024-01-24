import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../services/seller-services/products/product.service';
import { product } from '../../services/seller-services/data-type';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  searchResult:undefined|product[];

  constructor(private activeRoute:ActivatedRoute, private product:ProductService) {}

  ngOnInit(): void {
    let query=this.activeRoute.snapshot.paramMap.get('query');
    console.log(query);
    query && this.product.serchProducts(query).subscribe((result) => {
      this.searchResult = result;
    })
  }



}
