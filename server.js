const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const routerProducts = require("./routes/products")

app.use(express.json())

app.get("/products", routerProducts)
app.get("/products/:id", routerProducts)
app.post("/products", routerProducts)
app.patch("/products/:id", routerProducts)
app.delete("/products/:id", routerProducts)

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