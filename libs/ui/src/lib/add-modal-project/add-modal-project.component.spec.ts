import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddModalProjectComponent } from './add-modal-project.component';

describe('AddModalProjectComponent', () => {
  let component: AddModalProjectComponent;
  let fixture: ComponentFixture<AddModalProjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddModalProjectComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddModalProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
