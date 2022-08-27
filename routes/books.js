import Express from 'express';

const router = Express.Router();
import {Nanoid} from "nanoid" ;

const idLength = 8;

router.get("/",(req,res)=>{
    const books = req.app.db.get('books') ;
    res.send(books);
})

router.get("/:id" ,(req,res)=>{
    const book = req.app.db.get('books').find({id : req.params.id,}).value() ;
    res.send(book)

})

router.post("/" , (req,res)=>{
    try{
        const book = {
            id : Nanoid(idLength) , 
            ...req.body 
        }
        req.app.db.get("book").push(book).write()
    }
    catch(err) 
    {
        return res.status(500).send(err)
        
    }
 
})
// update 

// delete 

module.exports(router);