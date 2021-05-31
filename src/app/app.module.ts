import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { RegistrarComponent } from './components/usuario/registrar/registrar.component';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { ToastrModule } from 'ngx-toastr';
import { HeaderComponent } from './navigation/header/header.component';
import { HomePublicComponent } from './components/home/home-public/home-public.component';
import { FooterComponent } from './navigation/footer/footer.component';
import { HomeLoginComponent } from './components/home/home-login/home-login.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { PerfilComponent } from './components/usuario/perfil/perfil.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableModule } from '@angular/material/table';
import { MatExpansionModule } from '@angular/material/expansion';
import { PasswordComponent } from './components/usuario/password/password.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatSelectModule } from '@angular/material/select';
import { ContactoComponent } from './components/usuario/contacto/contacto.component';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { AddPublicacionComponent } from './components/publicaciones/add-publicacion/add-publicacion.component';
import { ListPublicacionComponent } from './components/publicaciones/list-publicacion/list-publicacion.component';
import { DetailPublicacionComponent } from './components/publicaciones/detail-publicacion/detail-publicacion.component';

import { NgImageSliderModule } from 'ng-image-slider';
import { DialogConfirmComponent } from './navigation/dialog-confirm/dialog-confirm.component';
import { ProcesoIntercambioComponent } from './components/intercambios/proceso-intercambio/proceso-intercambio.component';
import { ListIntercambioComponent } from './components/intercambios/list-intercambio/list-intercambio.component';
import { InformacionComponent } from './navigation/informacion/informacion.component';
import { PinchZoomModule } from 'ngx-pinch-zoom';



@NgModule({
  declarations: [
    AppComponent,
    RegistrarComponent,
    HeaderComponent,
    HomePublicComponent,
    FooterComponent,
    HomeLoginComponent,
    LoginComponent,
    PerfilComponent,
    PasswordComponent,
    ContactoComponent,
    AddPublicacionComponent,
    ListPublicacionComponent,
    DetailPublicacionComponent,
    DialogConfirmComponent,
    ProcesoIntercambioComponent,
    ListIntercambioComponent,
    InformacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule, MatInputModule, MatButtonModule, MatButtonToggleModule,
    MatCardModule, MatFormFieldModule, MatIconModule, MatMenuModule, MatToolbarModule,
    MatListModule, MatSidenavModule, MatDatepickerModule,
    MatNativeDateModule, MatTableModule, MatExpansionModule, MatDatepickerModule, MatCheckboxModule, MatRadioModule,
    MatDividerModule, MatTabsModule, ImageCropperModule, MatSelectModule, ScrollingModule,
    ToastrModule.forRoot({
      //timeOut: 3500,
      positionClass: 'toast-top-center' //,
      //preventDuplicates: true,
    }),
    NgImageSliderModule, PinchZoomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
