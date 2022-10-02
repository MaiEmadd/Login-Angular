import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowLicenseComponent } from './show-license.component';

describe('ShowLicenseComponent', () => {
  let component: ShowLicenseComponent;
  let fixture: ComponentFixture<ShowLicenseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowLicenseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ShowLicenseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
