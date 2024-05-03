import Modal from "react-modal";
import React, { useRef, useState, useEffect } from "react";
import axios from 'axios'
import DaumPostCode from 'react-daum-postcode';


const RegisterPage = (props) =>{
    const [popup, setPopup] = useState(false);

    // 회원 타입이 일반회원인지, 강사인지 확인 (true 일반, false 강사)
    const [userTypeSelected, setUserTypeSelected] = useState('A');
    const [isRegisterButton, setIsRegisterButton] = useState(false);

    // 입력양식
    const [action, setAction] = useState('I');
    const [checkedEmail, setCheckedEmail] = useState(0);
    const [checkedId, setCheckedId] = useState(0);
    const [id, setId] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');
    const [name, setName] = useState('');
    const [gender, setGender] = useState('');
    const [birthday1, setBirthday1] = useState('');
    const [birthday2, setBirthday2] = useState('');
    const [tel, setTel] = useState('');
    const [email, setEmail] = useState('');
    const [postcode, setPostcode] = useState('');
    const [addr, setAddr] = useState('');
    const [addrDtl, setAddrDtl] = useState('');

    // 참조 영역 (focus)
    const inputIdRef = useRef('');
    const inputPwd1Ref = useRef('');
    const inputPwd2Ref = useRef('');
    const inputNameRef = useRef('');
    const inputGenderRef = useRef('');
    const inputBirthday1Ref = useRef('');
    const inputBirthday2Ref = useRef('');
    const inputTelRef = useRef('');
    const inputEmailRef = useRef('');
    const inputPostcodeRef = useRef('');
    const inputAddrRef = useRef('');
    const inputAddrDtlRef = useRef('');


    
    const [debouncedTel, setDebouncedTel] = useState('');
    
    // 입력이 멈춘 후 일정 시간이 지난 후에 debouncedTel 업데이트
    useEffect(() => {
        const timerId = setTimeout(() => {
            setDebouncedTel(tel);
        }, 1000); // 500ms 후에 검증 수행
        
        return () => {
            clearTimeout(timerId);
        };
    }, [tel]);
    
    // 입력이 멈춘 후 debouncedTel을 기반으로 검증 수행
    useEffect(() => {
        if (debouncedTel !== '') {
            if (!validatePhoneNumber(debouncedTel)) {
                alert("올바른 전화번호를 입력해주세요. 숫자만 입력");
                return;
            }
            
            const formattedPhoneNumber = formatPhoneNumber(debouncedTel);
            setTel(formattedPhoneNumber);
        }
    }, [debouncedTel]);
    

    // 회원가입 정보 입력유무 validation
    const registerVal = () => {

        if(id.length < 1){
            alert("아이디를 입력하세요.")
            inputIdRef.current.focus();            
            return false;
        }
        
        if(password1.length < 1){
            alert("비밀번호를 입력하세요.")
            inputPwd1Ref.current.focus();            
            return false;
        }
        
        if(password2.length < 1){
            alert("비밀번호 확인을 입력하세요.")
            inputPwd2Ref.current.focus();
            return false;
        }
        
        if(password1 != password2){
            alert("비밀번호가 맞지 않습니다.")
            inputPwd2Ref.current.focus();
            return false;
        }
        
        if(name.length < 1){
            alert("이름을 입력하세요.")
            inputNameRef.current.focus();
            return false;
        }
        
        if(email.length < 1){
            alert("이메일을 입력하세요.")
            inputEmailRef.current.focus();
            return false;
        }
        
        if(postcode.length < 1){
            alert("우편번호를 입력하세요.")
            inputPostcodeRef.current.focus();
            return false;
        }
        
        if(addr.length < 1){
            alert("주소를 입력하세요.")
            inputAddrRef.current.focus();
            return false;
        }
        
        if(tel.length < 1){
            alert("전화번호를 입력하세요.")
            inputTelRef.current.focus();
            return false;
        }
        
        if(gender === null || gender === ""){
            alert("성별을 선택해주세요.")
            inputGenderRef.current.focus();
            return false;
        }

        return true;
    };
    /*loginID 중복체크*/
    const loginIdCheck = async () => {
        let idRules =  /^[a-z0-9]{6,20}$/g ;
        let params = new URLSearchParams()
        params.append('loginID', id);


        await axios
        .post('/check_loginID.do', params)
        .then((response) => {
            const data = response.data;
            //alert(JSON.stringify(data)+" data check");
            console.log('loginIdCheck res', response);
            
            if(id==""){
                console.log("입력 아이디 없음");
                alert("아이디를 입력해주세요.")
                inputIdRef.current.focus();
                setCheckedId(0);
                //$("#ckIdcheckreg").val("0");
            }
            else if (data===1){
                console.log("아이디 있음");
                alert("중복된 아이디가 존재합니다.")
                //inputIdRef.current.focus();
                console.log(data);
                setCheckedId(0);
                //$("#ckIdcheckreg").val("0");
            } else if(!idRules.test(id)){
                alert('아이디는 숫자,영문자 조합으로 6~20자리를 사용해야 합니다.')
                inputIdRef.current.focus();
                setCheckedId(0);
                //$("#ckIdcheckreg").val("0");
                return false;
            } else if(data == 0){
                console.log("아이디 없음");
                alert("사용할 수 있는 아이디 입니다.");
                setCheckedId(1);
                //$("#ckIdcheckreg").val("1");
            }
        
        })
        .catch((err) => {
            console.log('loginIdCheck catch start')
            alert(err.message)
        })
    };

    /*회원가입 버튼 아이디 중복 체크*/
    const loginIdCheckComplete = async () => {

        let idRules =  /^[a-z0-9]{6,20}$/g ;
        let params = new URLSearchParams()
        params.append('loginID', id);


        await axios
        .post('/check_loginID.do', params)
        .then((response) => {
            const data = response.data;
            //alert(JSON.stringify(data)+" data check");
            console.log('loginIdCheck res', response);
            
            if (data===1){
                console.log("아이디 있음");
                alert("중복된 아이디가 존재합니다.")
                inputIdRef.current.focus();
                console.log(data);
                setCheckedId(0);
                //$("#ckIdcheckreg").val("0");
            } else if(!idRules.test(id)){
                alert('아이디는 숫자,영문자 조합으로 6~20자리를 사용해야 합니다.')
                inputIdRef.current.focus();
                setCheckedId(0);
                //$("#ckIdcheckreg").val("0");
                return false;
            } 
        
        })
        .catch((err) => {
            console.log('loginIdCheck catch start')
            alert(err.message)
        })

    };
    const emailCheck = async () => {
        let params = new URLSearchParams()
        params.append('user_email', email);

        await axios
        .post('/check_email.do', params)
        .then((response) => {
            const data = response.data;
            //alert(JSON.stringify(data)+" data check");
            console.log('emailCheck res', response);
            
            if(data > 0){
                setCheckedEmail(0)
                //$("#ckEmailcheckreg").val(0);
            } else {
                setCheckedEmail(1)
                //$("#ckEmailcheckreg").val(1);
            }

        
        })
        .catch((err) => {
            console.log('emailCheck catch start')
            alert(err.message)
        })
    };

    // 전화번호 유효성 검사 함수
    const validatePhoneNumber = (phoneNumber) => {
        const cleanedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");
        const prefix = cleanedPhoneNumber.substring(0, 3);
        
        // 허용된 번호인지 확인
        if (!["010", "019", "011", "016", "017"].includes(prefix)) {
            return false;
        }
        
        // 길이 검사
        if (cleanedPhoneNumber.length < 10 || cleanedPhoneNumber.length > 13) {
            return false;
        }
        
        return true;
    }

    // 전화번호 형식 지정 함수
    const formatPhoneNumber = (phoneNumber) => {
        let formattedPhoneNumber = phoneNumber.replace(/[^0-9]/g, "");

        if (formattedPhoneNumber.length >= 3 && formattedPhoneNumber.length <= 7) {
            formattedPhoneNumber = formattedPhoneNumber.replace(/(\d{3})(\d{1,4})/, "$1-$2");
        } else if (formattedPhoneNumber.length >= 8) {
            formattedPhoneNumber = formattedPhoneNumber.replace(/(\d{3})(\d{3,4})(\d{0,4})/, "$1-$2-$3");
        }

        return formattedPhoneNumber.substring(0, 13); // 13자리까지만 유효
    }


    const handlePhoneNumberChange = (e) => {
        setTel(e.target.value);
    }


    // 주민번호 유효성
    const regnumCheck = () => {
        var genderCd = gender;

        var genderNumber = birthday2.charAt(0); 
        if ((genderNumber === "1" || genderNumber === "3") && genderCd !== "M") {
            alert("성별이 일치하지 않습니다.");
            return false;
        } else if ((genderNumber === "2" || genderNumber === "4") && genderCd !== "F") {
            alert("성별이 일치하지 않습니다.");
            return false;
        }
        
        var prefix = parseInt(birthday1.substring(0, 2), 10);
        var year = (prefix < 22 ? 2000 : 1900) + prefix;  // 22 이전은 2000년대, 그렇지 않으면 1900년대
        var month = parseInt(birthday1.substring(2, 4), 10) - 1;  // JavaScript의 월은 0부터 시작합니다.
        var day = parseInt(birthday1.substring(4, 6), 10);

        var date = new Date(year, month, day);
        if (date.getFullYear() !== year || date.getMonth() !== month || date.getDate() !== day) {
            alert("생년월일이 유효하지 않습니다.");
            return false;
        }

        // 두 번째 부분 (일련번호) 검사
        return true;
    }

    /* 회원가입  완료*/
    const completeRegister = async()  =>{
        
        //var param = $("#RegisterForm").serialize();
        /*패스워드 정규식*/
        const passwordRules = /^.*(?=^.{8,15}$)(?=.*\d)(?=.*[a-zA-Z])(?=.*[!@#$%^&+=]).*$/;

        /*이메일 정규식*/
        var emailRules = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;

        
        /* validation 체크 */
        if(!registerVal()){
            return;
        }
        
        console.log("vaildation 체크까지 완료");
        if(checkedId === 0){
            loginIdCheckComplete();	// 아이디 중복 체크 
        }
        if(checkedEmail === 0){
            emailCheck(); // 이메일 중복 체크 -- 기능 제대로 안돌아감
        }
        console.log("이메일 중복 체크까지 완료");

        if(!regnumCheck()){
            return inputBirthday2Ref.current.focus();
        }; // 주민등록번호 체크
        console.log("주민등록번호 체크까지 완료");
        
        
        if (checkedId === "0"){
            alert("아이디 중복확인을 진행해주세요.")
            inputIdRef.current.focus();
            console.log("아이디 중복 확인 진행");
            
        } else if(!passwordRules.test(password1)){
            alert('비밀 번호는 숫자,영문자,특수문자 조합으로 8~15자리를 사용해야 합니다.')
            inputPwd1Ref.current.focus();
            console.log("비번 확인 진행");
        } else if(!emailRules.test(email)){
            alert("이메일 형식을 확인해주세요.")
            inputEmailRef.current.focus();
            console.log("이메일 형식 확인 진행");
        } else if(checkedEmail ==="0"){
            alert("중복된 이메일이 존재합니다. 다시 입력해주세요.")
            inputEmailRef.current.focus();
            console.log("중복 이메일 확인 진행");
        } else{
            console.log("resultCallback 시작합니다.");
            
            
        
        let params = new URLSearchParams()
        params.append('action', action);
        params.append('loginID', id);
        params.append('user_type', userTypeSelected);
        params.append('name', name);
        params.append('password', password1);
        params.append('tel', tel);
        params.append('gender_cd', gender);
        params.append('user_email', email);
        params.append('user_zipcode', postcode);
        params.append('user_address', addr);
        params.append('user_dt_address', addrDtl);
        params.append('birthday1', birthday1);
        params.append('birthday2', birthday2);
        

        await axios
        .post('/register.do', params)
        .then((response) => {
            const data = response.data;
            //alert(JSON.stringify(data)+" data check");
            console.log('Register res', response);
            
            if (data.result === "SUCCESS") {
                alert(data.resultMsg);
                closeRegisterModal()
            } else {
                alert(data.resultMsg);
                return false;
            }
        
        })
        .catch((err) => {
            console.log('Register catch start')
            alert(err.message)
        })
        }

    }

    
    const handleComplete = (data) => {
        //alert(JSON.stringify(data));
        //console.log(JSON.stringify(data));
        
        setPostcode(data.zonecode);
        setAddr(data.address);
        setPopup(false)
    }

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

    const popUpStyle = {
        content: {
            width: "600px",
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
                <span>회원가입</span>
            </p>
            <p className="typeButtonArea">
                <button 
                    className={userTypeSelected ==='A' ? "btn btn-primary" : "btn btn-light"} 
                    onClick={()=> setUserTypeSelected('A')}>
                    일반회원
                </button> 
                <button 
                    className={userTypeSelected ==='E' ? "btn btn-primary" : "btn btn-light"} 
                    onClick={()=> setUserTypeSelected('E')}>
                        강사회원
                </button>
            </p>
            <table style={{  height: "450px" }}>
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
                            style={{ width: '250px'}}
                            onChange={(e) => setId(e.target.value)}
                            ref={inputIdRef}
                        />
                        &nbsp;&nbsp;
                        <button className="btn btn-secondary" onClick={loginIdCheck}>중복확인</button>
                    </td>
                </tr>
                <tr>
                    <th>
                        비밀번호 <span className="font_red">*</span>
                    </th>
                    <td>
                    <input
                        type="password"
                        className="form-control input-sm"
                        placeholder="숫자, 영문자, 특수문자 조합으로 8~15자리"
                        style={{ width: '250px'}}
                        onChange={(e) => setPassword1(e.target.value)}
                        ref={inputPwd1Ref}
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
                        placeholder="비밀번호 확인"
                        style={{ width: '250px'}}
                        onChange={(e) => setPassword2(e.target.value)}
                        ref={inputPwd2Ref}
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
                            style={{ width: '250px'}}
                            onChange={(e) => setName(e.target.value)}
                            ref={inputNameRef}
                        />
                    </td>
                    
                </tr>
                <tr>
                    <th>
                        성별 <span className="font_red">*</span>
                    </th>
                    <td >
                        <select 
                            name="gender_cd" 
                            id="gender_cd" 
                            style={{ border: '1px solid #ccc',  height: '28px',borderRadius : '3px'}} 
                            onChange={(e) => setGender(e.target.value)}
                            ref={inputGenderRef}
                        >
                            <option value="" selected="selected">선택</option>
                            <option value="M">남자</option>
                            <option value="F">여자</option>
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
                            onChange={(e) => setBirthday1(e.target.value)}
                            ref={inputBirthday1Ref}
                        />
                        &nbsp;-&nbsp;
                        <input
                            type="text"
                            className="form-control input-sm"
                            style={{ width: "150px" }}
                            onChange={(e) => setBirthday2(e.target.value)}
                            ref={inputBirthday2Ref}
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
                            style={{ width: '315px'}}
                            value={tel}
                            onInput={handlePhoneNumberChange}

                            
                            ref={inputTelRef}
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
                        style={{ width: '315px'}}
                        onChange={(e) => setEmail(e.target.value)}
                        ref={inputEmailRef}
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
                            style={{width:'250px'}}
                            value={postcode}
                            readOnly
                            onChange={(e) => setPostcode(e.target.value)}
                            ref={inputPostcodeRef}
                        />
                        &nbsp;
                        
                        <button className="btn btn-secondary" onClick={() => setPopup(true)}>우편번호 찾기</button>
                    </td>
                </tr>

                <tr>
                    <th>
                    주소 <span className="font_red">*</span>
                    </th>
                    <td >
                    <input
                        type="text"
                        className="form-control input-sm"
                        value={addr}
                        readOnly
                        onChange={(e) => setAddr(e.target.value)}
                        ref={inputAddrRef}
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
                            value={addrDtl}           
                            onChange={(e) => setAddrDtl(e.target.value)}
                            ref={inputAddrDtlRef}
                        />
                    </td>
                </tr>
                </tbody>
            </table>
            <div className="modal-button pt-20" style={{ display: "flex", justifyContent:'center', marginTop: '20px'}}>
                <button className="btn btn-primary" onClick={completeRegister}>
                    회원가입 완료
                </button>
                &nbsp;
                <button className="btn btn-light" onClick={closeRegisterModal} >
                    취소
                </button>
            </div>
            
            </div>
        </Modal>
        <Modal isOpen={popup} style={popUpStyle} >
            <DaumPostCode onComplete={handleComplete}  autoClose className="post-code" />
        </Modal>
        
        </>);
    };

export default RegisterPage;