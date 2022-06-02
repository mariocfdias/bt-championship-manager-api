import { Router } from "express"
import { LocationController } from "./controllers/LocationController"
import { UserController } from "./controllers/UserController"
import { ChampionshipController } from "./controllers/ChampionshipController"

const routes = Router()

routes.post("/locations", new LocationController().create)
routes.get("/locations", new LocationController().getAll)
routes.delete("/locations/:id", new LocationController().delete)


routes.post("/users", new UserController().create)
routes.get("/users", new UserController().getAll)
routes.delete("/users/:id", new UserController().delete)


routes.post("/championships", new ChampionshipController().create)
routes.post("/enrollChampionship", new ChampionshipController().enroll)
routes.get("/championships", new ChampionshipController().getAll)
routes.delete("/championships/:id", new ChampionshipController().delete)


export { routes }