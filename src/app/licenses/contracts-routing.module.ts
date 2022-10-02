import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LicenseIndexComponent } from './license-index/license-index.component';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { ShowLicenseComponent } from './show-license/show-license.component';

const routes: Routes = [
  {path: '', component:LicenseIndexComponent},
  {path: 'view/:id', component: ShowLicenseComponent},
  {path: 'add', component: AddBranchComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractsRoutingModule { }
