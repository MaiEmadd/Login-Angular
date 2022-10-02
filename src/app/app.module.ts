import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {MatTableModule} from '@angular/material/table';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IndexComponent } from './contracts/index/index.component';
import { NavbarComponent } from './navbar/navbar.component';
import {MatInputModule } from '@angular/material/input';
import { MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule } from '@angular/material/select';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { UsermanagementComponent } from './usermanagement/usermanagement.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { UserdatadialogComponent } from './userdatadialog/userdatadialog.component';
import { ReassignPassComponent } from './reassign-pass/reassign-pass.component';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    IndexComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    NotfoundComponent,
    UsermanagementComponent,
    UserdatadialogComponent,
    ReassignPassComponent,
  ],
  imports: [  
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCheckboxModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatCardModule,
    FormsModule,
    MatStepperModule,
    MatDatepickerModule,
    ToastrModule.forRoot()
  ],
  entryComponents: [UserdatadialogComponent],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule { }
