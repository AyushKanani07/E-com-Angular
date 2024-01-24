import { Component } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { MatSelectModule } from '@angular/material/select';
import { ProductService } from '../../services/seller-services/products/product.service';
import { product } from '../../services/seller-services/data-type';

@Component({
  selector: 'app-seller-add-product',
  standalone: true,
  imports: [SharedModule, MatSelectModule],
  templateUrl: './seller-add-product.component.html',
  styleUrl: './seller-add-product.component.css'
})
export class SellerAddProductComponent {

  curriencies: any[] = [
    {value: 'USD', viewValue: 'US Dollar'},
    {value: 'INR', viewValue: 'Indian Rupees'},
  ];
  addProductMessage:string|undefined;

  constructor(private product:ProductService){}


  submit(data:product){
    // console.log(data);
    this.product.addProduct(data).subscribe((result) => {
      // console.log(result);
      if(result){
        this.addProductMessage = "Product is added successfully"
      }
    });
    setTimeout(() => {
      this.addProductMessage=undefined;
    },2100)
  }


}
