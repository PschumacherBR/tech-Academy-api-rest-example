import express from "express";
import { StatusCodes } from "http-status-codes";

const app = express ();
const PORT = process.env.PORT || 3000; //MODIFICADO PARA O SERVIDOR (HEROKU) ACEITAR
let users = [
    { id: 1, name: "Paulo Schumacher", age: 32},
    { id: 2, name: "Caroline Martini", age: 34},
]

app.use(express.json());

app.listen (PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

app.get("/", (request, response) => {
    return response.send ("<h1>Trabalhando com servidor express. </h1>");
});

app.get("/users", (request, response) => {
    return response.send(users);
});

app.get("/users/:userID", (request, response) => {
    const userID = request.params.userID;
    const user = users.find(user => {
        return (user.id === Number (userID))
    })
    return response.send (user)
});

app.post ("/users", (request, response) => {
    const newUser = request.body;

    users.push(newUser);

    return response.status(StatusCodes.CREATED).send(newUser);
})

app.put ("/users/:userID", (request, response) => {
    const userID = request.params.userID;
    const updateUser = request.body;

    users = users.map (user => {
        if (Number(userID) === user.id) {
            return updateUser;
        }

        return user;
    });
    return response.send(updateUser);
});

app.delete ("/users/:userID", (request, response) => {
    const userID = request.params.userID;
    users = users.filter ((user) => user.id !== Number (userID));

    return response.status (StatusCodes.NO_CONTENT).send();
});
