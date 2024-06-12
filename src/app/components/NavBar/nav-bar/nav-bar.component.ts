
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @ViewChild('navbar') navbar!: ElementRef;
  isNavbarCollapsed = true;
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  }

