import React from 'react'
import './UserComponent.scss'
const UserComponent = () => {
  return (
  
         <div  className="infoUser_item col-md-3 col-sm-6 py-2 ">
            <div className="  d-flex ">
                <img className="avatar-homeAll" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRGrH-J5ubDI_Z6vukkwsNvei3yz1A9vV8ZxVSVipUkDQIYE2UY"/>
               <div style={{width:'100%'}}  className="d-flex justify-content-between">
                    <div className="infoUser d-flex flex-column ">
                        <h1>Nguyễn Đình Quang</h1>
                        <p style={{color:'rgb(148, 148, 148)'}}>xin chào</p>
                    </div>
                    <div style={{marginRight:60}}>
                        <p style={{color:'rgb(148, 148, 148)'}}>54 phút</p>
                        <p style={{color:'#f45484', fontWeight:600}}>Online</p>
                    </div>
               </div>
            </div>
        </div>
   
  )
}

export default UserComponent