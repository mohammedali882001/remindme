import { HttpClient } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Component({
  selector: 'app-whatsapp-chat',
  standalone: true,
  imports: [],
  templateUrl: './whatsapp-chat.component.html',
  styleUrl: './whatsapp-chat.component.css'
})
export class WhatsappChatComponent {
  @Input() patientId: number=0;
  relativePhoneNumber: string='';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchRelativePhoneNumber();
  }

  fetchRelativePhoneNumber(): void {
    this.http.get<string>(`${environment.baseUrl}/Relative/RelativePhoneNumber`)
      .subscribe({

        next: phoneNumber => {
          console.log(phoneNumber);
          this.relativePhoneNumber = phoneNumber;
          console.log(this.relativePhoneNumber);

        },
        error: error => {
          console.error('Error fetching relative phone number:', error);
          // Handle error appropriately (e.g., show error message)
        }
      });
  }

  openWhatsAppChat(): void {
    const message = encodeURIComponent('Hello, I need to connect with you.');
    const whatsappUrl = `https://wa.me/${this.relativePhoneNumber}?text=${message}`;
    window.open(whatsappUrl, '_blank');
  }
}
