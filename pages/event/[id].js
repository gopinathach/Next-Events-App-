import React from "react";
import axios from "axios";


const https = require("https");
const baseUrl = "https://sscstrapi-uat.isdb.org";

export const getStaticPaths = async () => {
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false,
    }),
  });
  const res = await instance.get("https://sscstrapi-uat.isdb.org/events");
  const data = await res.data;

  const paths = data.map((path) => {
    return {
      params:{ id: path.id.toString() } ,
    }
  })

  return {
      paths,
      fallback: false
  }
};


export const getStaticProps = async (context) => {
    
    const id = context.params.id;

    const instance = axios.create({
      httpsAgent: new https.Agent({
        rejectUnauthorized: false
      })
    });
    const res = await instance.get(`https://sscstrapi-uat.isdb.org/events/${id}`);
    const data = await res.data
  
    return {
      props: { fetchedData: data }
    }
  }

  
function Details({ fetchedData }) {

      return (
          <div>
              {/* Id: {router.query.title} */}
            
                  <>
                  <label>Author</label>
                  <h1>{fetchedData.Author}</h1>
                  <label>Title</label>
                  <h1>{fetchedData.Title}</h1>
                  <label>Creation Date</label>
                  <h1>{fetchedData.CreatedDate}</h1>
                  <label>Location</label>
                  <h1>{fetchedData.Location}</h1>
                  <label>Description</label>
                  <h1>{fetchedData.Description}</h1>
                  <label>Speaker</label>
                  <h1>{fetchedData.Speaker}</h1>
                  <label>Start Date</label>
                  <h1>{fetchedData.StartDate}</h1>
                  <label>Type</label>
                  <h1>{fetchedData.Type}</h1>
                  <label>Image</label>
                  {fetchedData.Image.map(f=>(
                      <>
                      <img src={baseUrl+f.url} />
                      </>
                  ))}
                  <a>{fetchedData.RegistrationLink}</a>
                  </>
              
          </div>
      );
  }
  
  export default Details;


  