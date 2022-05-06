import {Component,OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  filterType  = '';

  constructor(private route : ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(value => {
      this.filterType = value['component'];
    });
  }
}
