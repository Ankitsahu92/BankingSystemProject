import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUpdateBalanceComponent } from './add-update-balance.component';

describe('AddUpdateBalanceComponent', () => {
  let component: AddUpdateBalanceComponent;
  let fixture: ComponentFixture<AddUpdateBalanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddUpdateBalanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddUpdateBalanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
