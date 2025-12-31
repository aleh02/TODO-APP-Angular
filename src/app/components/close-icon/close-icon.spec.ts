import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CloseIcon } from './close-icon';

describe('CloseIcon', () => {
  let component: CloseIcon;
  let fixture: ComponentFixture<CloseIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CloseIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CloseIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
