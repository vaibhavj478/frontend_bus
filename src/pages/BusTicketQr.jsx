import React, { useEffect } from 'react'

import { useParams   }  from "react-router-dom"
// import { url } from '../constants/constant';
// import axios from 'axios';

import {QRCodeSVG} from 'qrcode.react';


const BusTicketQr = () => {


    const {id} = useParams();



    // const getData = async()=>{

    //     try {
            
    //        let res = await axios.get(`${url}/ticket/${id}`);

    //         console.log(res.data);

    //     } catch (error) {
    //        console.log(error); 
    //     }
    // }


    useEffect(()=>{

        // getData();


    }, []);


  return (
    <>
    <div>BusTicketQr</div>
          


            <QRCodeSVG value={id} />,

    </>

  )
}

export default BusTicketQr