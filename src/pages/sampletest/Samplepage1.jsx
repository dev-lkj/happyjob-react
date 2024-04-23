//   /*eslint-disale */  아래 Worning 메세지 안나옴

import React, { useState, useEffect } from "react";
import SamplePage3 from "./Samplepage3";
import Selectcomponent from "./Selectcomponent";



const SamplePage2 = () => {
  const [firstTime, setFirstTime] = useState(0);
  const [secondTime, setSecondTime] = useState(0);
  const indata = 11;
  const [param1, setParam1] = useState("월요일");
  const [param2, setParam2] = useState("즐겁니");
  const [radiovalue, setRadiovalue] = useState("M");
  const [inputtest, setInputtest] = useState("test");
  let [seltest, setSeltest] = useState("1");
  let [chktest, setChktest] = useState([]);
  

  function addTime2() {
    setParam2('리액트');
    setSecondTime(secondTime + 1);
  }

  function minusTime2(){
    setParam2('재밌어');
    setSecondTime(secondTime - 1);
  }

  function resetTime2(){
    setSecondTime((prev) =>{
      alert(prev);
      return 0;
    });
  }

  const radioclick = (e) => {
    //alert(e.target.value);
    //const newval = e.target.value
    setRadiovalue(e.target.value);
  };

  const radiochange = () => {
    if (radiovalue === "M") {
      setRadiovalue("F");
    } else {
      setRadiovalue("M");
    }
  };  

  const radiovalueconf = () => {
    alert(radiovalue);
  };

  const settingChk = (e, index) => {
    let copyarr = [...chktest]; // 데이터 복사 후 새로운 저장 공간에 복사
    console.log(copyarr == chktest);

    if (e.target.checked) {
      copyarr.push(e.target.value);
    } else {
      for (let i = 0; i < copyarr.length; i++) {
        if (copyarr[i] === e.target.value) {
          console.log(index - 1); // 1(선택) -> 2(선택) -> 1(선택 해제) -> 2(선택 해제)  안됨   실제 index 0 인대 삭제 index는 1임
          copyarr.splice(i, 1);
        }
      }
    }

    chktest = [...copyarr];
    setChktest(chktest);
  };

  const componentReturn = (returnValue) => {
    alert(returnValue);
  };


  return (
    <>
      <h6>useState와 useEffect, React.Fragment, Fragment 등 훅 사용법은 별도로 샘플 설명</h6>
      <br/>
      <h6>LifeCycle 사용법, useState(Json) 형태 샘플은 별도로 샘플 설명</h6>
      <br/>
      <br/>
      <br/>
      <p>
        <a href="https://codingapple.com/unit/react-if-else-patterns-enum-switch-case/" title="if문 샘플" >if 문 샘플</a>
      </p>
      <p>
        <a href="https://codingbroker.tistory.com/123" title="Looping 문 샘플">Looping 문 샘플</a>
      </p>
      <br/><br/>
      <p>
        시간 : <span>{firstTime}</span> : <span>{secondTime}</span>
        <br/>
        <button onClick={()=>{setParam1('lkj'); setFirstTime(firstTime + 1);}}>더하기 1</button>
        <button onClick={()=> {setParam1('방가방가'); setFirstTime(firstTime -1)}}>빼기 1</button>
        <button onClick={()=> setFirstTime((prev)=>{alert(prev); return 0;})}>reset 1</button>
        <br/>
        <button onClick={addTime2}>더하기 2</button>
        <button onClick={minusTime2}>빼기 2</button>
        <button onClick={resetTime2}>reset 2</button>
      </p>
      <br/>
      <p>
        <div></div>
        <input type="text" id="inputtext1" name="inputtext1" value={indata} />
        <br/>
        inputtext1값이 reset 눌러도 변경 안됨.... useState(상태관리) 사용해야 변경 가능<br/>
        =========================== 외부 component Call ==========================================
        <SamplePage3 param1={param1} param2={param2} />
        <br/>
        <Incomponent msg="리액트" />
      </p>
      <br/>

      <div>
        =========================== Radio 테스트 ==========================================
        <br/>
        defaultChecked 빼면 값은 바뀌지만 'checked' 옵션이 안바뀜
        defaultChecked 넣으면 라디오 값이 안바뀜
        <br/>
        <p>
          <label for="male">남 : </label><input id="male" type="radio" name="gender" value="M" checked={radiovalue === "M"}onChange={radioclick} />  
          <label for="female">여</label><input id="female" type="radio" name="gender" value="F" checked={radiovalue === "F"} onChange={radioclick} />
        </p>
        <p>
          <button onClick={radiochange}>라디오값 변경</button><br/>
          <button onClick={radiovalueconf}>라디오값 확인</button>
        </p>
      </div>
      <br/>
      <p>
      =========================== Input 테스트 ==========================================<br/>
      <input
        type="text"
        id="inputtext"
        value={inputtest}
        name="inputtext"
        onChange={(e, prev) => {
          setInputtest(e.target.value);
          // undefined : 1233 : 123    alert 이후 setInputtest에 의해 randering 됨
          alert(prev + " : " + e.target.value + " : " + inputtest);
        }}
      />
      </p>
      <br/>

      <p>
        ====================== Select Test ======================= <br />
        onChange 의 setSeltest 부분을 빼면 재랜더링이 안되어 값이 안바뀜<br/>
        <select id="seltest" name="seltest" value={seltest} onChange={(e) => {setSeltest(e.target.value);}}>
          <option value="">전체</option>
          <option value="1">one</option>
          <option value="2">two</option>
          <option value="3">three</option>
        </select>
        <button onClick={() => {alert(seltest);}}>select값 확인</button>
      </p>
      <br/>

      <p>
        ====================== Check Box Test =======================
        <br />
        <label for="check1">1: </label> <input type="checkbox" id="check1" name="chktest" value="1" onChange={(e) => {settingChk(e, 1);}} />
        <br />
        <label for="check2">2: </label> <input type="checkbox" id="check2" name="chktest" value="2" onChange={(e) => { settingChk(e, 2); }} />
        <br/>
        배열 내용 : {chktest}
      </p>
      <br/>
      <p>
        ====================== Select Box Test(Loop) =======================
        <br />
        체크박스 선택한 체크박스 값이 배열로 들어가는데, 배열의 내용으로 Select Box 구성
        <br />
        <select id="selectloop" name="selectloop">
          <option key="0" value="">전체</option>
          {chktest.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
        <br />
        <br />
        {chktest.map((item, index) => (
          <p>
            {item}
            <input type="radio" id={item} name="number" value={item} />
          </p>
        ))}
        <br />
        <br />
        <Selectcomponent datalist={chktest} refunc={componentReturn} />
        
      </p>
      <br />
      <br />
      
    </>
  );
};

function Incomponent(props) {
  return (
    <div>
      <h1>{props.msg} 방가방가!!!!!!!!!!!!!!!!</h1>
      <SamplePage3 param1="나는" param2="천재" />
    </div>
  );
}


export default SamplePage2;
