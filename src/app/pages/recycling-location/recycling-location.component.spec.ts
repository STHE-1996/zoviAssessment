import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecyclingLocationComponent } from './recycling-location.component';

describe('RecyclingLocationComponent', () => {
  let component: RecyclingLocationComponent;
  let fixture: ComponentFixture<RecyclingLocationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecyclingLocationComponent]
    });
    fixture = TestBed.createComponent(RecyclingLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
