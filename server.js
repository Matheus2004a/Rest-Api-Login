const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const routerProducts = require("./routes/products")
const routerRequests = require("./routes/requests")
const routerUsers = require("./routes/users")

app.use(express.json())
app.use("/uploads", express.static("uploads"))

app.get("/products", routerProducts)
app.get("/products/:id", routerProducts)
app.post("/products", routerProducts)
app.patch("/products/:id", routerProducts)
app.delete("/products/:id", routerProducts)

app.get("/pedidos", routerRequests)
app.get("/pedidos/:id", routerRequests)
app.post("/pedidos", routerRequests)
app.patch("/pedidos/:id", routerRequests)
app.delete("/pedidos/:id", routerRequests)

app.get("/users", routerUsers)
app.get("/users/:id", routerUsers)
app.post("/users/signup", routerUsers)
app.patch("/users/signup/:id", routerUsers)
app.delete("/users/:id", routerUsers)
app.post("/users/login", routerUsers)

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