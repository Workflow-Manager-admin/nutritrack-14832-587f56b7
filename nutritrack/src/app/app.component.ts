import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NutriTrackMainComponent } from './nutritrack-main/nutritrack-main.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NutriTrackMainComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
