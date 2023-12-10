// shared.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HeaderService {
  private showCreationForm: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  toggleCreationFormVisibility(): void {
    this.showCreationForm.next(!this.showCreationForm.value);
  }

  getCreationFormVisibility(): Observable<boolean> {
    return this.showCreationForm.asObservable();
  }
}
