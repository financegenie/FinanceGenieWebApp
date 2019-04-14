import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapsContentComponent } from './maps-content.component';

describe('MapsContentComponent', () => {
  let component: MapsContentComponent;
  let fixture: ComponentFixture<MapsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
