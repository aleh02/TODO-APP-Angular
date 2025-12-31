import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenIcon } from './open-icon';

describe('OpenIcon', () => {
  let component: OpenIcon;
  let fixture: ComponentFixture<OpenIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OpenIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpenIcon);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
