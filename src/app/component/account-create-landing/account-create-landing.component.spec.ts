import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountCreateLandingComponent } from './account-create-landing.component';

describe('AccountCreateLandingComponent', () => {
  let component: AccountCreateLandingComponent;
  let fixture: ComponentFixture<AccountCreateLandingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccountCreateLandingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountCreateLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
