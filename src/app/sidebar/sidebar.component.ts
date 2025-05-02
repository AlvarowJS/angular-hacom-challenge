import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  menuItems = [
    { icon: 'bxs-dashboard', text: 'Dashboard', route: '/dashboard' },
    { icon: 'bx-user', text: 'Autores', route: '/autors' },
    { icon: 'bx-book', text: 'Libros', route: '/libros' },
  ];

}
