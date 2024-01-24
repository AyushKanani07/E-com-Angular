import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/seller-services/products/product.service';
import { product } from '../../services/seller-services/data-type';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-seller-home',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './seller-home.component.html',
  styleUrl: './seller-home.component.css'
})
export class SellerHomeComponent implements OnInit {

  productList:undefined | product[];
  productDeleteMessage:undefined | string;

  constructor(private router:Router, private product:ProductService){ }

  ngOnInit(): void {
    this.list()
  }

  deleteProduct(id:string){
    // console.log(id);
    let deleteConfirm:any = prompt('Enter "CONFORM" as shown');
    
    if(deleteConfirm === "CONFORM"){
      this.product.deleteProduct(id).subscribe((result) => {
        // console.log(result);
        if(result){
          this.productDeleteMessage = "Product is Deleted";
          this.list();
        }
      });
      setTimeout(() => {
        this.productDeleteMessage = undefined;
      },2100);
    }
    else{
      this.productDeleteMessage = "Delete process failed"
      setTimeout(() => {
        this.productDeleteMessage = undefined;
      },2100);
    }
    
    
  }

  list(){
    this.product.productList().subscribe((result) => {
      console.log(result);
      if(result){
        this.productList=result;
      }
    })
  }

  
}
