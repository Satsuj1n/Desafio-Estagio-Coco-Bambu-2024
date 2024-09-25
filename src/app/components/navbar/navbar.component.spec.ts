import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavBarComponent } from './navbar.component';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('NavBarComponent', () => {
  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBarComponent, HttpClientTestingModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the title and logo', () => {
    const titleElement = fixture.debugElement.query(
      By.css('.title')
    ).nativeElement;
    const logoElement = fixture.debugElement.query(
      By.css('.navbar-logo')
    ).nativeElement;

    expect(titleElement.textContent).toContain('Coco Bambu Desafio');
    expect(logoElement.src).toContain('https://i.imgur.com/ZMsawTj.png');
  });

  it('should navigate to favorites when heart icon is clicked', () => {
    spyOn(component, 'goToFavorites');

    const favoritesIcon = fixture.debugElement.query(
      By.css('.favorites-icon')
    ).nativeElement;
    favoritesIcon.click();

    expect(component.goToFavorites).toHaveBeenCalled();
  });

  it('should display the favorite count if greater than 0', () => {
    component.favoriteCount = 5;
    fixture.detectChanges();

    const favoriteCountElement = fixture.debugElement.query(
      By.css('.favorites-count')
    ).nativeElement;

    expect(favoriteCountElement.textContent).toBe('5');
  });

  it('should not display the favorite count if it is 0', () => {
    component.favoriteCount = 0;
    fixture.detectChanges();

    const favoriteCountElement = fixture.debugElement.query(
      By.css('.favorites-count')
    );

    expect(favoriteCountElement).toBeNull();
  });
});
