import { Router } from "express"
import { LocationController } from "./controllers/LocationController"
import { UserController } from "./controllers/UserController"
import { ChampionshipController } from "./controllers/ChampionshipController"
import { AuthController } from "./controllers/AuthController"
import { MatchController } from "./controllers/MatchController"

const routes = Router()

routes.post("/locations", new LocationController().create)
routes.get("/locations", new LocationController().getAll)
routes.delete("/locations", new LocationController().delete)
routes.patch("/locations/", new LocationController().update)


routes.post("/users", new UserController().create)

	    
routes.get("/users", new UserController().getAll)
routes.post("/users", new UserController().create)
routes.delete("/users/:id", new UserController().delete)
routes.patch("/users/:id", new UserController().update)


routes.post("/championships", new ChampionshipController().create)
routes.patch("/championships", new ChampionshipController().update)
routes.delete("/championships", new ChampionshipController().delete)


routes.post("/enrollChampionship", new ChampionshipController().enroll)
routes.get("/championships", new ChampionshipController().getAll)
routes.delete("/championships/:id", new ChampionshipController().delete)

routes.post("/auth/signIn", new AuthController().signIn)
routes.post("/auth/register", new AuthController().register)

routes.post("/matches", new MatchController().create)
routes.patch("/matches/consolidate/", new MatchController().consolidate)
routes.get("/matches", new MatchController().getAll)

export { routes }