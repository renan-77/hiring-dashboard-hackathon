import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AboutDellComponent } from './about-dell.component';

describe('AboutDellComponent', () => {
  let component: AboutDellComponent;
  let fixture: ComponentFixture<AboutDellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AboutDellComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AboutDellComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
