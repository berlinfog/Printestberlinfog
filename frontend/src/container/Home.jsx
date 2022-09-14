import React,{useState, useRef, useEffect} from "react";
import {Link,Route,Routes} from "react-router-dom";
import Pin from "./Pin"
import {client} from '../client';
import { joinPaths } from "react-router";
import { userQuery } from "../utils/data";
import { fetchUser } from "../utils/fetchUser";
const Home = () => {
  const [user,setUser] = useState(null);
  const scrollRef = useRef(null);
  //get local user info
  const userInfo = fetchUser();
  useEffect(()=>{
    const query = userQuery(userInfo?.sub);//attention! here should turn into name of Oauth2
    client.fetch(query).then((data)=>{
      setUser(data[0]);
      
    });
    // console.log(query);
  },[]);
  useEffect(()=>{
    scrollRef.current.scrollTo(0,0);
  },[]);
  return (
  <div className="flex flex-col h-full transition-height duration-75 ease-out">
    <div 
      className="pb-2 flex-1 h-screen overflow-y-scroll hide_scrollbar"
      ref={scrollRef}
    >
    <Routes>
      <Route path='/*' element={<Pin user={user}/>}></Route>
    </Routes>
    </div>
  </div>
  );
};

export default Home;