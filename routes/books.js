import Express from 'express';

const router = Express.Router();
import { nanoid} from "nanoid" ;
import lodash from 'lodash'


const idLength = 8;

/**
 * @swagger
 * components:
 *   schemas:
 *     book:
 *       type: object 
 *       required:
 *         -title
 *         -author
 *       properties:
 *         id:
 *             type: string 
 *             description: the id of the book
 *         title:
 *             type: string 
 *             description: the book title
 *         author:
 *             type: string 
 *             description: the book author
 */

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: the book managing api 
 */

/**
 * @swagger
 * /books:
 *   get:
 *     tags: [books]
 *     summary: return list of all books
 *     responses :
 *       200:
 *         description : list of all the books 
 *         content: 
 *           application/json:
 *             schema: 
 *               type: array
 *               items: 
 *                 $ref: '#/components/schemas/book'
 */


router.get("/",(req,res)=>{
    const db = req.app.db ;
db.chain = lodash.chain(db.data)


    const books = db.chain
    .get('books')
    .value()
    res.send(books);

   
})
    
/**
 * @swagger
 * /books/{id}:
 *   get:
 *     tags: [books]
 *     summary: return specific book
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: numeric id 
 *     responses :
 *       200:
 *         description : list of all the books 
 *         content: 
 *           application/json:
 *             schema: 
 *               items: 
 *                 $ref: '#/components/schemas/book'
 *       404:
 *         description : the book was not found
 */       
router.get("/:id" ,(req,res)=>{

    const db = req.app.db ;
    db.chain = lodash.chain(db.data)
    
    
        const book = db.chain
        .get('books')
        .find({id : req.params.id})
        .value()
        res.send(book);

})
/**
 * @swagger
 * /books:
 *   post:
 *     tags: [books]
 *     summary: create a new book 
 *     requestBody:
 *       description: create a new book here
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref:'#/components/schemas/book'
 *     responses :
 *       200:
 *         description : the book was seccessfully created
 *         content: 
 *           application/json:
 *             schema: 
 *               $ref: '#/components/schemas/book'
 *       500:
 *         description : server error     
 */

router.post("/" , (req,res)=>{
    const db = req.app.db ;

    db.chain = lodash.chain(db.data)

    try{
        const book = {
            id : nanoid(idLength) , 
            title:"test",
            autho:"test"
        }
        const rsult = db.chain
        .push(book)
        
        res.send(rsult);

        //req.app.db.get("books").push(book).write()
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