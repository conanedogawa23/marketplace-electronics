import { Router } from "express";
import integrator from "../controller/integrator/index.ts";
import { isAuthorised } from "../middleware/integrator.ts";

const integratorRoute = Router();

integratorRoute.route("/pull-projects")
    .get(isAuthorised, integrator.pullProjects);

integratorRoute.route("/pull-items")
    .get(isAuthorised, integrator.pullProjectItems);

integratorRoute.route("/pull-purchase-orders")
    .get(isAuthorised, integrator.pullPurchaseOrders);

export default integratorRoute;