import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AuthGuard} from './shared/services/auth.guard';
import {GuestGuard} from './shared/services/guest.guard';

const routes: Routes = [
  {
    path: '',
    data: {title: 'System Builder'},
    loadChildren: () => import('./routes/index/index.module').then(m => m.IndexModule)
  },
  {
    path: 'products/:component',
    data: {title: 'Products Listing'},
    loadChildren: () => import('./routes/product/product.module').then(m => m.ProductModule)
  },
  {
    path: 'accounts/register',
    data: {title: 'Registration'},
    loadChildren: () => import('./routes/accounts/register/register.module').then(m => m.RegisterModule),
  },
  {
    path: 'accounts/login',
    data: {title: 'Login'},
    loadChildren: () => import('./routes/accounts/login/login.module').then(m => m.LoginModule),
    canActivate: [GuestGuard]
  },
  {
    path: 'builds',
    data: {title: 'My builds'},
    loadChildren: () => import('./routes/builds/builds.module').then(m => m.BuildsModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: '/',
    pathMatch: 'full'
  },
  {
    path: '**',
    data: {title: '404 - Page Not Found'},
    loadChildren: () => import('./routes/not-found/not-found.module').then(m => m.NotFoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
