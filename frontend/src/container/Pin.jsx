import React,{useState} from 'react'
import { Routes,Route } from 'react-router-dom';
// import NavBar from '../components/NavBar';
import { UserProfile, CreatePin,Feed, Login,NavBar,PinDetail,Search} from '../components';
const Pin = ({user}) => {
  const [searchTerm, setSearchTerm] = useState(""); 
  
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-white'>
        {/*NavBar*/}
        <NavBar
          searchTerm = {searchTerm}
          setSearchTerm = {setSearchTerm}
          user = {user}
        />
      </div>
      <div className='h-full'>
        <Routes>
          <Route path='/' element={<Feed />}></Route>
          <Route path='/user-profile/:userId' element={<UserProfile />}></Route>
          <Route path='/category/:categoryId' element={<Feed />}></Route>
          <Route path='/pin-detail/:pinId' element={<PinDetail user={user} />}></Route>
          <Route path='/create-pin' element={<CreatePin user={user} />}></Route>
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>}></Route>
        </Routes>
      </div>
  </div>
  );
};

export default Pin;