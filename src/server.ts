import "reflect-metadata"
import {AppDataSource} from './database/dataSource'

 
import express from "express"
import {routes} from './routes'


const app = express();
 
app.use(express.json())

app.use(routes)

app.listen(3000, () => {
    console.log('API iniciada')
})

