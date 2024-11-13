import React from 'react'
import './UserMesUnreadComponent.scss'
const UserMesUnreadComponent = () => {
  return (
    <div  className="infoUser_item col-md-3 col-sm-6 py-2 ">
    <div className="  d-flex ">
        <img className="avatar-homeAll" src="https://cdn-media.sforum.vn/storage/app/media/THANHAN/avartar-anime-91.jpg"/>
       <div style={{width:'100%'}}  className="d-flex justify-content-between">
            <div className="infoUser d-flex flex-column ">
                <h1>Nguyễn Văn A </h1>
                <p style={{color:'rgb(148, 148, 148)', display:'flex', alignItems:'center'}}>xin chào <span className='quality_unreaf'>2</span> </p>
            </div>
            <div style={{marginRight:60}}>
                <p style={{color:'rgb(148, 148, 148)'}}>05/06/2024</p>
                <p style={{color:'#f45484', fontWeight:600}}>Online</p>
            </div>
       </div>
    </div>
</div>
  )
}

export default UserMesUnreadComponent