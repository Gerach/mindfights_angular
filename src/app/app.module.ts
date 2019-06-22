import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { GamesComponent } from './games/games.component';
import { GameComponent } from './game/game.component';
import { NgxElectronModule } from 'ngx-electron';
import { NewGameComponent } from './new-game/new-game.component';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';

import { MatInputModule } from '@angular/material';
import { MatSelectModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatCheckboxModule } from '@angular/material';
import { MatChipsModule } from '@angular/material';
import { MatNativeDateModule } from '@angular/material';
import { MatDatepickerModule } from '@angular/material';
import { MatTableModule } from '@angular/material';
import { MatPaginatorModule } from '@angular/material';
import { AboutComponent } from './about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    GamesComponent,
    GameComponent,
    NewGameComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgxElectronModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatChipsModule,
    MatNativeDateModule,
    MatTableModule,
    MatPaginatorModule,
    MatDatepickerModule
  ],
  providers: [
    MatDatepickerModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
