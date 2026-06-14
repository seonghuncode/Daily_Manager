import "./App.css";
import { useReducer, useRef, createContext, useEffect, useState } from "react";
import Home from "./pages/Home";
import Diary from "./pages/Diary";
import New from "./pages/New";
import Edit from "./pages/Edit";
import Notfound from "./pages/Notfound";
import { Routes, Route } from "react-router-dom";

// const mockData = [
//   {
//     id: 1,
//     createdDate: new Date("2026-06-10").getTime(),
//     emotionId: 1,
//     content: "1번 일기 내용",
//   },
//   {
//     id: 2,
//     createdDate: new Date("2026-06-11").getTime(),
//     emotionId: 2,
//     content: "2번 일기 내용",
//   },
//   // {
//   //   id: 3,
//   //   createdDate: new Date("2026-06-12").getTime(),
//   //   emotionId: 3,
//   //   content: "3번 일기 내용",
//   // },
// ];

function reducer(state, action) {
  let nextState;
  switch (action.type) {
    case "INIT":
      return action.data;
    case "CREATE": {
      nextState = [action.data, ...state];
      break;
    }
    case "UPDATE": {
      nextState = state.map((item) =>
        String(item.id) === String(action.data.id) ? action.data : item,
      );
      break;
    }
    case "DELETE": {
      nextState = state.filter((item) => String(item.id) !== String(action.id));
      break;
    }
    default:
      return state;
  }
  localStorage.setItem("diary", JSON.stringify(nextState));
  return nextState;
}

export const DiaryStateContext = createContext();
export const DiaryDispatchContext = createContext();

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(0);

  //App 컴포넌트 마운트 -> 로컬 스토리지에서 데이터 조회 -> 불러온 데이터를 dispach를 호출해서 data state에 세팅
  //App컴포넌트 useEffect함수가 완료 되기 전 다른 컴포넌트가 먼저 렌더링이 완료되는 경우 문제 -> 로딩 기능으로 완료 후 동작하도록 해야한다.
  useEffect(() => {
    const storedData = localStorage.getItem("diary");
    if (!storedData) {
      setIsLoading(false);
      return;
    }
    const parsedData = JSON.parse(storedData);
    //console.log(parsedData);
    if (!Array.isArray(parsedData)) {
      setIsLoading(false);
      return;
    }
    let maxId = 0;
    parsedData.forEach((item) => {
      if (Number(item.id) > maxId) {
        maxId = Number(item.id);
      }
    });
    idRef.current = maxId + 1;
    dispatch({
      type: "INIT",
      data: parsedData,
    });
    setIsLoading(false);
  }, []);

  // localStorage.setItem("test", "hello");
  // localStorage.setItem("person", JSON.stringify({ name: "test" }));

  // console.log(localStorage.getItem("test"));
  // console.log(JSON.parse(localStorage.getItem("person")));

  // localStorage.removeItem("test");
  // localStorage.removeItem("person");

  //새로운 일기 추가
  const onCreate = (createdDate, emotionId, content) => {
    dispatch({
      type: "CREATE",
      data: {
        id: idRef.current++,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  // 기존 일기 수정
  const onUpdate = (id, createdDate, emotionId, content) => {
    dispatch({
      type: "UPDATE",
      data: {
        id,
        createdDate,
        emotionId,
        content,
      },
    });
  };

  //기존 일기 삭제
  const onDelete = (id) => {
    dispatch({
      type: "DELETE",
      id,
    });
  };

  if (isLoading) {
    return <div>데이터 로딩중입니다...</div>;
  }

  return (
    <>
      <DiaryStateContext.Provider value={data}>
        {/* 상태변화 함수를 하위에서 공급받을 수 있다 */}
        <DiaryDispatchContext.Provider
          value={{
            onCreate,
            onDelete,
            onUpdate,
          }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/new" element={<New />} />
            <Route path="/diary/:id" element={<Diary />} />
            <Route path="/edit/:id" element={<Edit />} />
            <Route path="*" element={<Notfound />} />
          </Routes>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    </>
  );
}

export default App;
