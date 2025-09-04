require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
app.use(cors())
require('./config/dbConfig')
  .then(res =>{
    console.log('Banco carregado.') 
    app.emit('Ready')
  })
  .catch(e => console.log(e))

const userRoutes = require('./routes/userRoutes')
const tokenRoutes = require('./routes/tokenRoutes')
const transitionRoutes = require('./routes/transitionRoutes')

app.use(express.json())
app.use(cors({ origin: '*' }))
app.use('/users', userRoutes)
app.use('/tokens', tokenRoutes)
app.use('/transitions', transitionRoutes)

app.on('Ready', () =>{
    app.listen(process.env.PORT, () =>{
        console.log('Server is running...')
    })
})