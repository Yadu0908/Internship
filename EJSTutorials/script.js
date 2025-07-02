const express= require('express')

const app = express()

app.use(function(req, res, next){

    console.log(req.url);
    next()
    
});



//? Creating the route.

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.get('/profile', (req, res) => {
    res.send('This is profile route')           //! http://localhost:3000/profile
  })

  
app.get('/another', (req, res) => {
    res.send('This is another route')           //! http://localhost:3000/another
  })


//? Dynamic routing


//* Configuring the ejs.


app.set("view engine", "ejs")

  
app.get('/profile/:username', (req, res) =>{

  const username = req.params.username          //! params will insert the whatever the things written after the `:`
  // res.send(`This is ${username} route `);


  res.render("index", {username: username})

})


//* Template engines



app.set('view engine', 'ejs')

app.get('/about', (req, res)=>{

  res.render("about")
})


app.listen(3000)