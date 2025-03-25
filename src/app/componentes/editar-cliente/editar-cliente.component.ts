import { Component } from '@angular/core';
import { Cliente } from '../../modelo/cliente.modelo';
import { ClienteService } from '../../servicios/cliente.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-editar-cliente',
  imports: [FormsModule, RouterModule],
  templateUrl: './editar-cliente.component.html',
  styleUrl: './editar-cliente.component.css'
})
export class EditarClienteComponent {


  cliente: Cliente = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: undefined
  }
  id: string | null = null;

  constructor(private clienteService: ClienteService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.clienteService.getCliente(this.id).subscribe((cliente: Cliente | null) => {
        if (cliente) {
          this.cliente = cliente
        } else {
          console.log('Cliente no encontrado: ' + this.id);
          this.router.navigate(['/']);
        }
      });
    } else {
      console.log('ID no proporcionado');
      this.router.navigate(['/']);
    }
  }

  guardar(clienteForm: NgForm) {
    const { value, valid } = clienteForm;
    if (valid) {
      value.id = this.id;
      this.clienteService.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    console.log(this.cliente);
    if(confirm('Deseas eliminar?')){
      console.log("vino aqui");
      this.clienteService.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }
}
