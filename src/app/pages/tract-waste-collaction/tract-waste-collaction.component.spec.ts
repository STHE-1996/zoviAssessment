import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TractWasteCollactionComponent } from './tract-waste-collaction.component';

describe('TractWasteCollactionComponent', () => {
  let component: TractWasteCollactionComponent;
  let fixture: ComponentFixture<TractWasteCollactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TractWasteCollactionComponent]
    });
    fixture = TestBed.createComponent(TractWasteCollactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
