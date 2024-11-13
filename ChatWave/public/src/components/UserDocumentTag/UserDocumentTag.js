import React from 'react'
import './UserDocumentTag.scss'
const UserComponent = () => {
  return (
  
         <div  className="infoUser_item col-md-4 col-sm-6 py-2 ">
            <div className="  d-flex ">
                <img className="avatar-homeAll" src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcRGrH-J5ubDI_Z6vukkwsNvei3yz1A9vV8ZxVSVipUkDQIYE2UY"/>
               <div style={{width:'100%'}}  className="d-flex justify-content-between">
                    <div className="infoUser d-flex flex-column ">
                        <h1>Nguyễn Đình Quang</h1>
                        <div className='userDocumentContainer'>
                            <div className='userDocumentContainer-left'>
                                <i class="fa-solid fa-file-word" style={{fontSize:'50px',color:'blue'}}></i>

                            </div>
                            <div className='userDocumentContainer-right'>
                                <h1>BCgiaodien.docx</h1>
                                <h1 style={{color:"red"}}>10.00 MB</h1>

                            </div>
                        </div>
                        </div>
                    <div style={{marginRight:100}}>
                        <p style={{color:'rgb(148, 148, 148)'}}>05/06/2024</p>
                        
                    </div>
               </div>
            </div>
        </div>
   
  )
}

export default UserComponent