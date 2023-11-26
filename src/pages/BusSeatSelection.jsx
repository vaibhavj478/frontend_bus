import React, { useState, useEffect, useRef } from "react";
import "./BusSeatSelection.css";

import Button from "@mui/material/Button";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import {  ToastContainer, toast } from 'react-toastify';

import axios from "axios";


// form hook
import { useForm } from "react-hook-form";
import { url } from "../constants/constant";



const BusSeatSelection = () => {
  const [ locked  , setLocked ]  = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  // form for booking
  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors },
  } = useForm();
  // fun of on submit

  const onSubmit = async(data) => {

    const now = new Date();
const formattedDate = now.toISOString(); // Outputs in the "2023-11-03T12:00:00.000Z" format

   let obj = {
      "name": `${data.name}`,
      "mobile": `${data.number}`,
      "seatNumber": [...selectedSeats],
      "travelDate": formattedDate
    
    }

    const  res=   await    axios.post(`${url}/bookings`,obj );

    console.log(res.data);
    toast.info(`Ticket Send to ${data.number} `);
    handleClose();
    setSelectedSeats([]);
  };

  const [total, setTotal] = useState(0);

  const handleSeatClick = (seatNumber, prize) => {
    if (selectedSeats.includes(seatNumber)) {
      setSelectedSeats(selectedSeats.filter((seat) => seat !== seatNumber));

      setTotal((prev) => prev - prize);
    } else {
      setSelectedSeats([...selectedSeats, seatNumber]);

      setTotal((prev) => prev + prize);
    }
  };

  const upperBerth = Array.from({ length: 15 }, (_, index) => index + 1);
  const lowerBerth = Array.from({ length: 15 }, (_, index) => index + 16);

  // form state only
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    console.log(selectedSeats);
    console.log(typeof selectedSeats);
    if (selectedSeats.length === 0) {
      console.log(selectedSeats);
      toast.error("Please Select Seat's");
      return;
    }
  
  
    setOpen(true);
  };
  

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef(null);

  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const getBookedSeats = async()=>{

    try {
      
      let {data}  =  await axios.get(`${url}/booked-seats`);

      setLocked(data.seats)

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{

    getBookedSeats()

  }, [selectedSeats , setLocked]);

  return (
    <>
      <div className="selected-seats">
        <p>Selected Seats: {selectedSeats.join(", ")}</p>
        <p>{total}</p>
      </div>

      <div className="bus-seat-selection">
        <div className="berth">
          <h2>Upper Berth</h2>
          <div className="bus-layout">
            {upperBerth.map((seatNumber, index) => {
              return (
                <div
                  key={seatNumber}

                  // style={{ pointerEvents:  locked.includes(seatNumber)?   "none" :"auto"  }}

                  className={`seat ${
                    selectedSeats.includes(seatNumber) ? "selected" : ""
                  }  ${
                    locked.includes(seatNumber)?   "booked" :"" 
                  } `}
                  onClick={() => handleSeatClick(seatNumber, 500)}
                >
                  {seatNumber}
                  <br />
                  Upper 500
                </div>
              );
            })}
          </div>
        </div>
        <div className="berth">
          <h2>Lower Berth</h2>
          <div className="bus-layout">
            {lowerBerth.map((seatNumber, index) => {
              return (
                <div
                  key={seatNumber}
                  className={`seat ${
                    selectedSeats.includes(seatNumber) ? "selected" : ""
                  }  ${
                    locked.includes(seatNumber)?   "booked" :"" 
                  } `}

                  onClick={() => handleSeatClick(seatNumber, 800)}
                >
                  {seatNumber}
                  <br />
                  Lower 800
                </div>
              );
            })}
          </div>
        </div>
      </div>

     
        <Button onClick={handleClickOpen} variant="contained">
          Book
        </Button>
     

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"body"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle id="scroll-dialog-title">Confirm Booking</DialogTitle>
          <DialogContent dividers={true}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
            >
              <div className="selected-seats">
                <p>Booking for: {[...selectedSeats].join(", ")}</p>
              </div>

              <div id="form">
                {/* register your input into the hook by invoking the "register" function */}
                <input
                  defaultValue=""
                  type="text"
                  placeholder="Name"
                  {...register("name", { required: true })}
                />

                {errors.name && <span>Please Enter Name</span>}

                {/* include validation with required or other standard HTML validation rules */}
                <input
                  placeholder="Number"
                  type="number"
                  {...register("number", { required: true })}
                />
                {/* errors will return when field validation fails  */}
                {errors.number && <span>Please Enter Number</span>}
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Pay {total} </Button>
          </DialogActions>
        </form>
      </Dialog>

      <ToastContainer />
    </>
  );
};

export default BusSeatSelection;
