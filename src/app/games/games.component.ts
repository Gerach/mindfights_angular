import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

const {
  SELECT_ALL_QUERY,
  SELECT_ALL_RESPONSE
} = require('../../../constants.js');

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  displayedColumns: string[] = ['name', 'location', 'date'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private electronService: ElectronService,
    private ref: ChangeDetectorRef
  ) {
    this.getGames();
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }

  getGames(): void {
    this.electronService.ipcRenderer.send(SELECT_ALL_QUERY, {});
    this.electronService.ipcRenderer.once(SELECT_ALL_RESPONSE, (event, data) => {
      for (const game of data) {
        game.date = new Date(game.date);
      }
      this.dataSource = new MatTableDataSource<PeriodicElement>(data);
      this.ref.detectChanges();
    });
  }
}
export interface PeriodicElement {
  name: string;
  location: number;
  date: Date;
}
