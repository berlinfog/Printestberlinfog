import React,{useState,useEffect} from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import MasonryLayout from "./MasonryLayout"
import Spinner from "./Spinner"
import NotFound from "../assets/Desert.svg"
import {searchQuery,feedQuery} from "../utils/data"
import { client } from '../client'
const Feed = () => {
  const [loading,setLoading] =useState(false);
  const [pins,setPins] = useState(null);

  //get the category from url
  const {categoryId} = useParams();

  useEffect(()=>{
    setLoading(true);
    if(categoryId){
      const query = searchQuery(categoryId);
      client.fetch(query).then((data)=>{
        setPins(data);
        setLoading(false);
      })
    }else{
      client.fetch(feedQuery).then((data)=>{
        setPins(data);
        setLoading(false);
      })
    }
  },[categoryId])
  if(loading) return <Spinner msg={"new feeds are loading"}/>
  
  if(!pins?.length) return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <p>There's no image in this category </p>
      <img src={NotFound} className="md:w-[30%] w-[80%] mt-5" alt="" />
    </div>
  );
  return <div>
    {pins && <MasonryLayout pins={pins} />}
  </div>
}

export default Feed