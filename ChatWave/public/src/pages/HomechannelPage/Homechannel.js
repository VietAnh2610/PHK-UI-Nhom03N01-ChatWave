import React from 'react'
import './Homechannel.scss'
import ChannelComponent from '../../components/ChannelComponent/ChannelComponent'
const Homechannel = () => {

  return (
    <div  style={{padding:20}}>
    <div className="HomeAll-top d-flex justify-content-between">
      <div  className="Homechannel-top-left d-flex justify-content-between align-items-center">
      <i class="fa-solid fa-plus"></i>
        <p style={{margin:0}}>
          Tạo kênh mới
        </p>
        
      </div>
      <div className="HomeAll-top-right d-flex justify-content-between">
        <p>Sắp xếp</p>
        <select>
          <option>Gần đây</option>
          <option>Danh sách 03</option>
          <option>Danh sách 04</option>
        </select>
      </div>
    </div>
    <div style={{height:'auto'}} className="row">
      <ChannelComponent />

    </div>
  </div>
  )
}

export default Homechannel