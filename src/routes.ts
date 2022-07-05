import { Router } from "express"
import { LocationController } from "./controllers/LocationController"
import { UserController } from "./controllers/UserController"
import { ChampionshipController } from "./controllers/ChampionshipController"
import { AuthController } from "./controllers/AuthController"
import { MatchController } from "./controllers/MatchController"
import { auth } from "./middleware/auth"
import { authAdmin } from "./middleware/authAdmin"

const routes = Router()
// Rotas que não precisam de permissão de admin
routes.post("/auth/signIn", new AuthController().signIn)
routes.post("/auth/register", new AuthController().register)


routes.get("/locations", new LocationController().getAll)
routes.get("/championships", new ChampionshipController().getAll)

routes.use(authAdmin)
// Rotas que precisam de permissão de admin
routes.post("/users", new UserController().create)

routes.post("/locations", new LocationController().create)
routes.delete("/locations", new LocationController().delete)
routes.patch("/locations/", new LocationController().update)
	    
routes.get("/users", new UserController().getAll)
routes.post("/users", new UserController().create)
routes.delete("/users", new UserController().delete)
routes.patch("/users", new UserController().update)

routes.post("/championships", new ChampionshipController().create)
routes.patch("/championships", new ChampionshipController().update)
routes.delete("/championships", new ChampionshipController().delete)

routes.post("/enrollChampionship", new ChampionshipController().enroll)
routes.delete("/championships", new ChampionshipController().delete)

routes.patch("/match/consolidate", new MatchController().consolidate)
routes.post("/auth/signIn", new AuthController().signIn)
routes.post("/auth/register", new AuthController().register)

routes.post("/matches", new MatchController().create)
routes.patch("/matches/consolidate/", new MatchController().consolidate)
routes.get("/matches", new MatchController().getAll)

export { routes }