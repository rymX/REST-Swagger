import Express from 'express'
import { join, dirname } from 'path'
import Cors from 'cors'
import Morgan from 'morgan'
import { Low ,JSONFile } from 'lowdb' ;
import { fileURLToPath } from 'url' ;
import {booksRouter} from "./routes/books"

const PORT = process.env.PORT || 4000 ;
const __dirname = dirname(fileURLToPath(import.meta.url));

// import {FileSync} from "lowdb/adapters/FileSync"

const file = join(__dirname, 'db.json')
const adapter = new JSONFile(file)

// const adapter = new FileSync('db.json');

const db = new Low(adapter) ;

await db.read() ;
db.data ||= { books: [] }

const app = Express();
app.db = db ;


app.use(Cors() )

app.use(Express.json()) ;

app.use(Morgan("dev")) ;

app.listen(PORT , () => console.log(`the server is runnig ojn port ${PORT}`))

app.use("/books" , booksRouter)
