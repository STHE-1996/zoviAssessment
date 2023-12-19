import { Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent {
  isVisible: boolean = false;

  // Method to show the loader
  show() {
    this.isVisible = true;
  }

  // Method to hide the loader
  hide() {
    this.isVisible = false;
  }
}
