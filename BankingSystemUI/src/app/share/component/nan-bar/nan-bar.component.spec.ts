import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NanBarComponent } from './nan-bar.component';

describe('NanBarComponent', () => {
  let component: NanBarComponent;
  let fixture: ComponentFixture<NanBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NanBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NanBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
