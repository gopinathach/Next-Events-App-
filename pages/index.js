import axios from "axios";
import Cards from "./Cards";
const https = require('https');

export const getStaticProps = async () => {
  const instance = axios.create({
    httpsAgent: new https.Agent({
      rejectUnauthorized: false
    })
  });
  const res = await instance.get('https://sscstrapi-uat.isdb.org/events');
  const data = await res.data

  return {
    props: { fetchedData: data }
  }
}

const TaskComponent = ({ fetchedData }) => {
  console.log(fetchedData)
  const toTextDate = (dateNumber) => {
    let monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    let monthNameSpecific = monthNames[parseInt(dateNumber.split("-")[1]) -1 ];
    let date = dateNumber.split("-")[2];
    return date +","+ monthNameSpecific
  };

  fetchedData.forEach(element => {
    element.eventinDate = (toTextDate(element.StartDate.split("T")[0])).split(",")[0];
    element.eventinMonth = (toTextDate(element.StartDate.split("T")[0])).split(",")[1];
  });
  console.log(fetchedData)
  return (
    <div className= "next_container">
      <div className="totalCards">
      {fetchedData.map(data => (
        <div className="individualCard">
        <div key={data.id}>
          <Cards id={data.id} monthName={data.eventinMonth}  date={data.eventinDate}/>

        </div>
        </div>
      ))}
      </div>
      
    </div>
  );
}

export default TaskComponent;