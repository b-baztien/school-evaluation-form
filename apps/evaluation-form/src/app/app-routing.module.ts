import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/main',
    pathMatch: 'full',
  },
  {
    path: 'main',
    loadChildren: () =>
      import('../modules/main/main.module').then((m) => m.MainModule),
  },
  {
    path: 'form',
    loadChildren: () =>
      import('../modules/form/form.module').then((m) => m.FormModule),
  },
  {
    path: 'result',
    loadChildren: () =>
      import('../modules/result/result.module').then((m) => m.ResultModule),
  },
  {
    path: '**',
    redirectTo: '/',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
