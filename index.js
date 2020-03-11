//importando pacotes/ bibliotecas
const express = require('express');
const server = express();

//Declarando uma variável para as tarefas cotidianas
var tarefas = [
    {id: 1,
    descricao: "Comprar pão",
    finalizado: false}
];

//Instruindo o servidor a retornar todos os dados da URL em JSON
server.use(express.json());

//Inserindo os dados nas variáveis
server.post('/tarefa', async function(request, response)
{
    const tarefa = request.body;
    await tarefas.push(tarefa);
    return response.status(201).send();
})

//retornando todos os dados do vetor com o get
server.get('/tarefa', async function(request, response)
{
    return response.json(tarefas);
}
)

//retornando os dados do vetor filtrando
server.get('/tarefa/:id', async function(request, response)
{
    //pegando o ID da URL "GET" para retornar no listar
    const id = request.params.id;
    const retorno = await tarefas.filter(t=>t.id ==id); 
    return response.json(retorno); //o parametro "retorno" é somente a variavel que vai retornar
}
)


//uptade 
server.put('/tarefa/:id', async function(request, response)
{
    const id = request.params.id;
    const tarefa = request.body;

    await tarefas.forEach(t=>{
        if(t.id==id)
            {
                t.descricao = tarefa.descricao;
                t.finalizado = tarefa.finalizado;
                return;
            }
        })
    return response.send();
})


//deletando do vetor pelo "id"
server.delete('/tarefa/:id', async function(request, response)
{
    //puxando o id
    const id = request.params.id;
    tarefas = await tarefas.filter(f => f.id != id);
    return response.status(201).send();
}
)


//ouvir a porta do servidor
server.listen(process.env.PORT || 3000);