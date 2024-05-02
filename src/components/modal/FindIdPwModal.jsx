import React, { useState, useRef } from "react";
import axios from 'axios'
import Modal from "react-modal";



const FindIdPw = (props) =>{
    // 아이디찾기, 비밀번호 찾기 버튼 상태 영역
    const [isFindId, setIsFindId] = useState(false);
    const [isFindPwd, setIsFindPwd] = useState(false);

    // 아이디 찾기, 비밀번호 찾기 입력 값 영역
    const [nameForId, setNameForId] = useState('');
    const [emailForId, setEmailForId] = useState('');
    const [idForPwd, setIdForPwd] = useState('');
    const [emailForPwd, setEmailForPwd] = useState('');
    const [newPassword1, setNewPassword1] = useState('');
    const [newPassword2, setNewPassword2] = useState('');

    // 아이디 찾기 Form 결과 보이는 영역
    const [isBeforeFindIdFormVisible , setIsBeforeFindIdFormVisible ] = useState(true);
    const [isAfterFindIdFormVisible , setIsAfterFindIdFormVisible ] = useState(false);
    const [foundId, setFoundId] = useState('');
    // 아이디 찾기 Form 결과 보이는 영역
    const [isBeforeFindPwdFormVisible , setIsBeforeFindPwdFormVisible ] = useState(true);
    const [isOkayUserInfoForPwd, setIsOkayUserInfoForPwd] = useState(false);    

    // 아이디 찾기, 비밀번호 유효성 검사를 위한 name, id, email ref 영역(focus)
    const inputNameForIdRef = useRef(null);
    const inputEmailForIdRef = useRef(null);
    const inputIdForPwdRef = useRef(null);
    const inputEmailForPwdRef = useRef(null);
    const inputNewPassword1Ref = useRef(null);
    const inputNewPassword2Ref = useRef(null);


    // 아이디 찾기 영역 활성화
    const selectId = () => {
        setIsFindPwd(false)
        setIsOkayUserInfoForPwd(false)
        setIsAfterFindIdFormVisible(false)
        setIsBeforeFindIdFormVisible(true)
        setIsFindId(true)
    };
    // 비밀번호 찾기 영역 활성화
    const selectPwd = () => {
        setIsFindId(false)
        setIsOkayUserInfoForPwd(false)
        setIsBeforeFindPwdFormVisible(true)
        setIsFindPwd(true)
    };

    // 아이디 찾기
    const findId = async () => {
        // 유효성
        if(nameForId===null || nameForId ===""){
            alert("이름을 입력하세요.");
            inputNameForIdRef.current.focus();
            return;
        }
        // 이메일 유효성 check
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(emailForId)) {
            alert("올바른 형식의 이메일을 입력하세요.");
            inputEmailForIdRef.current.focus();
            
        } 

        let params = new URLSearchParams()
        params.append('name', nameForId);
        params.append('mail', emailForId);
        

        await axios
        .post('/selectFindInfoId.do', params)
        .then((response) => {
            const data = response.data;
            //alert(JSON.stringify(data)+" data check");
            console.log('findId res', response);
            

            if(data.result==="SUCCESS"){
                setIsBeforeFindIdFormVisible(false);
                setFoundId(data.id);                
                setIsAfterFindIdFormVisible(true);
            } else {
                alert("일치하는 정보가 존재하지 않습니다.");
                inputNameForIdRef.current.focus();
            }

        })
        .catch((err) => {
            console.log('findId catch start')
            alert(err.message)
        })
    };

    // 비밀번호 찾기를 위한 유저 확인
    const checkUserInfoForPwd = async () => {
        if(idForPwd===null || idForPwd ===""){
            alert("아이디를 입력하세요.");
            inputIdForPwdRef.current.focus();
            //$("#regiId").focus();
            return;
        }
    
        if(emailForPwd===null || emailForPwd ==="" || emailForPwd === "null"){
            alert("이메일을 입력하세요.");
            return;
        }
        
        // 이메일 유효성 check
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!regex.test(emailForPwd)) {
            alert("올바른 형식의 이메일을 입력하세요.");
            inputEmailForPwdRef.current.focus();
        } 


        let params = new URLSearchParams()
        params.append('id', idForPwd);
        params.append('mail', emailForPwd);        

        await axios
        .post('/selectFindInfoPw.do', params)
        .then((response) => {
            const data = response.data;
            
            //alert(JSON.stringify(data)+" data check");
            console.log('findPW res', response);
            
            if(data.result==="SUCCESS"){
                setIsBeforeFindPwdFormVisible(false);
                setIsOkayUserInfoForPwd(true);
            } else {
                alert("일치하는 정보가 존재하지 않습니다.");
                setIsOkayUserInfoForPwd(false);
                setIsBeforeFindPwdFormVisible(true);
                //inputIdForPwdRef.current.focus();
            }

        })
        .catch((err) => {
            console.log('findPW catch start')
            alert(err.message)
        })
    };

    const changePassword = async () => {
        // 유효성
        if(newPassword2!==newPassword1){
            alert("비밀번호가 일치하지 않습니다.");
            inputNewPassword2Ref.current.focus();
            return;
        }

        /*패스워드 정규식*/
        var passwordRules = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;
        if(!passwordRules.test(newPassword1)){
            alert('비밀 번호는 숫자,영문자,특수문자 조합으로 8~15자리를 사용해야 합니다.');
            inputNewPassword1Ref.current.focus();
            return;
        }

        let params = new URLSearchParams()
        params.append('id', idForPwd);
        params.append('pw', newPassword1);        

        await axios
        .post('/updateFindPw.do', params)
        .then((response) => {
            const data = response.data;
            //alert(JSON.stringify(data)+" data check");
            console.log('findPW res', response);
            

            if(data.result=="SUCCESS"){
                alert("비밀번호가 변경되었습니다.\n변경된 비밀번호로 로그인해주세요.");

                closeRegisterModal();
            } else {
                alert("비밀번호 변경이 실패하였습니다.\n지속적으로 오류가 발생한다면 관리자에게 문의해주세요.");
                selectPwd();
            }

        })
        .catch((err) => {
            console.log('ChangePW catch start')
            alert(err.message)
        })
    };

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
        <>
        <Modal
                style={modalStyle}
                isOpen={props.isOpen}
                onRequestClose={closeRegisterModal}
            >
            <div id="form">
                <p className="conTitle">
                    <span>아이디/비밀번호 찾기</span>
                </p>


                <div className="modal-button pt-20" style={{  width: "550px", display: "flex", justifyContent:'center', marginTop: '20px', marginBottom: '30px' }}>
                    <button className="btn btn-primary" onClick={selectId}>
                        아이디 찾기
                    </button>
                    &nbsp;
                    <button className="btn btn-primary"  onClick={selectPwd}>
                        비밀번호 찾기
                    </button>
                </div>
                {isFindId && (
                    <div>
                    <table className="row">
                        <caption>caption</caption>
                        <colgroup>
                            <col style={{width :"150px"}} />
                            <col style={{width : "auto"}} />
                        </colgroup>
                        <tbody id="beforeFindIdForm">
                            {isBeforeFindIdFormVisible && (
                            <>
                            <tr>
                                <th scope="row" >
                                    이름
                                </th>
                                <td>
                                    <input type="text" id="regiName" name="regiName" className="inputTxt p100"
                                    placeholder="가입하신 이름을 입력하세요"
                                    onChange={(e) => setNameForId(e.target.value)}
                                    ref={inputNameForIdRef}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th scope="row">
                                    이메일
                                </th>
                                <td>
                                    <input type="text" id="emailName" className="inputTxt p100"
                                    placeholder="가입하신 이메일을 입력하세요" size="30"
                                    onChange={(e) => setEmailForId(e.target.value)}
                                    ref={inputEmailForIdRef}
                                    /> 
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2" 
                                    style= {{ border: 'none', textAlign: 'center', backgroundColor: '#F3F3F3'}}
                                    onClick={findId}>
                                    <a href={() => false} className="btnType blue" id="findIdSubmit">
                                    <span>확인</span></a>
                                </td>
                            </tr>
                            </>)}
                            
                            {isAfterFindIdFormVisible && (
                            <tr>
                                <th style={{ textAlign:'center'}}>찾으시는 ID는: {foundId} 입니다.</th>
                            </tr>)}
                        </tbody>
                        
                    </table>
                    </div>)}
                {isFindPwd && (
                    <div>
                    <table className="row" id="findPwdForm">
                        <colgroup>
                            <col style={{width : "150px"}} />
                            <col style={{width : "auto"}} />
                        </colgroup>
						{isBeforeFindPwdFormVisible && (
                        <tbody id="beforeChangeForm">
							<tr>
								<th scope="row">
									아이디
								</th>
								<td>
									<input type="text" id="regiId" name="regiId"  className="inputTxt p100"
									placeholder="가입하신 아이디를 입력하세요"
                                    onChange={(e) => setIdForPwd(e.target.value)}
                                    ref={inputIdForPwdRef}
                                    />
								</td>
							</tr>
							<tr>
								<th scope="row">
									이메일
								</th>
								<td>
									<input type="text" id="emailPwd" className="inputTxt p100"
									placeholder="가입하신 이메일을 입력하세요" size="30"
                                    onChange={(e) => setEmailForPwd(e.target.value)}
                                    ref={inputEmailForPwdRef}
									/> 
								</td>
							</tr>
							<tr>
								<td colSpan="2" style={{border: 'none', textAlign: 'center', backgroundColor: '#F3F3F3' }}>
									<a href={() => false} className="btnType blue" id="findIdSubmit"
									onClick={() => {checkUserInfoForPwd()}}>
									<span>확인</span></a>
								</td>
							</tr>
						</tbody>
                        )}
						{isOkayUserInfoForPwd && (
                        <tbody id="afterChangeForm">
							<tr>
								<th scope="row">변경할 비밀번호</th>
								<td>
									<input type="password" id="reRegiPwd" name="reRegiPwd"  className="inputTxt p100"
									placeholder="숫자,영문자,특수문자 조합으로 8~15자리"
                                    onChange={(e) => setNewPassword1(e.target.value)}
                                    ref={inputNewPassword1Ref}
                                    />
								</td>
							</tr>
							<tr>
								<th scope="row">비밀번호 확인</th>
								<td>
									<input type="password" id="reRegiPwdCheck" name="reRegiPwdCheck" className="inputTxt p100"
                                    onChange={(e) => setNewPassword2(e.target.value)}
                                    ref={inputNewPassword2Ref}
									/> 
								</td>
							</tr>
							<tr>
								<td colSpan="2" style= {{border: 'none', textAlign: 'center', backgroundColor: '#F3F3F3' }}
                                onClick={changePassword}
                                >
									<a href={() => false} className="btnType blue" id="changePwdSubmit">
									<span>변경</span></a>
								</td>
							</tr>
						</tbody>)}
					</table>
                </div>)}
            
            </div>
        </Modal>

            
        </>
        );
    };

export default FindIdPw;