import { Request, Response } from "express";
import { CreateVehicle } from "../usecases/vehicle/CreateVehicle";
import { DeleteVehicle } from "../usecases/vehicle/DeleteVehicles";
import { GetVehicleById } from "../usecases/vehicle/GetVehicleById";
import { GetVehicles } from "../usecases/vehicle/GetVehicles";
import { UpdateVehicle } from "../usecases/vehicle/UpdateVehicles";

export class VehicleController {
  private createVehicle: CreateVehicle;
  private getVehicles: GetVehicles;
  private getVehicleById: GetVehicleById;
  private updateVehicle: UpdateVehicle;
  private deleteVehicle: DeleteVehicle;

  constructor(
    createVehicle: CreateVehicle,
    getVehicles: GetVehicles,
    getVehicleById: GetVehicleById,
    updateVehicle: UpdateVehicle,
    deleteVehicle: DeleteVehicle
  ) {
    this.createVehicle = createVehicle;
    this.getVehicles = getVehicles;
    this.getVehicleById = getVehicleById;
    this.updateVehicle = updateVehicle;
    this.deleteVehicle = deleteVehicle;
  }

  async createVehicleHandler(req: Request, res: Response) {
    try {
      const vehicle = await this.createVehicle.execute(req.body);
      res.status(201).json(vehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async getVehiclesHandler(req: Request, res: Response) {
    try {
      const vehicles = await this.getVehicles.execute();
      res.status(200).json(vehicles);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  async getVehicleByIdHandler(req: Request, res: Response) {
    try {
      const vehicle = await this.getVehicleById.execute(req.params.id);
      res.status(200).json(vehicle);
    } catch (error: any) {
      res.status(404).json({ error: error.message });
    }
  }

  async updateVehicleHandler(req: Request, res: Response) {
    try {
      const vehicle = await this.updateVehicle.execute(req.params.id, req.body);
      res.status(200).json(vehicle);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteVehicleHandler(req: Request, res: Response) {
    try {
      await this.deleteVehicle.execute(req.params.id);
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
