import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./routes/index/index.module').then(m => m.IndexModule) },
  { path: 'accounts/register', loadChildren: () => import('./routes/accounts/register/register.module').then(m => m.RegisterModule) },
  { path: 'accounts/login', loadChildren: () => import('./routes/accounts/login/login.module').then(m => m.LoginModule) },
  { path: '**', loadChildren: () => import('./routes/not-found/not-found.module').then(m => m.NotFoundModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
