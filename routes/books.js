import Express from 'express';

const router = Express.Router();
import { nanoid} from "nanoid" ;

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
        req.app.db.get("books").push(book).write()
    }
    catch(err) 
    {
        return res.status(500).send(err)
        
    }
 
})
// update 

router.put("/:id", (req,res)=>{

    try{
    req.app.db.get("books").find({id : req.params.id}).assign(req.body).write()

    res.send(req.app.db.get("books").find({id : req.params.id}))

    }
    catch(error){
        res.status(500).send(error)
    }

})

// delete book

router.delete("/:id",(req,res)=>{

    try{
        req.app.db.get("books").remove({id : req.params.id}).write()
        res.sendStatus(200)
    }
     catch(error){
        res.status(500).send(error)
    }

})

export default router ;
// module.exports = router ;