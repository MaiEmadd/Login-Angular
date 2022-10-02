import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { BranchConstants } from '../branch-constants';
import { Branch} from '../Branch';
import { LicensesApiService } from '../licenses-api.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css']
})
export class AddBranchComponent implements OnInit {

  constructor(private _formBuilder: FormBuilder, private toastr:ToastrService ,private _LicensesApiService:LicensesApiService, private dateAdapter: DateAdapter<any>, private datePipe: DatePipe,
    private _router:Router) {
      this._LicensesApiService.listStoreCodes().subscribe((data) => {
        this.store_codes = data;
      })
  }

files: any[] = [];

public brach!:Branch;

public constants = BranchConstants;

errorStoreCodeFlag = false;

store_codes?:any[];



checkCode() {
  if (this.store_codes?.indexOf((<Number> (<unknown>this.firstFormGroup.get('store_code')?.value))) != -1)
      this.errorStoreCodeFlag = true;
  else
    this.errorStoreCodeFlag = false;
}


valid_through:string | null = "";
renewal_date:string | null = "";

  transformDate(dateGiven?:Date, type?:string) {
    console.log(dateGiven);
    if (type == "السريان") {
     this.valid_through = this.datePipe.transform(dateGiven, 'yyyy/MM/dd');
    }
    else {
      this.renewal_date = this.datePipe.transform(dateGiven, "yyyy/MM/dd")
    }
  }


  firstFormGroup = this._formBuilder.group({
    store_code: ['', Validators.required],
    sap_code: [''],
    status: [this.constants.states[0].name, Validators.required]
  });

  secondFormGroup = this._formBuilder.group({
    branch_confirmations: [''],
    branch_address: ['', Validators.required],
    governorate: ['', Validators.required],
    province: ['', Validators.required]
  });

  thirdFormGroup = this._formBuilder.group({
    renewal_date: '',
    valid_through: ['', Validators.required],
  });

  fourthFormGroup = this._formBuilder.group({
    files:''
  });


  ngOnInit(): void {
    this.dateAdapter.setLocale('ar');
  }

  finish(files:any[]  ) {

    this.thirdFormGroup.get('valid_through')?.setValue(this.valid_through);
    this.thirdFormGroup.get('renewal_date')?.setValue(this.renewal_date);


    let  apiBody = <Branch> Object.assign({}, this.firstFormGroup.value, this.secondFormGroup.value, this.thirdFormGroup.value);

    this._LicensesApiService.addLicense(apiBody).subscribe( (data) => {
        this.brach = <Branch> data;

        if (files.length != 0)
          this._LicensesApiService.addLicenseAttachments(files, <string> <unknown> this.brach.id).subscribe(data => {

            this.toastr.success('تم الحفظ بنجاح', '', {
              timeOut: 2000,
              tapToDismiss: true,
              extendedTimeOut: 2000,
              progressBar: true
            }).onHidden.subscribe( () => this._router.navigate(["contracts/view",this.brach.id])
            )

          }, () => {
            this.toastr.error('خطأ! يرجى التأكد من اتصالك بالإنترنت', '', {
              timeOut: 2000,
              tapToDismiss: true,
              extendedTimeOut: 2000,
              progressBar: true
            }) ;
          });
           else {
            this.toastr.success('تم الحفظ بنجاح', '', {
              timeOut: 2000,
              tapToDismiss: true,
              extendedTimeOut: 2000,
              progressBar: true

            }).onHidden.subscribe(
              () => this._router.navigate(["contracts/view",this.brach.id]
            ))
          }
        },
        () => {
          this.toastr.error('خطأ! يرجى التأكد من اتصالك بالإنترنت', '', {
            timeOut: 2000,
            tapToDismiss: true,
            extendedTimeOut: 2000,
            progressBar: true
          }) ;
        }

    )
  }
}
