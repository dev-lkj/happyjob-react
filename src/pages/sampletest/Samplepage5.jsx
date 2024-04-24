import React, { useState, useEffect } from "react";
import axios from "axios";
import Pagination from "../../components/common/Pagination";
import Modal from "react-modal";

const SamplePage5 = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [equcurrentPage, setEqucurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalcnt, setTotalcnt] = useState(0);
  const [searchRoomName, setSearchRoomName] = useState("");
  const [roomlist, setRoomlist] = useState([]);
  const [blocksize] = useState(10);
  const [equdis, setEqudis] = useState(false);
  const [searchroomid, setSearchroomid] = useState(0);
  const [equitemlist, setEquitemlist] = useState([]);
  const [equtotalcnt, setEqutotalcnt] = useState(0);
  const [roomdis, setRoomdis] = useState(false);
  const [isroomRegBtn, setIsroomRegBtn] = useState(false);

  const [roomname, setRoomname] = useState("");
  const [roomsize, setRoomsize] = useState(0);
  const [roomsite, setRoomsite] = useState(0);
  const [roometc, setRoometc] = useState("");
  const [action, setAction] = useState("");

  useEffect(() => {
    console.log("useEffect");
    searchroom();
  }, []);

  useEffect(() => {
    console.log("searchroomid useEffect");
    equlist();
  }, [searchroomid]);

  const changesearchroom = (e) => {
    setSearchRoomName(e.target.value);
  };

  const searchroom = (cpage) => {
    cpage = cpage || 1;
    setCurrentPage(cpage);

    //alert(searchRoomName);

    let params = new URLSearchParams();
    params.append("cpage", currentPage);
    params.append("pagesize", pageSize);
    params.append("searchRoomName", searchRoomName);

    axios
      .post("/adm/lectureRoomListjson.do", params)
      .then((res) => {
        setTotalcnt(res.data.listcnt);
        setRoomlist(res.data.listdata);
        console.log("result console : " + res);
        console.log("result console : " + JSON.stringify(res));
      })
      .catch((err) => {
        console.log("list error");
        alert(err.message);
      });
  };

  const searchequlist = (id) => {
    //alert(id);
    setSearchroomid(id);
    //equlist();
  };

  const equlist = async (cpage) => {
    cpage = cpage || 1;
    setEqucurrentPage(cpage);
    setEqudis(true);

    //alert(searchroomid);

    let params = new URLSearchParams();
    params.append("cpage", cpage);
    params.append("pagesize", pageSize);
    params.append("lecrm_id", searchroomid);

    await axios
      .post("/adm/equListjson.do", params)
      .then((res) => {
        setEqutotalcnt(res.data.listcnt);
        setEquitemlist(res.data.listdata);
        console.log("result console : " + res);
        console.log("result console : " + JSON.stringify(res));
      })
      .catch((err) => {
        console.log("list error");
        alert(err.message);
      });
  };

  const closeroomModal = () => {
    setRoomdis(false);
  };

  const newroom = () => {
    setRoomdis(true);
    setIsroomRegBtn(true);

    setRoomname("");
    setRoomsize(0);
    setRoomsite(0);
    setRoometc("");
    setAction("I");
  };

  const roommod = (id) => {
    //alert(id);

    let params = new URLSearchParams();

    params.append("lecrm_id", id);

    axios
      .post("/adm/lectureRoomDtl.do", params)
      .then((res) => {
        console.log("result detial : " + JSON.stringify(res));
        setRoomname(res.data.selinfo.lecrm_name);
        setRoomsize(res.data.selinfo.lecrm_size);
        setRoomsite(res.data.selinfo.lecrm_snum);
        setRoometc(res.data.selinfo.lecrm_note);

        setSearchroomid(id);
        setAction("U");
        setIsroomRegBtn(false);
        setRoomdis(true);
      })
      .catch((err) => {
        console.log("list error");
        alert(err.message);
      });
  };

  const roomdel = () => {
    roomreg("D");
  };

  const roomreg = (type) => {
    if (typeof type == "object") {
      type = action;
    }

    //alert(typeof type + " : " + type + " : " + action);

    let params = new URLSearchParams();

    params.append("lecrm_name", roomname);
    params.append("lecrm_size", roomsize);
    params.append("lecrm_snum", roomsite);
    params.append("lecrm_note", roometc);
    params.append("lecrm_id", searchroomid);
    params.append("action", type);

    axios
      .post("/adm/lectureRoomSave.do", params)
      .then((res) => {
        console.log("result save : " + JSON.stringify(res));

        if (res.data.result == "S") {
          alert(res.data.resultmsg);
          closeroomModal();

          if (action === "I") {
            searchroom();
          } else {
            searchroom(currentPage);
          }
        } else {
          alert(res.data.resultmsg);
        }
      })
      .catch((err) => {
        console.log("list error");
        alert(err.message);
      });
  };

  const searchstyle = {
    fontsize: "15px",
    fontweight: "bold",
  };

  const searchstylewidth = {
    height: "28px",
    width: "200px",
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
    <div className="content">
      <p className="Location">
        <a className="btn_set home">메인으로</a>{" "}
        <span className="btn_nav bold">시설 관리</span>{" "}
        <span className="btn_nav bold"> 강의실</span>{" "}
        <a className="btn_set refresh">새로고침</a>
      </p>
      <p className="conTitle">
        <span>강의실</span>{" "}
        <span className="fr">
          <span style={searchstyle}>강의실 명 </span>
          <input
            type="text"
            id="searchRoomName"
            name="searchRoomName"
            className="form-control"
            placeholder=""
            style={searchstylewidth}
            onChange={changesearchroom}
          />
          <button
            className="btn btn-primary"
            onClick={searchroom}
            name="searchbtn"
            id="searchbtn"
          >
            <span>검색</span>
          </button>

          <button
            className="btn btn-primary"
            onClick={newroom}
            name="newReg"
            id="newReg"
          >
            <span>강의실 신규등록</span>
          </button>
        </span>
      </p>

      <div>
        <table className="col">
          <colgroup>
            <col width="20%" />
            <col width="15%" />
            <col width="15%" />
            <col width="40%" />
            <col width="15%" />
          </colgroup>
          <thead>
            <tr>
              <th>강의실 명</th>
              <th>강의실 크기</th>
              <th>강의실 자리수</th>
              <th>비고</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {roomlist.map((item) => {
              return (
                <tr key={item.lecrm_id}>
                  <td
                    className="pointer-cursor"
                    onClick={() => searchequlist(item.lecrm_id)}
                  >
                    {item.lecrm_name}
                  </td>
                  <td>{item.lecrm_size}</td>
                  <td>{item.lecrm_snum}</td>
                  <td>{item.lecrm_note}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => roommod(item.lecrm_id)}
                    >
                      수정
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination
          currentPage={equcurrentPage}
          totalPage={totalcnt}
          blockSize={blocksize}
          onClick={searchroom}
        />
      </div>
      {equdis && (
        <div>
          <p className="conTitle">
            <span>장비 목록</span>{" "}
            <span className="fr">
              <button
                className="btn btn-primary"
                name="newRegEqu"
                id="newRegEqu"
              >
                <span>장비 신규등록</span>
              </button>
            </span>
          </p>
          <div>
            <table className="col">
              <colgroup>
                <col width="20%" />
                <col width="15%" />
                <col width="15%" />
                <col width="40%" />
                <col width="15%" />
              </colgroup>
              <thead>
                <tr>
                  <th>강의실 명</th>
                  <th>장비 명</th>
                  <th>장비수</th>
                  <th>비고</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {equitemlist.map((item) => {
                  return (
                    <tr key={item.equ_id}>
                      <td>{item.lecrm_name}</td>
                      <td>{item.equ_name}</td>
                      <td>{item.equ_num}</td>
                      <td>{item.equ_note}</td>
                      <td>
                        <button className="btn btn-primary">수정</button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <Pagination
              currentPage={currentPage}
              totalPage={equtotalcnt}
              blockSize={blocksize}
              onClick={equlist}
            />
          </div>
        </div>
      )}

      <Modal
        style={modalStyle}
        isOpen={roomdis}
        onRequestClose={closeroomModal}
      >
        <div id="noticeform">
          <p className="conTitle">
            <span>{isroomRegBtn ? "강의실 등록" : "강의실 수정"}</span>
          </p>
          <table style={{ width: "550px", height: "350px" }}>
            <tbody>
              <tr>
                <th>
                  {" "}
                  강의실명 <span className="font_red">*</span>
                </th>
                <td colSpan="3">
                  <input
                    type="text"
                    className="form-control input-sm"
                    style={{ width: "150px" }}
                    value={roomname}
                    onChange={(e) => {
                      setRoomname(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th>
                  {" "}
                  강의실 크기<span className="font_red">*</span>
                </th>
                <td>
                  <input
                    type="text"
                    className="form-control input-sm"
                    style={{ width: "150px" }}
                    value={roomsize}
                    onChange={(e) => {
                      setRoomsize(e.target.value);
                    }}
                  />
                </td>
                <th>
                  {" "}
                  강의실 자릿수<span className="font_red">*</span>
                </th>
                <td>
                  <input
                    type="text"
                    className="form-control input-sm"
                    style={{ width: "150px" }}
                    value={roomsite}
                    onChange={(e) => {
                      setRoomsite(e.target.value);
                    }}
                  />
                </td>
              </tr>
              <tr>
                <th> 비고 </th>
                <td colSpan="3">
                  <input
                    type="text"
                    className="form-control input-sm"
                    style={{ width: "350px" }}
                    value={roometc}
                    onChange={(e) => {
                      setRoometc(e.target.value);
                    }}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="modal-button">
            {isroomRegBtn && (
              <button className="btn btn-primary mx-2" onClick={roomreg}>
                {" "}
                등록{" "}
              </button>
            )}
            {!isroomRegBtn && (
              <button className="btn btn-primary mx-2" onClick={roomreg}>
                {" "}
                수정{" "}
              </button>
            )}
            {!isroomRegBtn && (
              <button className="btn btn-primary mx-2" onClick={roomdel}>
                {" "}
                삭제{" "}
              </button>
            )}
            <button className="btn btn-primary" onClick={closeroomModal}>
              {" "}
              닫기{" "}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default SamplePage5;