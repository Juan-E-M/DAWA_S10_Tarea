import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent {
  nombre: string = '';
  email: string = '';
  isFormValid: boolean = false;

  constructor(private router: Router) {}

  showConfirmation() {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Estás seguro de enviar el formulario?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Enviar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.onSubmit();
        Swal.fire({
          title: '¡Formulario enviado!',
          text: 'Gracias por enviar el formulario.',
          icon: 'success'
        }).then(() => {
          this.resetForm();
        });
      }
    });
  }

  onSubmit() {
    console.log('Formulario enviado');
    console.log(`Nombre: ${this.nombre}`);
    console.log(`Email: ${this.email}`);
    this.router.navigate(['/destino'], { state: { nombre: this.nombre, email: this.email } });
  }

  resetForm() {
    this.nombre = '';
    this.email = '';
    this.isFormValid = false;
  }

  onInputChange() {
    const nombrePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    this.isFormValid = nombrePattern.test(this.nombre) && emailPattern.test(this.email);
  }
}
