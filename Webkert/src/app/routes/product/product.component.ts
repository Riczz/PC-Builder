import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {ProductType} from "../../shared/model/Product";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  filterType : string = '';

  constructor(private route : ActivatedRoute, private afs : AngularFirestore) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.filterType = value['component'];
    });
  }

  // getComponents(component: ProductType): void {
  //   this.filterType.emit(component);
  // }

}
