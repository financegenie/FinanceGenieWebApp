import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsContentComponent } from './accounts-content.component';

describe('AccountsContentComponent', () => {
  let component: AccountsContentComponent;
  let fixture: ComponentFixture<AccountsContentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountsContentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
