
import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterLinkActive } from '@angular/router';
// import { MDBBootstrapModule } from 'angular-bootstrap-md';
@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @ViewChild('navbar') navbar!: ElementRef;
  isNavbarCollapsed = true;
  toggleNavbar() {
    this.isNavbarCollapsed = !this.isNavbarCollapsed;
  }

  scrollToContactUs(event: Event) {
    event.preventDefault();
    const contactUsElement = document.getElementById('contact-us');
    if (contactUsElement) {
      contactUsElement.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToAboutUs(event: Event) {
    event.preventDefault();
    const aboutUsElement = document.getElementById('about-us');
    if (aboutUsElement) {
      aboutUsElement.scrollIntoView({ behavior: 'smooth' });
    }
  }


  }

