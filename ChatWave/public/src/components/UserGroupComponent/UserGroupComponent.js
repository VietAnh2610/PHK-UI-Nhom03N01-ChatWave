import React from 'react'
import './UserGroupComponent.scss'
const UserGroupComponent = ({userDataGroups}) => {
    console.log("userDataGroups",userDataGroups)
  return (
  
      <div className='row'>
          {userDataGroups?.map ((group, index) => (
    
          <div  key={index} className="  d-flex col-md-3 col-sm-6 ">
              <img style={{width:60, height:50}} className="avatar-homeAll" src={group?.avatarImage} alt=''/>
             <div style={{width:'100%'}}  className="d-flex justify-content-between">
                  <div className="infoUser d-flex flex-column ">
                      <h1>{group.name}</h1>
                      <p style={{color:'rgb(148, 148, 148)'}}>{group.members.length} thành viên</p>
                  </div>
                  <div style={{marginRight:60}}>
                      <p style={{color:'rgb(148, 148, 148)'}}>54 phút</p>
                      <p style={{color:'#f45484', fontWeight:600}}>Online</p>
                  </div>
             </div>
          </div>
          ))}
                 
      </div>
           

            
   
  )
}

export default UserGroupComponent