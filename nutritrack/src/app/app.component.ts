import { Component } from '@angular/core';
import { NutriTrackMainComponent } from './nutritrack-main/nutritrack-main.component';

// PUBLIC_INTERFACE
@Component({
  selector: 'app-root',
  imports: [NutriTrackMainComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {}
