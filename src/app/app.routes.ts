import { Routes } from '@angular/router';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { AppComponent } from './app.component';

export const appRoutes: Routes = [
  { path: '', component: AppComponent },
  { path: 'favorites', component: FavoritesComponent },
];
