import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BookCardSimpleComponent } from './book-card-simple.component';

describe('BookCardSimpleComponent', () => {
  let component: BookCardSimpleComponent;
  let fixture: ComponentFixture<BookCardSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BookCardSimpleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BookCardSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display book details', () => {
    component.book = {
      id: '1',
      volumeInfo: {
        title: 'Test Book',
        authors: ['Author 1'],
        description: 'This is a test book description.',
        imageLinks: { thumbnail: 'test-image-url' },
      },
    };

    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Test Book');
    expect(compiled.querySelector('p')?.textContent).toContain('Author 1');
  });
});
