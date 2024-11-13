import React from "react";
import "./TrendComponent.scss";
import { styled } from "styled-components";
const TrendComponent = () => {
  return (
    <div style={{ padding: 20 }}>
      <div className="trend-list d-flex justify-content-between ">
        <div className="trend-list-item">
          <p>
            <span>1</span> Nghệ thuật
          </p>
          <img src="https://cdn.tuoitre.vn/2022/6/12/photo-1-1655021957135238215435.jpg" />
        </div>
        <div
          style={{ backgroundColor: "rgb(40, 38, 166)" }}
          className="trend-list-item"
        >
          <p>
            <span style={{ backgroundColor: "rgb(145, 143, 255)" }}>2</span> Vũ
            hội quái vật
          </p>
          <img src="https://media.ngoisao.vn/resize_580/news/2016/10/11/ac-quy-4-ngoisao.vn.jpg" />
        </div>
        <div
          style={{ backgroundColor: "rgb(166, 38, 144)" }}
          className="trend-list-item"
        >
          <p>
            <span style={{ backgroundColor: "rgb(247, 69, 218)" }}>3</span>{" "}
            Chuyển giới nam
          </p>
          <img src="https://cdn.tuoitre.vn/2022/6/12/photo-1-1655021957135238215435.jpg" />
        </div>
        <div
          style={{ backgroundColor: "rgb(32, 94, 17)" }}
          className="trend-list-item"
        >
          <p>
            <span style={{ backgroundColor: "rgb(13, 232, 9)" }}>4</span> bg3
          </p>
          <img src="https://cdn.tuoitre.vn/2022/6/12/photo-1-1655021957135238215435.jpg" />
        </div>
        <div
          style={{ backgroundColor: "rgb(0, 105, 150)" }}
          className="trend-list-item"
        >
          <p>
            <span style={{ backgroundColor: "rgb(13, 182, 255)" }}>5</span>{" "}
            Người nhân tạo
          </p>
          <img src="https://image.nhandan.vn/1200x630/Uploaded/2024/athlrainagbna/2023_03_08/tri-tue-nhan-tao-ai-2-3436.jpg.webp" />
        </div>
        {/* <div style={{backgroundColor:'rgb(148, 82, 191)'}} className='trend-list-item'>
                <p><span style={{backgroundColor:'rgb(148, 12, 121)'}}>6</span> Người đẹp và...</p>
                <img src='https://file1.dangcongsan.vn/data/0/images/2021/03/31/havtcd/2020050501213468.jpg'/>
            </div> */}
      </div>

      <div className="channel py-4">
        <div
          className="channel-item"
          style={{ backgroundColor: "rgb(247, 235, 239)" }}
        >
          <div className="d-flex channel-info justify-content-between">
            <div className="d-flex">
              <img
                style={{
                  borderRadius: "50%",
                  width: 55,
                  height: 55,
                  marginRight: 20,
                }}
                src="https://public.bnbstatic.com/image/pgc/202402/3c152318ac7929accbeccf9de16998fb.png"
              />
              <div className="channel-info-right">
                <p style={{ color: "rgb(212, 6, 68)" }}>Tham gia</p>
                <strong style={{ fontSize: 16 }}>
                  Bitcoin | Crypto <i class="check fa-solid fa-check"></i>
                </strong>
                <p style={{ color: "rgb(148, 148, 148)" }}>
                  20k người đăng ký{" "}
                </p>
              </div>
            </div>
            <i style={{ marginTop: -30 }} class="fa-solid fa-ellipsis"></i>
          </div>
          <div className="channel-content my-3">
            <a style={{ color: "rgb(15, 110, 252)", marginBottom: 5 }}>
              https://blogtienao.com/ceo-cong-ty-daossss...
            </a>
            <img className="image-c" src="https://media.vneconomy.vn/w800/images/upload/2024/05/06/btc01.png" />
            <img  className="image-p" src="https://image.vietstock.vn/2023/12/06/bitcoin-2121112.jpg" />
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <img
                style={{
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  marginRight: 10,
                }}
                src="https://1.bp.blogspot.com/-sH-kqKo3Lv8/YC9PLp6lZgI/AAAAAAAA8Jo/pZ2GBe4s534G8ErpZaDsEesCexd4270RACLcBGAsYHQ/s0/Avatar-buon-Anime%2B%25283%2529.jpg"
              />
              <div className="channel-cpn-right">
                <strong>
                  Jone Sero{" "}
                  <i
                    style={{ color: "rgb(91, 186, 60)" }}
                    class="fa-solid fa-star"
                  ></i>
                </strong>
                <p>
                  <i class="fa-regular fa-comments"></i>
                </p>
              </div>
            </div>
            <p style={{ color: "rgb(130, 130, 130)", fontWeight: 500 }}>
              20/3/2024
            </p>
          </div>
          <div className="d-flex justify-content-between Trendcomment">
            <div className="d-flex justify-content-between Trendcomment-left">
              <i
                style={{ color: "rgb(24, 123, 237)" }}
                class="fa-solid fa-comment"
              ></i>
              <p style={{ color: "rgb(130, 130, 130)" }}>1k2 bình luận</p>
            </div>
            <div className="d-flex Trendcomment-right">
              <img src="https://i.pinimg.com/originals/22/15/cc/2215cc3bbb8ff764128e3bbf9d49d4e1.png" />
              <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-21.jpg" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAGK5MzjqsFq8fcW-b0tIg2I-J-2XoWChZcw&s" />
              ...
              <i style={{ marginLeft: 10 }} class="fa-solid fa-angle-right"></i>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center pt-2">
            <div style={{ color: "rgb(130, 130, 130)" }}>
              <i
                style={{ marginRight: 5, color: "black" }}
                class="fa-regular fa-eye"
              ></i>
              1M9
            </div>
            <div className="d-flex align-items-center">
              <i
                style={{ color: "rgb(0, 156, 34)" }}
                class="fa-solid fa-share"
              ></i>
              <i
                style={{ padding: "0 5px", color: "rgb(247, 20, 88)" }}
                class="fa-solid fa-heart"
              ></i>
              <p style={{ margin: 0 }}>&#128558;</p>
            </div>
          </div>
        </div>
        <div
          className="channel-item"
          style={{ backgroundColor: "rgb(247, 235, 239)"}}
        >
          <div className="d-flex channel-info justify-content-between">
            <div className="d-flex">
              <img
                style={{
                  borderRadius: "50%",
                  width: 55,
                  height: 55,
                  marginRight: 20,
                }}

                src="https://news.khangz.com/wp-content/uploads/2018/10/cong-nghe-vr-la-gi.jpg"
              />
              <div className="channel-info-right">
                <p style={{ color: "rgb(212, 6, 68)" }}>Tham gia</p>
                <strong style={{ fontSize: 16 }}>
                  Công nghệ AR<i class="check fa-solid fa-check"></i>
                </strong>
                <p style={{ color: "rgb(148, 148, 148)" }}>
                  3k người đăng ký{" "}
                </p>
              </div>
            </div>
            <i style={{ marginTop: -30 }} class="fa-solid fa-ellipsis"></i>
          </div>
          <div className="channel-content my-3">
            <a style={{ color: "rgb(15, 110, 252)", marginBottom: 5 }}>
                
            https://viettelstore.vn/tin-tuc/cong-nghe-ar-la...
            </a>
            <img className="image-c" src="https://news.khangz.com/wp-content/uploads/2018/10/cong-nghe-vr-la-gi.jpg" />
<img className="image-p" src="https://cdn.viettelstore.vn/Images/Product/ProductArchive/348/----/045/cong-nghe-ar-la-gi%20(1).jpg"/>
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <img
                style={{
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  marginRight: 10,
                }}
                src="https://cdn.viettelstore.vn/Images/Product/ProductArchive/348/----/045/cong-nghe-ar-la-gi%20(1).jpg"
              />
              <div className="channel-cpn-right">
                <strong>
                  Hùng Trần{" "}
                  <i
                    style={{ color: "rgb(91, 186, 60)" }}
                    class="fa-solid fa-star"
                  ></i>
                </strong>
                <p>
                  <i class="fa-regular fa-comments"></i>
                </p>
              </div>
            </div>
            <p style={{ color: "rgb(130, 130, 130)", fontWeight: 500 }}>
              20/3/2024
            </p>
          </div>
          <div className="d-flex justify-content-between Trendcomment">
            <div className="d-flex justify-content-between Trendcomment-left">
              <i
                style={{ color: "rgb(24, 123, 237)" }}
                class="fa-solid fa-comment"
              ></i>
              <p style={{ color: "rgb(130, 130, 130)" }}>1k2 bình luận</p>
            </div>
            <div className="d-flex Trendcomment-right">
              <img src="https://i.pinimg.com/originals/22/15/cc/2215cc3bbb8ff764128e3bbf9d49d4e1.png" />
              <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-21.jpg" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAGK5MzjqsFq8fcW-b0tIg2I-J-2XoWChZcw&s" />
              ...
              <i style={{ marginLeft: 10 }} class="fa-solid fa-angle-right"></i>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center pt-2">
            <div style={{ color: "rgb(130, 130, 130)" }}>
              <i
                style={{ marginRight: 5, color: "black" }}
                class="fa-regular fa-eye"
              ></i>
              1M9
            </div>
            <div className="d-flex align-items-center">
              <i
                style={{ color: "rgb(0, 156, 34)" }}
                class="fa-solid fa-share"
              ></i>
              <i
                style={{ padding: "0 5px", color: "rgb(247, 20, 88)" }}
                class="fa-solid fa-heart"
              ></i>
              <p style={{ margin: 0 }}>&#128558;</p>
            </div>
          </div>
        </div>
        <div
          className="channel-item"
          style={{ backgroundColor: "rgb(247, 235, 239)" }}
        >
          <div className="d-flex channel-info justify-content-between">
            <div className="d-flex">
              <img
                style={{
                  borderRadius: "50%",
                  width: 55,
                  height: 55,
                  marginRight: 20,
                }}
                src="https://public.bnbstatic.com/image/pgc/202402/3c152318ac7929accbeccf9de16998fb.png"
              />
              <div className="channel-info-right">
                <p style={{ color: "rgb(212, 6, 68)" }}>Tham gia</p>
                <strong style={{ fontSize: 16 }}>
                  Bitcoin | Crypto <i class="check fa-solid fa-check"></i>
                </strong>
                <p style={{ color: "rgb(148, 148, 148)" }}>
                  20k người đăng ký{" "}
                </p>
              </div>
            </div>
            <i style={{ marginTop: -30 }} class="fa-solid fa-ellipsis"></i>
          </div>
          <div className="channel-content my-3">
            <a style={{ color: "rgb(15, 110, 252)", marginBottom: 5 }}>
              https://blogtienao.com/ceo-cong-ty-daossss...
            </a>
            <img src="https://media.vneconomy.vn/w800/images/upload/2024/05/06/btc01.png" />
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <img
                style={{
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  marginRight: 10,
                }}
                src="https://1.bp.blogspot.com/-sH-kqKo3Lv8/YC9PLp6lZgI/AAAAAAAA8Jo/pZ2GBe4s534G8ErpZaDsEesCexd4270RACLcBGAsYHQ/s0/Avatar-buon-Anime%2B%25283%2529.jpg"
              />
              <div className="channel-cpn-right">
                <strong>
                  Jone Sero{" "}
                  <i
                    style={{ color: "rgb(91, 186, 60)" }}
                    class="fa-solid fa-star"
                  ></i>
                </strong>
                <p>
                  <i class="fa-regular fa-comments"></i>
                </p>
              </div>
            </div>
            <p style={{ color: "rgb(130, 130, 130)", fontWeight: 500 }}>
              20/3/2024
            </p>
          </div>
          <div className="d-flex justify-content-between Trendcomment">
            <div className="d-flex justify-content-between Trendcomment-left">
              <i
                style={{ color: "rgb(24, 123, 237)" }}
                class="fa-solid fa-comment"
              ></i>
              <p style={{ color: "rgb(130, 130, 130)" }}>1k2 bình luận</p>
            </div>
            <div className="d-flex Trendcomment-right">
              <img src="https://i.pinimg.com/originals/22/15/cc/2215cc3bbb8ff764128e3bbf9d49d4e1.png" />
              <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-21.jpg" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAGK5MzjqsFq8fcW-b0tIg2I-J-2XoWChZcw&s" />
              ...
              <i style={{ marginLeft: 10 }} class="fa-solid fa-angle-right"></i>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center pt-2">
            <div style={{ color: "rgb(130, 130, 130)" }}>
              <i
                style={{ marginRight: 5, color: "black" }}
                class="fa-regular fa-eye"
              ></i>
              1M9
            </div>
            <div className="d-flex align-items-center">
              <i
                style={{ color: "rgb(0, 156, 34)" }}
                class="fa-solid fa-share"
              ></i>
              <i
                style={{ padding: "0 5px", color: "rgb(247, 20, 88)" }}
                class="fa-solid fa-heart"
              ></i>
              <p style={{ margin: 0 }}>&#128558;</p>
            </div>
          </div>
        </div>
        <div
          className="channel-item"
          style={{ backgroundColor: "rgb(247, 235, 239)"}}
        >
          <div className="d-flex channel-info justify-content-between">
            <div className="d-flex">
              <img
                style={{
                  borderRadius: "50%",
                  width: 55,
                  height: 55,
                  marginRight: 20,
                }}

                src="https://news.khangz.com/wp-content/uploads/2018/10/cong-nghe-vr-la-gi.jpg"
              />
              <div className="channel-info-right">
                <p style={{ color: "rgb(212, 6, 68)" }}>Tham gia</p>
                <strong style={{ fontSize: 16 }}>
                  Công nghệ AR<i class="check fa-solid fa-check"></i>
                </strong>
                <p style={{ color: "rgb(148, 148, 148)" }}>
                  3k người đăng ký{" "}
                </p>
              </div>
            </div>
            <i style={{ marginTop: -30 }} class="fa-solid fa-ellipsis"></i>
          </div>
          <div className="channel-content my-3">
            <a style={{ color: "rgb(15, 110, 252)", marginBottom: 5 }}>
                
            https://viettelstore.vn/tin-tuc/cong-nghe-ar-la-g...
            </a>
            <img src="https://news.khangz.com/wp-content/uploads/2018/10/cong-nghe-vr-la-gi.jpg" />
          </div>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <img
                style={{
                  borderRadius: "50%",
                  width: 30,
                  height: 30,
                  marginRight: 10,
                }}
                src="https://cdn.viettelstore.vn/Images/Product/ProductArchive/348/----/045/cong-nghe-ar-la-gi%20(1).jpg"
              />
              <div className="channel-cpn-right">
                <strong>
                  Hùng Trần{" "}
                  <i
                    style={{ color: "rgb(91, 186, 60)" }}
                    class="fa-solid fa-star"
                  ></i>
                </strong>
                <p>
                  <i class="fa-regular fa-comments"></i>
                </p>
              </div>
            </div>
            <p style={{ color: "rgb(130, 130, 130)", fontWeight: 500 }}>
              20/3/2024
            </p>
          </div>
          <div className="d-flex justify-content-between Trendcomment">
            <div className="d-flex justify-content-between Trendcomment-left">
              <i
                style={{ color: "rgb(24, 123, 237)" }}
                class="fa-solid fa-comment"
              ></i>
              <p style={{ color: "rgb(130, 130, 130)" }}>1k2 bình luận</p>
            </div>
            <div className="d-flex Trendcomment-right">
              <img src="https://i.pinimg.com/originals/22/15/cc/2215cc3bbb8ff764128e3bbf9d49d4e1.png" />
              <img src="https://cellphones.com.vn/sforum/wp-content/uploads/2024/01/avartar-anime-21.jpg" />
              <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAGK5MzjqsFq8fcW-b0tIg2I-J-2XoWChZcw&s" />
              ...
              <i style={{ marginLeft: 10 }} class="fa-solid fa-angle-right"></i>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center pt-2">
            <div style={{ color: "rgb(130, 130, 130)" }}>
              <i
                style={{ marginRight: 5, color: "black" }}
                class="fa-regular fa-eye"
              ></i>
              1M9
            </div>
            <div className="d-flex align-items-center">
              <i
                style={{ color: "rgb(0, 156, 34)" }}
                class="fa-solid fa-share"
              ></i>
              <i
                style={{ padding: "0 5px", color: "rgb(247, 20, 88)" }}
                class="fa-solid fa-heart"
              ></i>
              <p style={{ margin: 0 }}>&#128558;</p>
            </div>
          </div>
        </div>
  
      </div>
    

    </div>
  );
};

export default TrendComponent;
