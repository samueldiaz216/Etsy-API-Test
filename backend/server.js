const express = require('express');
const cors = require('cors');
const fetch=require('node-fetch');



require('dotenv').config();

const app=express();
const port = process.env.PORT||5000;

//MIDDLEWARE
app.use(cors());
app.use(express.json());



const keyString=process.env.KEYSTRING;
const shopId=process.env.ETSY_SHOP_ID;

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
})

app.get("/", async function(request,response){
    const listingInfo=[];
    let imageRes;
    let imageBlob;
    let image;
    
    const res=await fetch(`https://openapi.etsy.com/v2/shops/${shopId}/listings/active?api_key=${keyString}`);
    const listings=await res.json();

    for( const i of listings.results){
        console.log("fetching image")
        imageRes=await fetch(`https://openapi.etsy.com/v2/listings/${i.listing_id}/images/active?api_key=${keyString}`);
       
        // image=URL.createObjectURL(imageBlob);
        listingInfo.push({image:imageRes,
                        listingDetails:i
                });   
        
    }

    
    
    const data={listingInfo}




    response.json(data);
    
})


  




