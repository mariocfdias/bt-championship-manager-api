import "reflect-metadata"
import {AppDataSource} from './database/dataSource'

import swaggerUi from 'swagger-ui-express'

const swaggerFile = require('../swagger_output.json')
 
import express from "express"
import {routes} from './routes'


const app = express();
 
app.use(express.json())
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.listen(3000, () => {
    console.log('API iniciada')
})

