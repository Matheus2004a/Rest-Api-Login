const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const routerProducts = require("./src/routes/products")
const routerRequests = require("./src/routes/requests")
const routerUsers = require("./src/routes/users")

app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.use(routerProducts)
app.use(routerRequests)
app.use(routerUsers)

// Executa quando digitar uma rota que não existe
app.use((req, res) => {
    const error = new Error("Nenhum dado encontrado")
    error.status = 404
    res.status(error.status).send(error.message)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    return res.send({
        error: {
            message: error.message
        }
    })
})

app.listen(port, () => console.log(`Running on port ${port}`))