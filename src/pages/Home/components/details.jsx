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
            <img src="https://e7.pngegg.com/pngimages/145/494/png-clipart-gold-colored-bitcoin-coin-bitcoin-cryptocurrency-monero-initial-coin-offering-bitcoin-medal-gold-thumbnail.png" alt="" />
            <p>the name of the bitcoin is :{theitem.name}</p>
            <p>and its main symbol is {theitem.symbol}</p>
            <p>the rank it reached is abviously {theitem.rank}</p>
            {/* <p>the rank it reached is abviously {parseInt(theitem.quotes.USD.percent_change_24h)}</p> */}
            <motion.button 
            
            onClick={()=>backnavig("/")}>back</motion.button>
        </div>
    )
    
}

export default Details 