import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpuCoolerComponent } from './cpu-cooler.component';

describe('CpuCoolerComponent', () => {
  let component: CpuCoolerComponent;
  let fixture: ComponentFixture<CpuCoolerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpuCoolerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CpuCoolerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
