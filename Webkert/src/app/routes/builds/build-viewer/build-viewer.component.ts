import {Component, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Build} from '../../../shared/model/Build';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {SaveBuildDialogData} from '../../index/build-table/build-table.component';
import {BuildService} from '../../../shared/services/build.service';
import {NgxIndexedDBService} from 'ngx-indexed-db';
import {BuildTableItem} from '../../index/build-table/build-table-datasource';

@Component({
  selector: 'app-build-viewer',
  templateUrl: './build-viewer.component.html',
  styleUrls: ['./build-viewer.component.scss']
})
export class BuildViewerComponent implements OnInit, OnChanges {

  loading = false;

  @Input()
  build: Build | undefined;

  totalWattage = 0;
  totalPrice = 0;

  constructor(
    private router: Router,
    private deleteDialog: MatDialog,
    private buildService: BuildService,
    private dbService: NgxIndexedDBService) {
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['build'].isFirstChange()) {
      return;
    }

    const build = changes['build'].currentValue.products as object;

    this.totalWattage = Object
      .values(build)
      .reduce((a, b) => a + b.wattage as number, 0);

    this.totalPrice = Object
      .values(build)
      .reduce((a, b) => a + b.price as number, 0);
  }

  edit() {
    this.dbService.clear('components').subscribe(value => {
      if (!value) {
        return;
      }

      this.loading = true;
      this.dbService.bulkAdd('components', this.build?.products as Array<BuildTableItem>)
        .subscribe({
          complete: () => {
            this.loading = false;
            window.location.href = '/';
            // this.router.navigateByUrl('/').catch(console.error);
          }
        });
    }, () => console.error);
  }

  delete() {
    this.openDialog().afterClosed().subscribe(remove => {
      if (!remove) {
        return;
      }

      this.loading = true;
      this.buildService.deleteBuild(this.build?.id as string).finally(() => {
        this.build = undefined;
        this.loading = false;
      });
    });
  }

  private openDialog(): MatDialogRef<DeleteBuildDialog> {
    return this.deleteDialog.open(DeleteBuildDialog, {
      width: '250px',
      data: {name: this.build?.name},
    });
  }
}

export interface BuildDialogData {
  name: string;
}

@Component({
  selector: 'delete-build-dialog',
  templateUrl: 'delete-build-dialog.html'
})
export class DeleteBuildDialog {
  constructor(
    public dialogRef: MatDialogRef<DeleteBuildDialog>,
    @Inject(MAT_DIALOG_DATA) public data: BuildDialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

