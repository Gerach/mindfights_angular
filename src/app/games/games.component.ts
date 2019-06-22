import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ElectronService } from 'ngx-electron';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

const {
  SELECT_ALL_QUERY,
  SELECT_ALL_RESPONSE,
  DELETE_QUERY,
  DELETE_QUERY_RESPONSE
} = require('../../../constants.js');

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
  displayedColumns = ['name', 'location', 'date', 'actions'];
  dataSource = new MatTableDataSource<PeriodicElement>([]);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private electronService: ElectronService,
    private router: Router,
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

  deleteGame(game): void {
    this.electronService.ipcRenderer.send(DELETE_QUERY, game);
    this.electronService.ipcRenderer.once(DELETE_QUERY_RESPONSE, (event, data) => {
      if (data === 1) {
        this.getGames();
      }
    });
  }

  editGame(game): void {
    this.router.navigate(['/game/', game._id]);
  }
}
export interface PeriodicElement {
  name: string;
  location: string;
  date: Date;
}
