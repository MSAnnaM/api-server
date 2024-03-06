import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import dotenv from 'dotenv'
import swaggerUi from 'swagger-ui-express'
import swaggerDocument from './swagger.json' assert { type: 'json' }

dotenv.config()

import userRouter from './routes/userRoutes.js'
import boardRouter from './routes/bordRoutes.js'
// import columnRouter from "./routes/columnRoutes.js";
// import cardRouter from "./routes/cardRoutes.js";
import { errorHandler, notFoundHandler } from './helpers/errorHandlers.js'

const app = express()

app.use(morgan('tiny'))
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
app.use('/api/users', userRouter)
app.use('/api/boards', boardRouter)
// app.use("/api/columns", columnRouter);
// app.use("/api/cards", cardRouter);

app.use(notFoundHandler)
app.use(errorHandler)

export default app
