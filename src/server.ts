import "reflect-metadata"
import {AppDataSource} from './database/dataSource'

import swaggerUi from 'swagger-ui-express'

const swaggerFile = require('../swagger_output.json')
const cors = require('cors');
import express from "express"
import {routes} from './routes'


const app = express();
app.use(express.json())
app.use(cors());
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)

app.listen(8080, () => {
    console.log('API iniciada')
})

