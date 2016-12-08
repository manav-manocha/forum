import { Routes } from '@angular/router';
import { ErrorComponent } from './error/error.component';

/* "System.import('module_path')" in loadChildren will be replaced with es6-promise by web-pack loader 'string-replace-loader' defined 
 *  in webpack.common.js , which asynchronously loads the module.  
 */ 
export const ROUTES: Routes = [{
   path: '', redirectTo: 'login', pathMatch: 'full'
  }, {
    path: 'app',   loadChildren: () => System.import('./layout/layout.module')
  }, {
    path: 'login', loadChildren: () => System.import('./login/login.module')
  }, {
    path: 'error', component: ErrorComponent
  }
  
];
