import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { GamesComponent} from './games/games.component';
import { GameComponent } from './game/game.component';
import { NewGameComponent } from './new-game/new-game.component';
import { AboutComponent } from './about/about.component';
import { SlideComponent } from './slide/slide.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'new-game', component: NewGameComponent},
  { path: 'game/:id', component: GameComponent },
  { path: 'about', component: AboutComponent },
  { path: 'slide/:id', component: SlideComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
