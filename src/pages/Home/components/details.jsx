import React, { useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";

function Details(props){
    const backnavig = useNavigate()
    const {id} = useParams();
    const [theitem,setTheittem] = useState([]);
    const [loed,setIsloading] = useState(false)

    useEffect(()=>{
    fetch(`https://api.coinpaprika.com/v1/tickers/${id}`)
        .then(response => response.json())
        .then(data=>{
            console.log(data);
            setTheittem(data);
            setIsloading(true)
            
        })
    },[id])

    if (!theitem) {
        return(
            <div style={{width:'100%',height:'100vh',display:'flex',justifyContent:'center'}}>
                <p>not found yet .....</p>
            </div>
        )
    }
    return(
        <div>
            <p>the name of the bitcoin is :{theitem.name}</p>
            <p>and its main symbol is {theitem.symbol}</p>
            <p>the rank it reached is abviously {theitem.rank}</p>
            {/* <p>the rank it reached is abviously {parseInt(theitem.quotes.USD.percent_change_24h)}</p> */}
            <motion.button 
            className="bTn"
            onClick={()=>backnavig("/")}>back</motion.button>
        </div>
    )
    
}

export default Details 