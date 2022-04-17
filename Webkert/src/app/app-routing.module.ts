import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const routes: Routes = [
  {
    path: '',
    data: {title: 'System Builder'},
    loadChildren: () => import('./routes/index/index.module').then(m => m.IndexModule)
  },
  {
    path: 'products',
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
    loadChildren: () => import('./routes/accounts/login/login.module').then(m => m.LoginModule)
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
