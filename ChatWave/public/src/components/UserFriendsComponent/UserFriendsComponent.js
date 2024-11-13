import React from 'react'
import './UserFriendsComponent.scss'
const UserFriendsComponent = ({userDataFriends}) => {
    console.log('userDastatrgrg', userDataFriends?.friend)
  return (
  
      
     <>
          {userDataFriends?.map((friend, index) => (
                    <div  className="infoUser_item col-md-3 col-sm-6 py-2 ">
                <div key={index} className="  d-flex ">
                    <img className="avatar-homeAll" src={friend.avatarImage}/>
                   <div style={{width:'100%'}}  className="d-flex justify-content-between">
                        <div className="infoUser d-flex flex-column ">
                            <h1>{friend?.username}</h1>
                            <p style={{color:'rgb(148, 148, 148)'}}></p>
                        </div>
                        <div style={{marginRight:60}}>
                            <p style={{color:'rgb(148, 148, 148)'}}>11 phút</p>
                            <p style={{color:'#f45484', fontWeight:600}}>Online</p>
                        </div>
                   </div>
                </div>
    
            </div>
                ))}
     </>
   
  )
}

export default UserFriendsComponent