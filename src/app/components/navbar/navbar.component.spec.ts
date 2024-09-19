import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './navbar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.title')?.textContent).toContain(
      'Book Collection'
    );
  });

  it('should call goToFavorites when button is clicked', () => {
    spyOn(component, 'goToFavorites');
    const button =
      fixture.debugElement.nativeElement.querySelector('.favorites-button');
    button.click();
    expect(component.goToFavorites).toHaveBeenCalled();
  });
});
