import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './core';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./pages/main/main.module').then((m) => m.MainModule),
    canActivate: [AuthGuardService],
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./pages/auth/auth.module').then((m) => m.AuthModule),
  },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
