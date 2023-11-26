import React, { useState } from "react";
import QrReader from "react-qr-scanner";
import { url } from "../constants/constant";
import axios  from  "axios"
const QRScanner = () => {
  // const [result, setResult] = useState('');

  const [details, setDetails] = useState({isData:false });

  const handleScan = async (data) => {
    if (data) {
      console.log(data);
      // setResult(data);

      try {
        getData(data.text);

       
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleError = (error) => {
    console.error(error);
  };

  const getData = async (id) => {
    try {
      let res = await axios.get(`${url}/ticket/${id}`);

     console.log(res);
      setDetails((prev)=> ({ ...prev , ...res.data ,isData : true }));
     
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      { !details.isData ?  
        <QrReader
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "50%" }}
        />
        : ""
      }

      <div> {details.isData && <>
      
      <h1 style={{margin:"1rem" , textAlign:"center"}} >Welcome to our bus {details.name}</h1>
      <p style={{margin:"1rem",textAlign:"center"}}  >+91{details.mobile}</p>

      <h3 style={{margin:"0.5rem",textAlign:"center"}} >Your sets our</h3>


          {
            details.seatNumber.map((el , ind)=>{

              return (<p key={ind} > {el>15 ? `${el}-Lower`:`${el}-Upper` }   </p>)

            })
          }



      
      </>} </div>
    </div>
  );
};

export default QRScanner;
