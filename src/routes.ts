import { Router } from "express";
import { vehicleController } from "./container";

const router = Router();

router.post(
  "/vehicles",
  vehicleController.createVehicleHandler.bind(vehicleController)
);
router.get(
  "/vehicles",
  vehicleController.getVehiclesHandler.bind(vehicleController)
);
router.get(
  "/vehicles/:id",
  vehicleController.getVehicleByIdHandler.bind(vehicleController)
);
router.put(
  "/vehicles/:id",
  vehicleController.updateVehicleHandler.bind(vehicleController)
);
router.delete(
  "/vehicles/:id",
  vehicleController.deleteVehicleHandler.bind(vehicleController)
);

export { router };
