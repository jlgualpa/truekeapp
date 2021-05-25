import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { InformacionComponent } from 'src/app/navigation/informacion/informacion.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  @Output() sidenavClose = new EventEmitter();

  constructor(private dialog: MatDialog) { }

  ngOnInit() {
  }

  infoDialog(titulo, id): void {
    this.dialog.open(InformacionComponent, { data: { titulo: titulo, id: id } });
  }


}
