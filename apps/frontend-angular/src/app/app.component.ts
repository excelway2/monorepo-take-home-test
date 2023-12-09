import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UiComponent } from '@monorepo-take-home-test/ui';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [RouterModule, UiComponent],
  selector: 'monorepo-take-home-test-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'frontend-angular';
}
