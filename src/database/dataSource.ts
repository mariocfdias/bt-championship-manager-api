import { DataSource } from "typeorm"

export const AppDataSource = new DataSource({
    type: "sqlite",
    database: "beach_tennis_rest_api_database",
    migrations: ["src/database/migrations/*.ts"],
    entities: ["src/entities/*.{ts,js}"]

})

AppDataSource.initialize()
    .then(() => {
        console.log("Banco de dados inicializado com sucesso")
    })
    .catch((err) => {
        console.error("Erro durante inicialização do banco de dados:", err)
    })

