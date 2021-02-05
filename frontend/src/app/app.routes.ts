import {Routes} from '@angular/router';
import {CreateContractComponent} from './create-contract/create-contract.component';
import {HomeComponent} from './home/home.component';
import {AppComponent} from './app.component';

export const routes: Routes = [
  {
    path: 'contracts/create',
    component: CreateContractComponent
  }
];
