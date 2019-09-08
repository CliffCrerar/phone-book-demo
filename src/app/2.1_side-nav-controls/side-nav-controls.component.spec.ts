import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavControlsComponent } from './side-nav-controls.component';

describe('SideNavControlsComponent', () => {
  let component: SideNavControlsComponent;
  let fixture: ComponentFixture<SideNavControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SideNavControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
