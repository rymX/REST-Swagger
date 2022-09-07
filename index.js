import Express from 'express'
import { join, dirname } from 'path'
import Cors from 'cors'
import Morgan from 'morgan'
import { Low ,JSONFile } from 'lowdb' ;
import { fileURLToPath } from 'url' ;
import booksRouter from "./routes/books.js";
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';



const PORT = process.env.PORT || 4000 ;

const __dirname = dirname(fileURLToPath(import.meta.url));

const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)


const db = new Low(adapter) ;

await db.read() ;
// db.data ||= { books: [] }


const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'Hello World',
        version: '1.0.0',
      },
   
    servers: [
      {
        url: "http://localhost:4000", // url
        description: "Local server", // name
      },
    ],
  },
    
    apis: ['./routes/*.js'],
  };
  
  const openapiSpecification = swaggerJSDoc(options);
  

const app = Express();
app.db = db ;
app.use('/api-doc', swaggerUI.serve , swaggerUI.setup(openapiSpecification) )



app.use(Cors() )

app.use(Express.json()) ;

app.use(Morgan("dev")) ;

 app.use("/books" , booksRouter)


app.listen(PORT , () => console.log(`the server is runnig on port ${PORT}`))



