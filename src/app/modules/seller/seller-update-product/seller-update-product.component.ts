import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/seller-services/products/product.service';
import { product } from '../../services/seller-services/data-type';

@Component({
  selector: 'app-seller-update-product',
  standalone: true,
  imports: [SharedModule, MatSelectModule],
  templateUrl: './seller-update-product.component.html',
  styleUrl: './seller-update-product.component.css'
})
export class SellerUpdateProductComponent implements OnInit {

  productData:undefined | product;
  updateMessage: undefined| string;

  curriencies: any[] = [
    {value: 'USD', viewValue: 'US Dollar'},
    {value: 'INR', viewValue: 'Indian Rupees'},
  ];

  constructor(private route:ActivatedRoute, private product:ProductService, private router:Router) {}

  ngOnInit(): void {
    let productId = this.route.snapshot.paramMap.get('id');
    // console.log(productId);
    productId && this.product.getProduct(productId).subscribe((result) => {
      // console.log(result);
      this.productData = result;
    })
  }

  submit(data:any){
    console.log(data);
    if(this.productData){
      data.id = this.productData.id;
    }
    this.product.updateProduct(data).subscribe((result) => {
      if(result){
        this.updateMessage = "Product has been updated"
      }
    })
    setTimeout(() => {
      this.updateMessage=undefined;
    },1200);
    setTimeout(() => {
      this.router.navigate(['seller-home']);
    },1200)
  }

}
