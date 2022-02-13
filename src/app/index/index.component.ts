import { Component, OnInit, ViewChild } from '@angular/core';
import { videoArray } from "../../environments/video";
import { OwlOptions } from 'ngx-owl-carousel-o';
import { AppComponent } from '../app.component';
import { ProductService } from '../service/product/product.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
    videoArray = videoArray;
    showNavigationArrows = true;
    showNavigationIndicators = false;
    displayedColumns: string[] = ['position', 'image', 'name'];
    data: any[] = [];
    dataSource = new MatTableDataSource<any>(this.data);
    pokemons = [];

    @ViewChild(MatPaginator, {static: true}) paginator!: MatPaginator;

    constructor(
        public AppComponent: AppComponent,
        private productService: ProductService,
        private modalService: NgbModal,
    ) {}
    ngOnInit(): void {
        this.getPokemons();
    }
    
    getPokemons(): any {
        let pokemonData;

        for (let i = 1; i <= 50; i++) {
            this.productService.getPokemons(i).subscribe(
                res => {
                    pokemonData = {
                        position: i,
                        image: res.sprites.front_default,
                        name: res.name,
                    }
                    this.data.push(pokemonData);
                    this.dataSource = new MatTableDataSource<any>(this.data);
                    this.dataSource.paginator = this.paginator;
                    // console.log(res);
                },
                err => {
                    console.log(err);
                }
            );            
        }
    }

    applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    
        if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
        }
    }

    getRow(row: string) {
        console.log(row);
    }

    closeResult = '';
    nameDetail ?: string;
    imageDetail ?: string;
    modalOpen(content: any, row: any) {
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result: any) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason: any) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        this.nameDetail = row.name;
        this.imageDetail = row.image;
    }
    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
            return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
            return 'by clicking on a backdrop';
        } else {
            return `with: ${reason}`;
        }
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
            0 : {
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