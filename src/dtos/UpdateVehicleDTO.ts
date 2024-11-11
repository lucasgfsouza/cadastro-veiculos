export class UpdateVehicleDTO {
  placa?: string;
  chassi?: string;
  renavam?: string;
  modelo?: string;
  marca?: string;
  ano?: number;

  constructor(data: Partial<UpdateVehicleDTO>) {
    this.placa = data.placa;
    this.chassi = data.chassi;
    this.renavam = data.renavam;
    this.modelo = data.modelo;
    this.marca = data.marca;
    this.ano = data.ano;
  }
}
