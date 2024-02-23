import * as express from 'express';
const app = express();
const port = 3000;

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient({
  log: [
    {
      emit: 'stdout',
      level: 'query',
    },
    {
      emit: 'stdout',
      level: 'error',
    },
    {
      emit: 'stdout',
      level: 'info',
    },
    {
      emit: 'stdout',
      level: 'warn',
    },
  ]
})

prisma.$on('query', (e) => {
  console.log('Query: ' + e.query)
  console.log('Params: ' + e.params)
  console.log('Duration: ' + e.duration + 'ms')
})

async function getPosts() {
  const posts = await prisma.user.findMany()
  console.log("posts", posts)
}
app.use(express.json());

getPosts()
/* AUTENTICATION  */
app.post('/api/auth/register/',async function (req, res){
  try{
    let now :Date= new Date(Date.now())
    console.log("body", req.body);
  const result: any = await prisma.user.create({
    data:{
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        createdAt: now,
        upDateTimedAt: now,
    }
  })
  res.send(result)

  }catch(err){
    res.send({'error':err});
  }
  
  
})
app.post('/api/auth/login',(req, res)=>{
  res.send('register')
})
/* *******************************  */

/* BOOKS  */
app.get('/api/books/', async(req, res) => {

  try{
    let now :Date= new Date(Date.now())
    console.log("body", req.body);
  const result: any = await prisma.book.findMany({
    
  })
  res.send(result)

  }catch(err){
    res.send({'error':err});
  }
})
app.get('/api/books/:id', async(req, res) => {
  try{
    const result = await prisma.book.findUnique({
      where: { id: parseInt(req.params.id) },
    })
    res.send(result);

  }catch(err){
    res.send({'error':err});
  }
  
})
app.post('/api/books/',async(req, res)=>{

  try{
    let now :Date= new Date(Date.now())
    let publicationDate = new Date(req.body.publicationYear);
    
  const result: any = await prisma.book.create({
    data:{
      title: req.body.title,
      author : req.body.author,
      publicationYear :publicationDate,
        createdAt: now,
        upDateTimedAt: now,
    }
  })
  res.send(result)

  }catch(err){
    res.send({'error':err});
  }
})
app.put('/api/books/:id',async(req, res)=>{
  try{
    let dataIn = {};
    let now :Date= new Date(Date.now())
    let publicationDate = new Date(req.body.publicationYear);
    if(req.body.title != undefined || req.body.title != null){
      dataIn['title'] = req.body.title
    }
    if(req.body.author != undefined || req.body.author != null){
      dataIn['author'] = req.body.author
    }
    if(req.body.publicationYear != undefined || req.body.publicationYear != null){
      let publicationDate = new Date(req.body.publicationYear);
      dataIn['publicationYear'] = publicationDate
    }
    dataIn['upDateTimedAt'] = now;
    const result = await prisma.book.update({
      where: { id: parseInt(req.params.id) },
      data:dataIn
    })
    res.send(result);

  }catch(err){
    res.send({'error':err});
  }
  
})
app.delete('/api/books/:id',async (req, res)=>{
  try{
    const result = await prisma.book.delete({
      where: { id: parseInt(req.params.id) },
    })
    res.send(result);

  }catch(err){
    res.send({'error':err});
  }
})
/* *******************************  */

/* LOANS */
app.post('/api/loans/:userId/:bookId',async(req, res)=>{
  try{
    let now :Date= new Date(Date.now())
    const resultGet = await prisma.loan.findFirst({
      where: {
        userId: parseInt(req.params.userId),
        bookId: parseInt(req.params.bookId),
      }});
      console.log(resultGet);

    if(resultGet == null){
    
    const result = await prisma.loan.create({      
      data:{
        userId: parseInt(req.params.userId),
        bookId: parseInt(req.params.bookId),
        loanDateTime:now,
        returnDateTime:now
      }
    })
    res.send(result);
  }else{
    console.log("ODDER",resultGet.returnDateTime -  resultGet.loanDateTime ,resultGet.returnDateTime, resultGet.loanDateTime)
    if(resultGet.returnDateTime -  resultGet.loanDateTime != 0){
      const result = await prisma.loan.update({    
        where:{
          id: resultGet.id
        },  
        data:{   
          loanDateTime:now,     
          returnDateTime:now
        }
      })
      res.send(result);
    }
    else{
      res.send(resultGet)
    }
    
  }

  }catch(err){
    res.send({'error':err});
  }
})

app.put('/api/loans/:userId/:bookId',async(req, res)=>{
  try{
    const resultGet = await prisma.loan.findFirst({
      where: {
        userId: parseInt(req.params.userId),
        bookId: parseInt(req.params.bookId),
      }});
      console.log(resultGet);

    if(resultGet != null){
    let now :Date= new Date(Date.now())
    const result = await prisma.loan.update({    
      where:{
        id: resultGet.id
      },  
      data:{
        
        returnDateTime:now
      }
    })
    res.send(result);
  }else{
    res.send(resultGet);
  }

  }catch(err){
    res.send({'error':err});
  }
})
/* *******************************  */

/* BOOK PURCHASE */
app.post('/api/purchase',(req, res)=>{
  res.send('register')
})
/* *******************************  */



app.get('/', (req, res) => {
  res.send('Hello World from here !');
});



app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});