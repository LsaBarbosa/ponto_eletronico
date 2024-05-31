import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmplyeeOptionsComponent } from './emplyee-options.component';

describe('EmplyeeOptionsComponent', () => {
  let component: EmplyeeOptionsComponent;
  let fixture: ComponentFixture<EmplyeeOptionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmplyeeOptionsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmplyeeOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
