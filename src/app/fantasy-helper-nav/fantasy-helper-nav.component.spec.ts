
import { fakeAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FantasyHelperNavComponent } from './fantasy-helper-nav.component';

describe('FantasyHelperNavComponent', () => {
  let component: FantasyHelperNavComponent;
  let fixture: ComponentFixture<FantasyHelperNavComponent>;

  beforeEach(fakeAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatSidenavModule],
      declarations: [FantasyHelperNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FantasyHelperNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
