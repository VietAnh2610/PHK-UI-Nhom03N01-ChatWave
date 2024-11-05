import React from 'react'
import './ChannelComponent.scss'
const ChannelComponent = () => {
  return (
<div>
<div  className="infoUser_item col-md-3 col-sm-6 py-4">
    <div className="  d-flex justify-content-between">
       <div className='d-flex channel-info justify-content-between'>
        <img src='https://public.bnbstatic.com/image/pgc/202402/3c152318ac7929accbeccf9de16998fb.png'/>
        <div className='channel-info-right'>
            <strong>Bitcoin | Crypto <i class="check fa-solid fa-check"></i></strong>
            <p style={{color:'rgb(148, 148, 148)'}}>20k người đăng ký </p>
            <p style={{color:'rgb(212, 6, 68)'}}>5000 người <span style={{color:'rgb(212, 6, 68)', fontWeight:600}}>Online</span></p>
        </div>
       </div>
       <div  style={{marginRight:50, float:'right', textAlign:'right'}}>
       <i class="fa-solid fa-ellipsis"></i>
            <p style={{margin:0, marginTop:20}}>05/02/2024</p>
       </div>
    </div>
    <div className='channel-bottom'>
        <img src='https://cdn-media.sforum.vn/storage/app/media/THANHAN/avartar-anime-89.jpg'/>
        <p>Một công ty trao đổi tiền điện tử có...</p>
    </div>
</div>
<div  className="infoUser_item col-md-3 col-sm-6 py-4">
    <div className="  d-flex justify-content-between">
       <div className='d-flex channel-info justify-content-between'>
        <img src='https://public.bnbstatic.com/image/pgc/202402/3c152318ac7929accbeccf9de16998fb.png'/>
        <div className='channel-info-right'>
            <strong>Bitcoin | Crypto <i class="check fa-solid fa-check"></i></strong>
            <p style={{color:'rgb(148, 148, 148)'}}>20k người đăng ký </p>
            <p style={{color:'rgb(212, 6, 68)'}}>5000 người <span style={{color:'rgb(212, 6, 68)', fontWeight:600}}>Online</span></p>
        </div>
       </div>
       <div  style={{marginRight:50, float:'right', textAlign:'right'}}>
       <i class="fa-solid fa-ellipsis"></i>
            <p style={{margin:0, marginTop:20}}>05/02/2024</p>
       </div>
    </div>
    <div className='channel-bottom'>
        <img src='https://cdn-media.sforum.vn/storage/app/media/THANHAN/avartar-anime-89.jpg'/>
        <p>Một công ty trao đổi tiền điện tử có...</p>
    </div>
</div>
</div>
  )
}

export default ChannelComponent