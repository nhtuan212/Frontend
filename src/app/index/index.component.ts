import { Component, OnInit } from '@angular/core';
import { videoArray } from "../../environments/video";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppComponent } from '../app.component';
import { ProductService } from '../service/product/product.service';
import { Product } from '../../models/product.model';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
    videoArray = videoArray;
    showNavigationArrows = true;
    showNavigationIndicators = false;
    datas:Product[]=[];

    constructor(public AppComponent: AppComponent,private productService: ProductService) {}
    ngOnInit(): void {
        this.getAll();
    }
    getAll(){
        this.productService.getAll().subscribe((res:any)=>{
            this.datas = res
        })
    }

    customOptions: OwlOptions = {
        loop      : true,
        mouseDrag : false,
        touchDrag : false,
        pullDrag  : false,
        dots      : false,
        navSpeed  : 700,
        nav: true,
        navText   : ['<', '>'],
        responsive: {
            320 : {
                items : 1,
            },
            600 : {
                items : 2,
            },
            768 : {
                items : 3,
            },
        },
    }
}