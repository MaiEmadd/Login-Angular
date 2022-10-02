import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { IndexComponent } from './contracts/index/index.component';
import { HomeComponent } from './home/home.component';
import { LicenseIndexComponent } from './licenses/license-index/license-index.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'home', canActivate:[AuthGuard], component:HomeComponent},
  {path:'contracts', canActivate:[AuthGuard], component:IndexComponent},
  {path:'usermanagement', canActivate:[AuthGuard], component:UsermanagementComponent},
  {path:'login' , component:LoginComponent},
  {
    path: 'licenses',canActivate:[AuthGuard],
    loadChildren: () => import('./licenses/licenses.module').then(m => m.LicensesModule)
  },
  
  // {path:'**' ,canActivate:[AuthGuard], component:NotfoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
