import React, { useState, useRef, useEffect } from 'react';
import './ChatFriendsComponent.scss';
import { Upload, Input as AntdInput } from 'antd';
import { UploadOutlined, SmileOutlined,UserOutlined,BellOutlined,
         PictureOutlined,VideoCameraOutlined,FileOutlined,
         LinkOutlined ,ClockCircleOutlined ,
 } from '@ant-design/icons';
import Picker from 'emoji-picker-react';
import Chatbot from '../../assets/bot-chat-1.jpg';
import book from "../../assets/book.jpg";
import coin from "../../assets/coin.jpg";
import pet from "../../assets/pet.jpg";
import light from "../../assets/light.jpg";
import time from "../../assets/time.jpg";
import img1 from "../../assets/img1.jpg"
import img2 from "../../assets/img2.jpg"
import img3 from "../../assets/img3.jpg"

import { Switch } from 'antd';

const ChatFriendsComponent = ({ friend, messages, inputValue, handleInputChange, handleSendMessage }) => {
  const chatContentRef = useRef(null);
  const robotIconRef = useRef(null);
  const bookmarkIconRef = useRef(null);
  const ellipsisIconRef = useRef(null);

  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupPosition, setPopupPosition] = useState({ top: 0, left: 0 });
  const [tagsPopupVisible, setTagsPopupVisible] = useState(false);
  const [tagsPopupPosition, setTagsPopupPosition] = useState({ top: 0, left: 0 });
  const [tags] = useState(['Tag 1', 'Tag 2', 'Tag 3', 'Tag 4', 'Tag 5']); 
  const [selectedFile, setSelectedFile] = useState(null);
  const [bookmarkActive, setBookmarkActive] = useState(false);
  const [robotActive, setRobotActive] = useState(false);
  const [ellipsisPopupVisible, setEllipsisPopupVisible] = useState(false);

  useEffect(() => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  }, [messages]);
  useEffect(() => {
    // Tạo phần tử liên kết mới
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css';

    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  const handleEmojiClick = (event, emojiObject) => {
    handleInputChange({ target: { value: inputValue + emojiObject.emoji } });
  };

  const toggleEmojiPicker = () => {
    setIsEmojiPickerVisible(!isEmojiPickerVisible);
  };

  const handleFileChange = ({ file }) => {
    if (file.status === 'done') {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedFile(reader.result);
      };
      reader.readAsDataURL(file.originFileObj);
    }
  };

  const handleCustomSendMessage = () => {
    handleSendMessage({
      message: { text: inputValue, image: selectedFile },
    });
    setSelectedFile(null);
    handleInputChange({ target: { value: '' } });
  };

  const handleRobotClick = () => {
    if (popupVisible) {
      closePopup();
      setRobotActive(false);
    } else {
      if (robotIconRef.current) {
        const rect = robotIconRef.current.getBoundingClientRect();
        const popupHeight = 180;
        setPopupPosition({
          top: rect.top + window.scrollY - popupHeight - 10,
          left: rect.left + window.scrollX - rect.width / 2,
        });
      }
      setPopupVisible(true);
      setRobotActive(true);
    }
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleBookmarkClick = () => {
    if (tagsPopupVisible) {
      closeTagsPopup();
      setBookmarkActive(false);
    } else {
      if (bookmarkIconRef.current) {
        const rect = bookmarkIconRef.current.getBoundingClientRect();
        setTagsPopupPosition({
          top: rect.top + window.scrollY + rect.height + 10,
          left: rect.left + window.scrollX,
        });
      }
      setTagsPopupVisible(true);
      setBookmarkActive(true);
    }
  };

  const closeTagsPopup = () => {
    setTagsPopupVisible(false);
  };

  const handleEllipsisClick = () => {
    setEllipsisPopupVisible(!ellipsisPopupVisible);
  };
  const handleClosePopup = () => {
    setEllipsisPopupVisible(false);
  };

  return (
    <div className="ChatFriendsComponent">
      {friend ? (
        <div className="ChatFriendsComponent-item px-0">
          <div className="ChatFriendsComponent-item-header">
            <div className="d-flex align-items-center">
              <img
                style={{ marginLeft: 10 }}
                className="avatar-homeAll chatfriends-img"
                src={friend.avatarImage}
                alt="friend-avatar"
              />
              <div style={{ width: "100%" }} className="d-flex justify-content-between">
                <div className="infoUser d-flex flex-column">
                  <p style={{ color: "rgb(255, 18, 89)", fontWeight: 500, marginBottom: 0 }}>Online</p>
                  <h1 style={{ fontSize: 16 }}>{friend.username}</h1>
                </div>
                <div className="d-flex align-items-center ChatFriendsComponent-item-header-right">
                  <i
                    className="fa-regular fa-bookmark"
                    onClick={handleBookmarkClick}
                    ref={bookmarkIconRef}
                    style={{
                      cursor: 'pointer',
                      color: bookmarkActive ? '#ff004d' : 'inherit',
                    }}
                  />
                  <i className="fa-solid fa-magnifying-glass" />
                  <i
                    className="fa-solid fa-ellipsis-vertical"
                    onClick={handleEllipsisClick}
                    ref={ellipsisIconRef}
                    style={{
                      cursor: 'pointer',
                      color: ellipsisPopupVisible ? '#ff004d' : 'inherit',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="ChatFriendsComponent-item-body">
            <div className="ChatFriendsComponent-content" ref={chatContentRef}>
              {messages.map((msg, index) => (
                <div key={index} className={`ChatFriendsComponent-content-chat-item${msg.fromSelf ? "-me" : ""} py-2`}>
                  {!msg.fromSelf && (
                    <img src={friend.avatarImage} alt="chat-avatar" />
                  )}
                  {msg.message.image ? (
                    <img
                      src={msg.message.image}
                      alt="sent"
                      className="sent-image"
                    />
                  ) : (
                    <p>{msg.message.text}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="ChatFriendsComponent-item-bottom">
            <div className="ChatFriendsComponent-item-bottom-icon d-flex">
              <div className="ChatFriendsComponent-item-bottom-icon-left">
                <i className="fa-solid fa-microphone" />
                
                 
                <i className="fa-solid fa-note-sticky" />
                <i className="fa-solid fa-gift" />
              </div>
              <div
                className="ChatFriendsComponent-item-bottom-icon-right"
                onClick={handleRobotClick}
                ref={robotIconRef}
                style={{
                  width: '100%',
                  cursor: 'pointer',
                  color: robotActive ? '#ff004d' : 'inherit',
                }}
              >
                <i className="fa-solid fa-robot" />
                <span>Tôi có thể gợi ý câu trả lời cho bạn...</span>
              </div>
            </div>
            <div className="ChatFriendsComponent-item-bottom-message d-flex align-items-center">
              <div className="ChatFriendsComponent-item-bottom-message-left">
                <AntdInput
                  style={{ marginLeft: 10, marginTop: 10 }}
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Nhập tin nhắn..."
                  addonAfter={
                    <SmileOutlined onClick={toggleEmojiPicker} />
                  }
                />
                {isEmojiPickerVisible && (
                  <Picker pickerStyle={{ position: 'absolute', bottom: '60px', right: '60px' }} onEmojiClick={handleEmojiClick} />
                )}
              </div>
              <div className="ChatFriendsComponent-item-bottom-message-right">
                {inputValue.trim() || selectedFile ? (
                  <i className="fa-solid fa-paper-plane" onClick={handleCustomSendMessage} />
                ) : (
                  <i className="fa-solid fa-thumbs-up" />
                )}
              </div>
             
            </div>
          </div>
        </div>
      ) : (
        <p>Chọn một bạn bè để bắt đầu trò chuyện</p>
      )}
      {popupVisible && (
        <div className="ChatFriendsComponent-popup" style={{ marginLeft: '260px', marginTop: '-290px', width:210 }}>
          <div className="ChatFriendsComponent-popup-content">
            <div className='Suggest-bot-chatfriendcomponents'>
              <div style={{height:70}} className='Suggest-bot-chatfriendcomponents-left'>
                <h6 style={{fontSize:14}}>Tôi có thể gợi ý câu trả lời phù hợp, cùng với biểu tượng biểu cảm</h6>
              </div>
              <div className='Suggest-bot-chatfriendcomponents-right' style={{padding:'20px'}}>
                <img src={Chatbot} style={{ width: 50 }} alt="Chatbot" />
              </div>
            </div>
            <div className='another-suggest-botchat'>
              <div className='another-suggest-botchat-left'>
                <button>Câu trả lời thông minh</button>
                <button>Thêm câu trả lời</button>
                <button>Gợi ý câu hỏi</button>
                <button>Thêm câu hỏi</button>
              </div>
              <div className='another-suggest-botchat-right' >
              <i class='fa fa-arrow-right' style={{fontSize:'30px', color:'#ff004d'}}></i>

              </div>
            </div>
          </div>
        </div>
      )}
      {tagsPopupVisible && (
        <div className="ChatFriendsComponent-tags-popup" style={{ marginLeft: tagsPopupPosition.left, marginTop: tagsPopupPosition.top }}>
          <div className="ChatFriendsComponent-tags-popup-content">
            {tags.map((tag, index) => (
              <div key={index} className="ChatFriendsComponent-tags-popup-item">
                {tag}
              </div>
            ))}
          </div>
        </div>
      )}
      {tagsPopupVisible && (
        <div className="ChatFriendsComponent-tags-popup" style={{ marginTop:'-840px',width:'100%' }}>
          <div className="ChatFriendsComponent-tags-popup-content">
            <div className='item-tag-chat'> 
              <img src={book} ></img>
              <h6 style={{paddingTop:'8px',paddingRight:'5px'}}> Sách</h6>
              <h6 style={{color:"#ff004d",paddingTop:'9px'}}>6</h6>
            </div>
            <div className='item-tag-chat'> 
              <img src={coin} ></img>
              <h6 style={{paddingTop:'8px',paddingRight:'5px'}}> Tiền xu</h6>
              <h6 style={{color:"#ff004d",paddingTop:'9px'}}>9</h6>
            </div><div className='item-tag-chat'> 
              <img src={pet} ></img>
              <h6 style={{paddingTop:'8px',paddingRight:'5px'}}> Thú cưng</h6>
              <h6 style={{color:"#ff004d",paddingTop:'9px'}}>3</h6>
            </div>
            <div className='item-tag-chat'> 
              <img src={light} ></img>
              <h6 style={{paddingTop:'8px',paddingRight:'5px'}}> Ý tưởng</h6>
              <h6 style={{color:"#ff004d",paddingTop:'9px'}}>5</h6>
            </div>
            <div className='item-tag-chat'> 
              <img src={time} ></img>
              <h6 style={{paddingTop:'8px',paddingRight:'5px'}}> Thời gian</h6>
              <h6 style={{color:"#ff004d",paddingTop:'9px'}}>1</h6>
            </div>
            
          </div>
        </div>
      )}
      {ellipsisPopupVisible && (
        <div className="ChatFriendsComponent-ellipsis-popup" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
          <div className="ChatFriendsComponent-ellipsis-popup-content" style={{ width: '100%', height: '100%', backgroundColor: '#fff' }}>
            <div className='header-ellipsis-popup'>
              <h1 style={{fontSize:28}}>Chi tiết hội thoại</h1>
              <button onClick={handleClosePopup} style={{
              position: 'absolute',
              top: '10px',
              right: '10px',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer'
            }}>
              <i className="fa fa-times" style={{ fontSize: '30px', color: '#ff004d' }}></i>
            </button>
            </div>
            <div className='informatuon-ellipsis-popup'>
              <div className='item-inf-ellipsis-popup'>
              <UserOutlined style={{fontSize:'20px'}}/>
              <h4 style={{color:'orange', fontSize:16}}>@Wangg</h4>
              </div>

              <div className='item-inf-ellipsis-popup'>
              <BellOutlined style={{fontSize:'20px'}} />
              <h4 style={{fontSize:16, fontWeight:600}}>Thông báo</h4>
              <Switch defaultChecked style={{ marginLeft: '10px' }} />

              </div>

            </div>
            <div className='content-ellipsis-popup'>
              <div className='item-content-ellipsis-popup'>
            <PictureOutlined  style={{fontSize:'20px'}}  />
            <h4 style={{color:'#ff004d', fontSize:16, fontWeight:600}}>40</h4>
            <h4 style={{fontSize:16, fontWeight:600}}>Ảnh</h4>
            <i class="fa fa-arrow-circle-right" aria-hidden="true" style={{color:'#ff004d',fontSize:'28px',paddingLeft:'350px'}}></i>
              </div>
              <div className='item-content-ellipsis-popup' style={{background:"rgb(250, 237, 215)"}}>
                <img src={img1} style={{width:'100px', height:'100px'}}></img>
                <img src={img2} style={{width:'100px', height:'100px'}}></img>
                <img src={img3} style={{width:'100px', height:'100px'}}></img>
                <img src={img1} style={{width:'100px', height:'100px'}}></img>
                <img src={img2} style={{width:'100px', height:'100px'}}></img>
                <img src={img3} style={{width:'100px', height:'100px'}}></img>
                
              </div>

              <div className='item-content-ellipsis-popup'>
            <VideoCameraOutlined  style={{fontSize:'20px'}}  />
            <h4 style={{color:'#ff004d',fontSize:16, fontWeight:600}}>40</h4>

            <h4 style={{fontSize:16, fontWeight:600}}>Video</h4>
            <i class="fa fa-arrow-circle-right" aria-hidden="true" style={{color:'#ff004d',fontSize:'28px',paddingLeft:'330px'}}></i>

              </div>
              <div className='item-content-ellipsis-popup' style={{background:"rgb(250, 237, 215)"}}>
                <img src={img1} style={{width:'100px', height:'100px'}}></img>
                <img src={img2} style={{width:'100px', height:'100px'}}></img>
                <img src={img3} style={{width:'100px', height:'100px'}}></img>
                <img src={img1} style={{width:'100px', height:'100px'}}></img>
                <img src={img2} style={{width:'100px', height:'100px'}}></img>
                <img src={img3} style={{width:'100px', height:'100px'}}></img>
                
              </div>
              <div className='item-content-ellipsis-popup'>
            <FileOutlined  style={{fontSize:'20px'}}  />
            <h4 style={{color:'#ff004d',fontSize:16, fontWeight:600}}>40</h4>

            <h4 style={{fontSize:16, fontWeight:600}}>Files</h4>
            <i class="fa fa-arrow-circle-right" aria-hidden="true" style={{color:'#ff004d',fontSize:'28px',paddingLeft:'345px'}}></i>

              </div>
              <div className='item-content-ellipsis-popup' style={{background:"rgb(250, 237, 215)"}}>
              <div className='userDocumentContainer'>
                            <div className='userDocumentContainer-left'>
                                <i class="fa-solid fa-file-word" style={{fontSize:'50px',color:'blue'}}></i>

                            </div>
                            <div className='userDocumentContainer-right'>
                                <h1>BCgiaodien.docx</h1>
                                <h1 style={{color:"red"}}>10.00 MB</h1>

                            </div>
                        </div>
                        <div className='userDocumentContainer'>
                            <div className='userDocumentContainer-left'>
                                <i class="fa fa-file-powerpoint" style={{fontSize:'50px',color:'red'}}></i>

                            </div>
                            <div className='userDocumentContainer-right'>
                                <h1>BCgiaodien.ppt</h1>
                                <h1 style={{color:"red"}}>10.00 MB</h1>

                            </div>
                        </div>
                        <div className='userDocumentContainer'>
                            <div className='userDocumentContainer-left'>
                                <i class="fa fa-file-excel" style={{fontSize:'50px',color:'green'}}></i>

                            </div>
                            <div className='userDocumentContainer-right'>
                                <h1>BCgiaodien.xlsx</h1>
                                <h1 style={{color:"red"}}>10.00 MB</h1>

                            </div>
                        </div>
                        <div className='userDocumentContainer'>
                            <div className='userDocumentContainer-left'>
                                <i class="fa fa-file-code" style={{fontSize:'50px',color:'blue'}}></i>

                            </div>
                            <div className='userDocumentContainer-right'>
                                <h1>BCgiaodien.cpp</h1>
                                <h1 style={{color:"red"}}>10.00 MB</h1>

                            </div>
                        </div>
                        <div className='userDocumentContainer' style={{paddingLeft:'7px'}}>
                            <div className='userDocumentContainer-left'>
                                <i class="fa fa-file-archive" style={{fontSize:'50px',color:'purple'}}></i>

                            </div>
                            <div className='userDocumentContainer-right'>
                                <h1>BCgiaodien.zip</h1>
                                <h1 style={{color:"red"}}>12.96  MB</h1>

                            </div>
                        </div>
                
              </div>
              
              <div className='item-content-ellipsis-popup'>
              <LinkOutlined   style={{fontSize:'20px'}}  />
            <h4 style={{color:'#ff004d',fontSize:16, fontWeight:600}}>50</h4>

            <h4 style={{fontSize:16, fontWeight:600}}>Link</h4>
            <i class="fa fa-arrow-circle-right" aria-hidden="true" style={{color:'#ff004d',fontSize:'28px',paddingLeft:'350px'}}></i>
              </div>
              <div className='item-content-ellipsis-popup' style={{borderBottom:'0px',background:"rgb(250, 237, 215)"}}>
                <div className='item-link-ellipsis-popup'>
                  <div className='item-link-ellipsis-popup-img'>
                    <img src={img3} style={{width:'100px',height:'100px'}}></img>
                  </div>
                  <div className='item-link-ellipsis-popup-inf' >
                    <h5 style={{fontSize:16}}>Quangzzz222/project-reactjs-chatwave</h5>
                    <h5 style={{color:'#ff004d',fontSize:16}}>github.com</h5>
                  </div>
                </div>
              </div>
              <div className='item-content-ellipsis-popup' style={{background:"rgb(250, 237, 215)"}}>
                <div className='item-link-ellipsis-popup'>
                  <div className='item-link-ellipsis-popup-img'>
                    <img src={img3} style={{width:'100px',height:'100px'}}></img>
                  </div>
                  <div className='item-link-ellipsis-popup-inf' >
                    <h5 style={{fontSize:16}}>Quangzzz222/project-reactjs-chatwave</h5>
                    <h5 style={{color:'#ff004d',fontSize:16}}>github.com</h5>
                  </div>
                </div>
              </div>
              <div className='item-content-ellipsis-popup'>
                <h3 style={{margin:'0px', fontSize:20, fontWeight:600}}> Bảo mật</h3>
              </div>
              <div className='item-content-ellipsis-popup' style={{borderBottom:'0px'}}>
                <div className='security-ellipsis-popup'>
                  <div className='security-ellipsis-popup-img'>
                  <ClockCircleOutlined style={{fontSize:'30px'}}/>

                  </div>
                  <div className='security-ellipsis-popup-inf d-flex d-flex justify-content-between'>
                    <div>
                      <h5 style={{margin:'0px', fontSize:16}}>Tự động xóa tin nhắn</h5>
  
                      <h6 style={{color:'orange',fontSize:16}}>5 phút</h6>
                    </div>
                    <Switch defaultChecked style={{ marginLeft: '10px', float:'right' }} />
                  </div>
                </div>
                
              </div>
              <div className='item-content-ellipsis-popup'>
                <div className='security-ellipsis-popup'>
                  <div className='security-ellipsis-popup-img'>
                  <i class='fa fa-trash' style={{fontSize:'30px'}}></i>

                  </div>
                  <div className='security-ellipsis-popup-inf' >
                    <h5 style={{padding:'5px',fontSize:16}}>Xóa lịch sử trò chuyện</h5>
                  </div>
                </div>
              </div>
              <div className='item-content-ellipsis-popup'>
                <h3 style={{margin:'0px',fontSize:16, fontWeight:600}}>Dịch thuật</h3>
              </div>
              <div className='item-content-ellipsis-popup' style={{border:'0px'}}>
              <i class='fa fa-cc' style={{fontSize:'30px'}}></i>
              <h5 style={{paddingTop:'10px',fontSize:16}}> Phụ đề</h5>
              <div style={{backgroundColor:'rgb(250, 237, 215)',textAlign:'center',borderRadius:'10px'}}>
                <h6 style={{margin:'0px',color:'orange',width:'70px'}}>English</h6>
              </div>
              <Switch defaultChecked style={{ marginLeft: '10px' }} />

              </div>
              <div className='item-content-ellipsis-popup'>
              <i class='fa fa-language' style={{fontSize:'40px'}}></i>
              <h5 style={{paddingTop:'10px',paddingLeft:'10px'}}> Dịch tin nhắn</h5>
              
              <Switch defaultChecked style={{ marginLeft: '32px' }} />

              </div>
            </div>
                {/* Nội dung chi tiết của hình ảnh và video */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatFriendsComponent;