import { Component, OnInit } from '@angular/core';
import { order } from '../../services/seller-services/data-type';
import { ProductService } from '../../services/seller-services/products/product.service';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-my-orders',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './my-orders.component.html',
  styleUrl: './my-orders.component.css'
})
export class MyOrdersComponent implements OnInit {

  orderData:order[]|undefined
  constructor(private product:ProductService) { }

  ngOnInit(): void {
    this.getOrderList()
  }
  cancelOrder(orderId:string|undefined){
    orderId && this.product.cancelOrder(orderId).subscribe((result)=>{
      if(result){
        this.getOrderList();
      }
    })
  }
  getOrderList(){
    this.product.orderList().subscribe((result)=>{
      this.orderData=result;
    })
  }

}
