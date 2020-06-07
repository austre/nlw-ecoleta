import express, { response } from 'express';

const app=express();
app.use(express.json());
const users=['Austre','Perseu','Binho'];

app.get('/users',(request,response)=>{
    const search=String(request.query.search);
    const res=search?users.filter(user=>user.includes(search)):users;
    return response.json(res);
});

app.get('/users/:id',(request,response)=>{
    const id=Number(request.params.id);
    const user=users[id];
    response.json(user);
});

app.post('/users',(request,response)=>{
    const data=request.body;
    const user={
        name:data.name,
        email:data.email
    };

    return response.json(user);
});

app.listen(3333);