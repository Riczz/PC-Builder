import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuildSelectorComponent } from './build-selector.component';

describe('BuildSelectorComponent', () => {
  let component: BuildSelectorComponent;
  let fixture: ComponentFixture<BuildSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuildSelectorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuildSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
