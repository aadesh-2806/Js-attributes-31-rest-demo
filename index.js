const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const {v4 : uuid } = require('uuid');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.set('views',path.join(__dirname,'views'));
app.set("view engine" , "ejs")

comments = [
    {
        id:uuid(),
        username:'adhk',
        comment:'qwerty'
    },
    {
        id:uuid(),
        username:'tyoe',
        comment:'asdfg'
    },
    {
        id:uuid(),
        username:'chgvdfvgxzn',
        comment:'zxvgxvcvb'
    }
]

app.get('/comments' , (req,res) =>{
    res.render('comments/index' ,{ comments });
})

app.get('/comments/new' , (req,res)=>{
    res.render('comments/new')
})

app.post('/comments' , (req,res) =>{
    const {username, comment } = req.body;
    comments.push( { username, comment , id: uuid() } );
    // res.send('Post successful');
    res.redirect('/comments')//redirect or refrexh page to counter comment page directly
})

app.get('/comments/:id' , (req , res) =>{
    const {id} = req.params;
    const comment = comments.find(c=> c.id === id);
    res.render('comments/show' , { comment });
})

app.get('/comments/:id/edit' , (req,res) =>{
    const { id } = req.params;
    const comment = comments.find(c=> c.id === id);
    res.render('comments/edit' , { comment } );
})

app.patch('/comments/:id' , (req , res) =>{
    const { id } = req.params;
    const newComment = req.body.comment
    const comment = comments.find(c=> c.id === id);
    comment.comment = newComment;
    res.redirect('/comments');
})

app.delete('/comments/:id' , (req,res)=>{
    const { id } = req.params;
    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments')
})

app.get('/tacos' , (req,res)=>{
    res.send('GET /tacos response');
})

app.post('/tacos' , (req,res)=>{
    console.log(req.body);   //gives us the most defined way of getting from server and can be transferred
    res.send('POST/from tacos');
})

app.listen(3000,(req,res) =>{
    console.log('listen to port 3000');
})

/*
GET /comments = show all comments
GET /comments/:id = show comment with specific 
GET /comments/new = form to make new comment
GET /comments/:id/edit = edit specific comment
POST /comments = Create new comment on server
PATCH /comments/:id = update comment
PATCH /comments/:id = delete comment
*/

//uuid is for universal unique id and give unique id whenever called