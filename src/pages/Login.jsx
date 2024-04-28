import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Session from "react-session-api";
import logo_img from "../assets/images/admin/login/logo_img.png";

import Modal from "react-modal";

const Login = () => {
  
  const [isRegisterModalPop, setIsRegisterModalPop] = useState(false);
  const [isTypeSelected, setIsTypeSelected] = useState(true);
  const [isRegisterButton, setIsRegisterButton] = useState(false);


  useEffect(() => {
    console.log("Login useEffect start");
  }, []);

  const navigate = useNavigate();
  //const history = useHistory()

  const [account, setAccount] = useState({
    userId: "",
    userPw: "",
  });

  const linkTest = (e) => {
    console.log("linkTest start");
    console.log(e);
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      fLoginProc();
    }
  };

  //input에 입력될 때마다 account state값 변경되게 하는 함수
  const onChangeAccount = (e) => {
    setAccount({
      ...account,
      [e.target.name]: e.target.value,
    });
  };

  const fLoginProc = async function () {
    console.log("fLoginProc start");
    console.log(account.userId);
    console.log(account.userPw);

    // alert(Session.get("loginResult"));
    Session.set("loginResult", "F");
    Session.set("loginId", "");
    // alert(Session.get("loginResult"));

    await axios
      .post(
        "/api/loginProc.do",
        new URLSearchParams({ lgn_Id: account.userId, pwd: account.userPw })
      )
      .then((res) => {
        console.log("res start");
        console.log(res);
        const data = res.data;
        if (data.result === "SUCCESS") {
          //alert("로그인성공");
          Session.set("loginResult", "S");
          Session.set("loginId", data.loginId);
          //usrMnuAtrt 메뉴리스트
          Session.set("usrMnuAtrt", data.usrMnuAtrt);

          sessionStorage.setItem("loginInfo", JSON.stringify(data));

          sessionStorage.setItem(
            "usrMnuAtrt2",
            JSON.stringify(data.usrMnuAtrt)
          );

          const loginInfo = [
            data.loginId,
            data.userNm,
            data.userType,
            data.serverName,
          ];
          sessionStorage.setItem("loginId", data.loginId);
          sessionStorage.setItem("userNm", data.userNm);
          sessionStorage.setItem("userType", data.userType);
          sessionStorage.setItem("serverName", data.serverName);

          sessionStorage.setItem("loginInfo2", loginInfo);

          //history.push('/dashboard/home')
          navigate("/dashboard");
        } else {
          alert("ID 혹은 비밀번호가 틀립니다");
          Session.set("loginResult", "F");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const closeRegisterModal = () => {
    setIsRegisterModalPop(false);
  };

  const modalStyle = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
      transform: "translate(-50%, -50%)",
    },
  };


  return (
    <>
      <div id="background_board">
        <div className="login_form shadow">
          <div className="login-form-right-side">
            <div className="top-logo-wrap">
              <img id="login-logo" src={logo_img} />
            </div>
            <h3> 안되는 것이 실패가 아니라 포기하는 것이 실패다 </h3>
            <p>
              성공은 실패의 꼬리를 물고 온다.지금 포기한 것이 있는가 ?
              <br />
              그렇다면 다시 시작해 보자. <br />
              안되는 것이 실패가 아니라 포기하는 것이 실패다. <br />
              포기한 순간이 성공하기 5 분전이기 쉽다. <br />
              실패에서 더 많이 배운다. <br />
              실패를 반복해서 경험하면 실망하기 쉽다. <br />
              하지만 포기를 생각해선 안된다.실패는 언제나 중간역이지 종착역은
              아니다. <br />
            </p>
            <p> -이대희, ‘1 % 의 가능성을 희망으로 바꾼 사람들’ 에서 </p>
          </div>
          <div className="login-form-left-side">
            <fieldset>
              <p className="id">
                <label for="userId"> 아이디 </label>
                <input
                  id="userId"
                  type="text"
                  name="userId"
                  placeholder="아이디"
                  onChange={onChangeAccount}
                />
              </p>
              <p className="pw">
                <label for="userPw"> 비밀번호 </label>
                <input
                  id="userPw"
                  type="password"
                  name="userPw"
                  placeholder="비밀번호"
                  onChange={onChangeAccount}
                  onKeyDown={onKeyDown}
                />
              </p>
              <p className="member_info">
                <input id="saveId" type="checkbox" />
                <span className="id_save"> ID저장 </span>
              </p>
              <div>
                <a href="#none" id="RegisterBtn" name="modal" onClick={()=> {setIsRegisterModalPop(true)}}>
                  <strong> [회원가입] </strong>
                </a>
                <a href="#none">
                  <strong> [아이디 / 비밀번호 찾기] </strong>
                </a>
                {/* <a onClick={linkTest}>
                  <Link to="/left"> left </Link>
                </a> */}
              </div>
              <a href="#none" className="btn_login" id="btn_login" onClick={fLoginProc}>
                <strong> Login </strong>
              </a>
            </fieldset>
          </div>
        </div>
      </div>


      <Modal
        style={modalStyle}
        isOpen={isRegisterModalPop}
        onRequestClose={closeRegisterModal}
      >
        <div id="noticeform">
          <p className="conTitle">
            <span>회원가입</span>
          </p>
          <p className="typeButtonArea">
            <button className={isTypeSelected ? "btn btn-primary" : "btn btn-light"}>일반회원</button> <button className={!isTypeSelected ? "btn btn-primary" : "btn btn-light"}>강사회원</button>
          </p>
          <table style={{ width: "550px", height: "450px" }}>
            <tbody>
              <tr>
                <th>
                  아이디 <span className="font_red">*</span>
                </th>
                <td>
                  <input
                    type="text"
                    className="form-control input-sm"
                    placeholder="숫자, 영문자 조합으로 6~20자리"
                    
                  />
                </td>
                
                <th></th>
                <td><button className="btn btn-secondary">중복확인</button></td>
              </tr>
              <tr>
                <th>
                  비밀번호 <span className="font_red">*</span>
                </th>
                <td>
                  <input
                    type="password"
                    className="form-control input-sm"
                    style={{ width: "150px" }}
                    placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리"
                  />
                </td>
              </tr>
              <tr>
                <th>
                  비밀번호 확인<span className="font_red">*</span>
                </th>
                <td>
                  <input
                    type="password"
                    className="form-control input-sm"
                    style={{ width: "150px" }}
                    placeholder="비밀번호 확인"
                  />
                </td>
              </tr>
              <tr>
                <th>
                  이름 <span className="font_red">*</span>
                </th>
                <td>
                  <input
                    type="text"
                    className="form-control input-sm"
                    style={{ width: "100px" }}
                    
                  />
                </td>
                <th>
                  성별 <span className="font_red">*</span>
                </th>
                <td>
                  <select >
                    <option value="">선택</option>
                    <option value="남">남자</option>
                    <option value="여">여자</option>
                  </select>
                </td>
              </tr>

              <tr>
                <th>
                  주민등록번호 <span className="font_red">*</span>
                </th>
                <td>
                  <input
                    type="text"
                    className="form-control input-sm"
                    style={{ width: "150px" }}
                    
                  />
                  -
                  <input
                    type="text"
                    className="form-control input-sm"
                    style={{ width: "150px" }}
                    
                  />
                </td>
              </tr>
              
              <tr>
                <th>
                  전화번호 <span className="font_red">*</span>
                </th>
                <td >
                  <input
                    type="text"
                    className="form-control input-sm"
                    placeholder="숫자만 입력"
                    
                  />
                </td>
              </tr>

              <tr>
                <th>
                  이메일 <span className="font_red">*</span>
                </th>
                <td >
                  <input
                    type="text"
                    className="form-control input-sm"
                    
                    
                  />
                </td>
              </tr>

              <tr>
                <th>
                  우편번호 <span className="font_red">*</span>
                </th>
                <td >
                  <input
                    type="text"
                    className="form-control input-sm"
                    
                  />
                  
                  
                </td>
                <th></th>
                <td><button className="btn btn-secondary">우편번호 찾기</button></td>
              </tr>

              <tr>
                <th>
                  주소 <span className="font_red">*</span>
                </th>
                <td >
                  <input
                    type="text"
                    className="form-control input-sm"
                    
                    
                  />
                </td>
              </tr>
              <tr>
                <th>
                  상세주소
                </th>
                <td >
                  <input
                    type="text"
                    className="form-control input-sm"                    
                    
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="modal-button pt-20" style={{ display: "flex", justifyContent:'center', marginTop: '20px'}}>
            <button className="btn btn-primary">
              회원가입 완료
            </button>
            &nbsp;
            <button className="btn btn-light" onClick={closeRegisterModal} >
              취소
            </button>
          </div>
          
        </div>
      </Modal>

    </>
  );
};

export default Login;
