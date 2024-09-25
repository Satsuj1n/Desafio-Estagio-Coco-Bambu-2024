import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { SearchBarComponent } from './search-bar.component';
import { By } from '@angular/platform-browser';

describe('SearchBarComponent', () => {
  let component: SearchBarComponent;
  let fixture: ComponentFixture<SearchBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should emit search event after debounce time', fakeAsync(() => {
    spyOn(component.search, 'emit');

    component.query = 'debounced search';
    component.onInputChange();

    tick(1500);

    expect(component.search.emit).toHaveBeenCalledWith('debounced search');
  }));

  it('should emit search event immediately on button click', () => {
    spyOn(component.search, 'emit');

    component.query = 'immediate search';
    fixture.debugElement.query(By.css('button')).nativeElement.click();

    expect(component.search.emit).toHaveBeenCalledWith('immediate search');
  });
});
