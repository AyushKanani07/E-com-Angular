import { Routes } from '@angular/router';
import { HomeComponent } from './modules/common/home/home.component';
import { SellerAuthComponent } from './modules/seller/seller-auth/seller-auth.component';
import { SellerHomeComponent } from './modules/seller/seller-home/seller-home.component';
import { authGuard } from './core/auths/guards/auth.guard';
import { SellerAddProductComponent } from './modules/seller/seller-add-product/seller-add-product.component';
import { SellerUpdateProductComponent } from './modules/seller/seller-update-product/seller-update-product.component';
import { SearchComponent } from './modules/common/search/search.component';
import { ProductDetailsComponent } from './modules/common/product-details/product-details.component';
import { UserAuthComponent } from './modules/users/user-auth/user-auth.component';
import { CartPageComponent } from './modules/users/cart-page/cart-page.component';
import { CheckoutComponent } from './modules/users/checkout/checkout.component';
import { MyOrdersComponent } from './modules/users/my-orders/my-orders.component';

export const routes: Routes = [
    { 
        path: '', 
        component: HomeComponent, 
        pathMatch: 'full' 
    },
    { 
        path: 'seller-auth', 
        component: SellerAuthComponent 
    },
    {
        path: '', 
        canActivate: [authGuard],
        children: [
            {path: 'seller-home', loadChildren: ()=> import('./modules/seller/seller-home/seller-home.routes')},
            {path: 'seller-add-product', loadChildren: ()=> import('./modules/seller/seller-add-product/seller-add-product.routes')},
            {path: 'seller-update-product/:id', loadChildren: ()=> import('./modules/seller/seller-update-product/seller-update-product.routes')},
        ]
    },
    {
        path: 'search/:query',
        component: SearchComponent
    },
    {
        path: 'details/:productId',
        component: ProductDetailsComponent
    },
    {
        path: 'user-auth',
        // canActivate: [authGuard],
        component: UserAuthComponent
    },
    {
        path: 'cart-page',
        component: CartPageComponent
    },
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'my-orders',
        component: MyOrdersComponent
    }
    
    // { 
    //     path: 'seller-home', 
    //     component: SellerHomeComponent ,
    //     canActivate:[authGuard]
    // },
    // {
    //     path: 'seller-add-product',
    //     component:SellerAddProductComponent,
    //     canActivate:[authGuard]
    // },
    // {
    //     path: 'seller-update-product',
    //     component:SellerUpdateProductComponent,
    //     canActivate:[authGuard]
    // }
];
