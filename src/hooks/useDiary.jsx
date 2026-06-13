import { useContext, useState, useEffect } from "react";
import { DiaryStateContext } from "../App";
import { useNavigate } from "react-router-dom";

//useDiary 커스텀 훅(하나의 일기 데이터를 context로 부터 꺼내오는 중복 로직을 없애기 위함)
//이러한 함수는 react hook을 사용하기 때문에 일반 함수로는 불가능 하고 이렇게 custom hook으로 만들어 준다.
//함수의 접두사에 use가 붙으면 커스텀 훅이 된다. -> custom hook내부에서는 useEffect와 같은 React의 Hook들을 사용 가능하다
const useDiary = (id) => {
  const data = useContext(DiaryStateContext); //수정 페이지에서 입력된 값을 자동으로 입력된 형태로 만들어 주기 위해서 필요한 데이터를 받아온다.
  const [curDiaryItem, setCurDiaryItem] = useState();
  const nav = useNavigate();

  //params.id 또는 일기의 데이터가 변경되는 경우만 동작 또는 마운트 시점
  useEffect(() => {
    const currentDiaryItem = data.find(
      (item) => String(item.id) === String(id),
    );

    //존재하지 않는 페이지
    if (!currentDiaryItem) {
      window.alert("존재하지 않는 일기입니다.");
      //실제 Edit 컴포넌트가 return하기 전이기 때문에 nav가 동작 할 수 없다.
      //컴포넌트가 호출되자마자 바로 실행하고 싶으면 useEffect를 사용해야 정상 동작 가능하다.
      nav("/", { replace: true });
    }

    setCurDiaryItem(currentDiaryItem);
  }, [id]); //nav는 비동기 이기 때문에 의존성 배열에서 data는 추가X

  return curDiaryItem;
};

export default useDiary;
