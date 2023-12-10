import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreationFormComponent } from '../creation-form/creation-form.component';
import { HeaderService } from '../header.service';

@Component({
  selector: 'monorepo-take-home-test-header',
  standalone: true,
  imports: [CommonModule, CreationFormComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(private headerService: HeaderService) {}

  toggleForm(): void {
    this.headerService.toggleCreationFormVisibility();
  }
}
