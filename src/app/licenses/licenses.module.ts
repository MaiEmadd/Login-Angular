import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsRoutingModule } from './contracts-routing.module';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { LicenseIndexComponent } from './license-index/license-index.component';
import {MatTableModule} from '@angular/material/table';
import {MatStepperModule, MatStepperPrevious} from '@angular/material/stepper';
import { ReactiveFormsModule } from '@angular/forms';
import {MatInputModule } from '@angular/material/input';
import {MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import {MatSortModule} from '@angular/material/sort';
import {MatIconModule} from '@angular/material/icon';
import { DatePipe } from '@angular/common';
import { ShowLicenseComponent } from './show-license/show-license.component';
import { UploadComponent } from './upload/upload.component';


@NgModule({
  declarations: [
    AddBranchComponent,
    LicenseIndexComponent,
    ShowLicenseComponent,
    UploadComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    FormsModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatIconModule,
    MatSortModule,
  ],
  providers: [DatePipe]
})
export class LicensesModule { }
