import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../../components/common/Pagination";

import Modal from "react-modal";

const SamplePage1 = () => {
  useEffect( () => {
    searchlist()
  },[]);

  useEffect( () => {
    let today = new Date();
    let year = today.getFullYear(); // 년도
    let month = today.getMonth() + 1; // 월
    let date = today.getDate(); // 날짜

    let monthstr = "";
    let detestr = "";

    
    if(month < 10){
      monthstr = "0" + month.toString();
    } else{
      monthstr = month.toString();
    }

    if(date < 10){
      detestr = "0" + date.toString();
    } else{
      detestr = date.toString();
    }

    // setSearchstartdate(year.toString() + "-" + monthstr + "-" + detestr);
    // setSearchenddate(year.toString() + "-" + monthstr + "-" + detestr);

    // setSearchstartdate(year.toString() + "-" + monthstr + "-" + detestr);
    // setSearchenddate(year.toString() + "-" + monthstr + "-" + detestr);

  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const blocksize = 5;

  const [searchtitle, setSearchtitle] = useState("");
  const [searchstartdate, setSearchstartdate] = useState("");
  const [searchenddate, setSearchenddate] = useState("");

  const [noticelist, setNoticelist] = useState([]);
  const [totalcnt, setTotalcnt] = useState(0);

  const [isRegbtn, setIsRegbtn] = useState(false);
  const [noticedis, setNoticedis] = useState(false);

  const [selnoticeno, setSelnoticeno] = useState(0);
  const [inputtitle, setInputtitle] = useState("");
  const [inputcon, setInputcon] = useState("");
  const [action, setAction] = useState("");

  const [selfileyn, setSelfileyn] = useState(false);
  const [preview, setPreview] = useState("");
  const [disfilename, setDisfilename] = useState("");
  const [attfile, setAttfile] = useState({});

  const [fileyn, setFileyn] = useState("");
  const [filename, setFilename] = useState("");






  const previewfunc = (e) => {
    let selfile = e.currentTarget

    console.log('previewfunc : ' + selfile.files[0])
    if (selfile.files[0]) {
      setAttfile(selfile.files[0])
      //alert(window.URL.createObjectURL(image.files[0]));
      //this.imgpath = window.URL.createObjectURL(image.files[0]);
      let filePath = selfile.value
      console.log(filePath)
      //전체경로를 \ 나눔.
      let filePathSplit = filePath.split('\\')

      //전체경로를 \로 나눈 길이.
      let filePathLength = filePathSplit.length
      //마지막 경로를 .으로 나눔.
      let fileNameSplit = filePathSplit[filePathLength - 1].split('.')
      //파일명 : .으로 나눈 앞부분
      let fileName = fileNameSplit[0]
      //파일 확장자 : .으로 나눈 뒷부분
      let fileExt = fileNameSplit[1]
      //파일 크기
      let fileSize = selfile.files[0].size

      console.log('파일 경로 : ' + filePath)
      console.log('파일명 : ' + fileName)
      console.log('파일 확장자 : ' + fileExt)
      console.log('파일 크기 : ' + fileSize)

      if (
        fileExt === 'jpg' ||
        fileExt === 'png' ||
        fileExt === 'gif' ||
        fileExt === 'jpeg'
      ) {
        console.log('selfile.files[0] : ' + selfile.files[0])
        const reader = new FileReader()
        reader.readAsDataURL(selfile.files[0])
        reader.onloadend = () => {
          console.log(reader)
          setPreview(reader.result)
        }
        setSelfileyn(true)
        //setPreview(
        //  "<img src='" +
        //    window.URL.createObjectURL(selfile.files[0]) +
        //    "'  style='width: 100px; height: 100px;' />",
        //)
      } else {
        setPreview('./logo.svg')
        setSelfileyn(false)
      }
    }
  };

  const closenoticeModal = () => {
    setNoticedis(false);
  };

  const searchbtn = () => {
    searchlist(1);
  };

  const searchlist = (cpage) => {
    console.log(searchtitle + " : " + searchstartdate + " : " + searchenddate);
    cpage = cpage || 1;
    setCurrentPage(cpage);

    let params = new URLSearchParams();
    params.append("cpage", cpage);
    params.append("pagesize", pageSize);
    params.append("searchtitle", searchtitle);
    params.append("searchstdate", searchstartdate);
    params.append("searcheddate", searchenddate);

    axios
      .post("/notice/noticelistjson.do", params)
      .then((res) => {
        console.log("result console : " + res);
        console.log("result console : " + JSON.stringify(res));
        setNoticelist(res.data.listdata);
        setTotalcnt(res.data.listcnt);
      })
      .catch((err) => {
        console.log("list error");
        alert(err.message);
      });
  };

  const newreg =() => {
    setInputtitle("");
    setInputcon("");
    setPreview("");
    setAction("I");
    setSelnoticeno(0);

    setIsRegbtn(true);
    setNoticedis(true);
    
  };

  const attachfileproc = (ptype, noticeNo) => {
    let params = new URLSearchParams();
    params.append("notice_id", noticeNo);

    axios
      .post("/notice/noticeDownload2.do", params)
      .then((res) => {
        console.log("attachfileproc res start");
        console.log(res);
        //const [preview, setPreview] = useState('')
        //const [attfile, setAttfile] = useState()

        const reader = new FileReader();
        reader.readAsDataURL(new Blob([res.data]));
        reader.onloadend = (event) => {
          //alert(reader.result)
          if (ptype === "P") {
            console.log("event.target.result : " + event.target.result);
            //const previewImage = String(event.target.result)
            console.log(reader);
            setPreview(reader.result);
            console.log(reader.result);
          } else {
            console.log(reader);
            let docUrl = document.createElement("a");
            docUrl.href = reader.result;
            docUrl.setAttribute("download", filename);
            document.body.appendChild(docUrl);
            docUrl.click();
          }
        };

        //setPreview(window.URL.createObjectURL(new Blob([res.data])))
        //setAttfile(res.data)
      })
      .catch((err) => {
        console.log("attachfileproc catch start");
        alert(err.message);
      });
  };

  const filePreview = () => {
    attachfileproc("D", selnoticeno);
  };



  const detailnotice = (id) => {
    //alert(id);

    let params = new URLSearchParams();
    params.append("notice_id", id);

    axios
      .post("/notice/noticeView.do", params)
      .then((res) => {
        console.log("result console : " + JSON.stringify(res));

        setSelnoticeno(id);
        setInputtitle(res.data.selinfo.notice_tit);
        setInputcon(res.data.selinfo.notice_con);
        setAction("U");
        setIsRegbtn(false);
        let fileext = res.data.selinfo.fileext;

        console.log("파일명 : " + res.data.selinfo.filename);
        console.log("파일 확장자 : " + fileext);
        console.log("파일 크기 : " + res.data.selinfo.filesize);
        if (res.data.selinfo.filename === "") {
          // 파일 미첨부
          setPreview("");
          setSelfileyn(false);
          setAttfile();
          setFilename("");
        } else {
          if (
            fileext === "jpg" ||
            fileext === "png" ||
            fileext === "gif" ||
            fileext === "jpeg"
          ) {
            setSelfileyn(true); //  이미지 파일 업로드 된 경우  미리보기 처리   다운로드 URL 호출
            attachfileproc("P", id);

            //setPreview(
            //  "<img src='" +
            //    window.URL.createObjectURL(selfile.files[0]) +
            //    "'  style='width: 100px; height: 100px;' />",
            //)
          } else {
            setPreview(res.data.selinfo.filename);
            setSelfileyn(false);
          }
        }

        setNoticedis(true);
      })
      .catch((err) => {
        console.log("detail error");
        alert(err.message);
      });
  };


  const noticereg = (e) => {


    let params = new FormData();
    params.append("notice_tit", inputtitle);
    params.append("notice_con", inputcon);
    params.append("noticeNo", selnoticeno);
    params.append("fileyn", fileyn);
    params.append("file", attfile);
    params.append("action", action);

    let callUrl = "";
    if(action === "I"){
      callUrl = "/notice/noticeSave.do";
    }else if(action === "U"){
      callUrl = "/notice/noticeModify.do";
    }


    axios
      .post(callUrl, params)
      .then((res) => {
        alert(res.data.result);
        console.log("noticeSave result console : " + res);
        console.log("noticeSave result console : " + JSON.stringify(res));

        if(res.data.result === "sucess"){
          closenoticeModal();
          searchlist();
        }

      })
      .catch((err) => {
        console.log("save error");
        alert(err.message);
      });
  };

  const delnotice =(id) => {
    alert(id);
  };


  const searchstyle = {
    fontsize: "15px",
    fontweight: "bold",
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
    <div id="samplePage1"> 
      <div className="content">
        <p className="Location">
          <a href="#none" className="btn_set home">메인으로</a>
          <span className="btn_nav bold"> 학습 지원</span>
          <span className="btn_nav bold"> 공지사항</span>
          <a href="#none" className="btn_set refresh">새로고침</a>
        </p>
        <p className="conTitle">
          <span>공지사항</span>
          <span className="fr">
            <span style={searchstyle}>제목</span>
            <input
              type="text"
              id="searchRoomName"
              name="searchRoomName"
              className="form-control"
              placeholder=""
              style={{ width : '150px' }}
              value={searchtitle}
              onChange={(e) => {setSearchtitle(e.target.value)}}
              
            />
            <input
              type="date"
              id="searchstartdate"
              name="searchstartdate"
              className="form-control"
              style={{ width : '150px' }}
              value={searchstartdate}
              onChange={(e) => {setSearchstartdate(e.target.value)}}
            />
            <input
              type="date"
              id="searchenddate"
              name="searchenddate"
              className="form-control"
              style={{ width : '150px' }}
              value={searchenddate}
              onChange={(e) => {setSearchenddate(e.target.value)}}
            />
            <button
              className="btn btn-primary"
              name="searchbtn"
              id="searchbtn"
              onClick={searchbtn}
            >
              <span>검색</span>
            </button>

            <button
              className="btn btn-primary"
              name="newReg"
              id="newReg"
              onClick={newreg}
            >
              <span>신규등록</span>
            </button>
          </span>
        </p>

        <div>
          <b>
            총건수 : {totalcnt} / 현재 페이지 번호 : {currentPage}
          </b>
          <table className="col">
            <colgroup>
              <col width="10%" />
              <col width="50%" />
              <col width="15%" />
              <col width="15%" />
              <col width="15%" />
            </colgroup>
            <thead>
              <tr>
                <th>번호</th>
                <th>제목</th>
                <th>작성자</th>
                <th>등록일</th>
                <th>조회수</th>
              </tr>
            </thead>
            <tbody>
              {totalcnt === 0 && <tr><td colSpan="5"> 조회된 데이터가 없습니다.</td></tr>}
              {totalcnt >=0 && 
              noticelist.map((item) => {return (
                  <tr key={item.notice_id}>
                    <td>{item.notice_id}</td>
                    <td style={{cursor: 'pointer', textDecoration : 'underline'}} onClick={()=> {detailnotice(item.notice_id)}}>{item.notice_tit}</td>
                    <td>{item.loginID}</td>
                    <td>{item.regdate}</td>
                    <td>{item.hit}</td>
                  </tr>              
              )})
              }
      
            </tbody>
          </table>
          
          <Pagination
                currentPage={currentPage}
                totalPage={totalcnt}
                pageSize={pageSize}
                blockSize={blocksize}
                onClick={searchlist}
          />
        </div>

        <Modal
        style={modalStyle}
        isOpen={noticedis}
        onRequestClose={closenoticeModal}
      >
        <div id="noticeform">
          <p className="conTitle">
            <span>{isRegbtn ? "공지사항 등록" : "공지사항 수정"}</span>
          </p>
          <table style={{ width: "550px", height: "350px" }}>
            <tbody>
              <tr>
                <th>
                  제목 <span className="font_red">*</span>
                </th>
                <td >
                  <input
                    type="text"
                    className="form-control input-sm"
                    style={{ width: "450px" }}
                    value={inputtitle}
                    onChange={(e) => {
                      setInputtitle(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  내용<span className="font_red">*</span>
                </th>
                <td >
                  <textarea
                    className="form-control" 
                    cols="40"
                    rows="5"
                    style={{ width: "450px" }}
                    value={inputcon}
                    onChange={(e) => {
                      setInputcon(e.target.value);
                  }}
                  ></textarea>
                  
                </td>
                
              </tr>
              <tr>
                <th>
                  파일<span className="font_red">*</span>
                </th>
                <td >
                  <input
                    type="file"
                    style={{ width: "450px" }}
                    className="form-control"
                    onChange = {previewfunc}
                  />
                </td>
                
              </tr>
              <tr>
                  <th>
                    미리보기
                  </th>
                  <td  style={{ height: '100px'}}>
                    { selfileyn &&(
                      <img 
                        src={preview ? preview: `./logo.svg`}
                        alt="preview"
                        className="filepreview"
                        onClick={filePreview}
                      />
                    )}
                    {!selfileyn && disfilename}
                    
                  </td>
              </tr>
              
            </tbody>
          </table>
          <div className="modal-button">
            {isRegbtn && (
              <button className="btn btn-primary mx-2" onClick={noticereg}>
                등록
              </button>
            )}
            {!isRegbtn && (
              <button className="btn btn-primary mx-2" onClick={noticereg}>
                수정
              </button>
            )}
            {!isRegbtn && (
              <button className="btn btn-primary mx-2" onClick={delnotice} >
                삭제
              </button>
            )}
            <button className="btn btn-primary" onClick={closenoticeModal}>
              닫기
            </button>
          </div>
        </div>
      </Modal>

      </div>
  </div>
  );
};

export default SamplePage1;