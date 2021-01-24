const cors = require('cors');
const express = require('express');
const app = express();
const axios = require('axios');
const port = 3001;

app.use(cors());

const url = 'https://api.github.com/users/takenet/repos?&page=1&per_page=10&sort=created&direction=asc';
let result = [];

app.get('/:id', async (req, res) =>{

    try {
        const  {data}  = await axios(url);
        
        for(let i = 0; i < data.length; i++ ){
            let { full_name, description, language, created_at} = data[i]
            if(language == 'C#') {
                result.push({full_name, description, created_at, language })
            }
        }
        
        result.sort((a,b) => {            
            return a.created_at > b.created_at;
        });

        result.slice(0,5);


        return res.send(result[req.params.id]);
        
        
    } catch (error) {
        console.error(error);        
    }
});
app.listen(process.env.PORT || port, ()=>{
    console.log(`Server is running at ${port}`);
})