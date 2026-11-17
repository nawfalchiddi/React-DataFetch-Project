import './Hero.css'
import imgs from '../../../assets/intermediate-swimming.jpg'
import iMgfb from '../../../assets/footbal.jpg'
import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import Details from './details' 
import { motion } from 'motion/react'
import { animate, scroll,stagger } from "motion"
function Hero() {
const [item,setItem] = useState([])
const [searchinput,setSearchinput] = useState("")
const [select,setSelect] = useState("all")
const [loed,setIsLoed] = useState(false)


const navigateto = useNavigate()

    useEffect(()=>{
        fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response)=>response.json())
        
      .then((response)=>{
        console.log(response);
        setItem(response)
        setIsLoed(true)
      })
    },[])
    if (loed===false) {
    //    throw new Error("yo something is wrong!!")
       return(
        <div>
            <h1>please wait a second ....</h1>
        </div>
       )
    }


   const thesearchf = item.filter((item)=>{
      if (searchinput!=='') {
        if (!item.name.toLowerCase().includes(searchinput.toLowerCase())) {
            return false
        }
    }
    return true
   })
    
const filteredCoins = thesearchf.sort((prod , secndpro )=> {
    if (select === 'all') {
      return 0; 
    } else if(select==="heighest") {
      return secndpro.quotes.USD.price - prod.quotes.USD.price
    //   return parseFloat(prod.price) > Number(select); 
    }else if(select==="lowest") {
      return prod.quotes.USD.market_cap - secndpro.quotes.USD.market_cap
    }else if(select==="heighestCap") {
      return prod.quotes.USD.market_cap - secndpro.quotes.USD.market_cap
    }
    return 0
  });
    
//   animate(
//   ".thecardsusers",
//   { y: 0, opacity: 1 },
//   { delay: stagger(0.1) }
// )
    return(
        
        <section className='heroSection'>


        <div>
            
            </div>  
            <div className='searchBox'>
                <motion.input className='searchinpt' whileTap={{ scale: 1.5 }}  placeholder='searcha product....' type="search" value={searchinput} onChange={event=>setSearchinput(event.target.value)}/>
                <motion.select  drag
                   dragSnapToOrigin
                   whileTap={{ scale: 1 }}
  whileDrag={{ scale: 1.2 }}
  whileHover={{ scale: 1.05 }}
                 className='theselectinpt' value={select}
                onChange={event=>setSelect(event.target.value)} name="" id="">
                    <option value="all">All the prices</option>
                    <option value="heighest">the heiest prices</option>
                    <option value="lowest">lowest prices</option>
                    <option value="heighestCap">heighest cap</option>
                </motion.select>
            </div>

        <div className='thecardsusers' >
           {
            filteredCoins.length > 0 ?  
                filteredCoins.map((person)=>(
                    <motion.div  drag
  dragSnapToOrigin
  whileHover={{ scale: 1.05 }}
//   whileTap={{ scale: 1 }}
//   whileDrag={{ scale: 1.2 }}
                     onClick={()=>navigateto(`/details/${person.id}`)} key={person.id} className='thecarditself'>
{/* <Details thedata={item}/> */}
                        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                    <img style={{width:'50%'}} src="https://static.vecteezy.com/system/resources/thumbnails/053/964/117/small/a-silhouette-of-a-person-with-a-circular-head-and-a-minimalistic-body-structure-showcasing-a-simple-design-png.png" alt="" />

                        </div>
                        <div style={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',justifyContent:'space-around'}}>
                        <h3 style={{color:'white',fontStyle:'italic'}}>the name : {person.name}</h3>
                        <p style={{color:'lightgreen'}}>Symbol : {person.symbol}</p> 

                        </div>
                      

                        <p style={{color:'lightgreen'}}>value : {person.beta_value}</p>
                        <p style={{color:'lightgreen'}}>Rank : {person.rank}</p>
                        <p style={{color:'white'}}>the price : {parseInt(person.quotes.USD.price)}</p>
                        <p style={{color:'white'}}> total supplies : {person.total_supply}</p>
            <p>the volume in 24h {parseInt(person.quotes.USD.percent_change_24h)}</p>

                        
                    </motion.div>
                ))
            : <p>not item  found for you</p>
           }
        </div>
           
        </section>
       
    )
}

export default Hero