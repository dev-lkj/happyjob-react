import Modal from "react-modal";
import React, { useState } from "react";



const RegisterPage = (props) =>{
    const [isTypeSelected, setIsTypeSelected] = useState(true);
  const [isRegisterButton, setIsRegisterButton] = useState(false);

    const closeRegisterModal = () => {
        props.onRequestClose();
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
    return(
    <Modal
            style={modalStyle}
            
            isOpen={props.isOpen}
            onRequestClose={closeRegisterModal}
        >
            <div id="form">
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
        );
    };

export default RegisterPage;