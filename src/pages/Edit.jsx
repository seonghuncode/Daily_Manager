import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Editor from "../components/Editor";
import { useContext, useEffect, useState } from "react";
import { DiaryDispatchContext, DiaryStateContext } from "../App";
import useDiary from "../hooks/useDiary";

const Edit = () => {
  const params = useParams();
  const nav = useNavigate();

  //해당 컴포넌트에서 사용할 함수를 받는다.
  const { onDelete, onUpdate } = useContext(DiaryDispatchContext);
  const curDiaryItem = useDiary(params.id);

  //중복으로 여러 곳에서 사용하기 때문에 custom Hook으로 만들어서 사용
  // const data = useContext(DiaryStateContext); //수정 페이지에서 입력된 값을 자동으로 입력된 형태로 만들어 주기 위해서 필요한 데이터를 받아온다.

  // //현재 선택된 페이지의 다이어리 정보
  // const [curDiaryItem, setCurDiaryItem] = useState();

  // //params.id 또는 일기의 데이터가 변경되는 경우만 동작 또는 마운트 시점
  // useEffect(() => {
  //   const currentDiaryItem = data.find(
  //     (item) => String(item.id) === String(params.id),
  //   );

  //   //존재하지 않는 페이지
  //   if (!currentDiaryItem) {
  //     window.alert("존재하지 않는 일기입니다.");
  //     //실제 Edit 컴포넌트가 return하기 전이기 때문에 nav가 동작 할 수 없다.
  //     //컴포넌트가 호출되자마자 바로 실행하고 싶으면 useEffect를 사용해야 정상 동작 가능하다.
  //     nav("/", { replace: true });
  //   }

  //   setCurDiaryItem(currentDiaryItem);
  // }, [params.id]); //nav는 비동기 이기 때문에 의존성 배열에서 data는 추가X
  //중복으로 여러 곳에서 사용하기 때문에 custom Hook으로 만들어서 사용

  const onClickDelete = () => {
    if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
      //일기 삭제
      onDelete(params.id);
      nav("/", { replace: true });
    }
  };

  const onSubmit = (input) => {
    if (window.confirm("일기를 장말 수정할까요?")) {
      onUpdate(
        params.id,
        input.createdDate.getTime(),
        input.emotionId,
        input.content,
      );
      nav("/", { replace: true });
    }
  };

  return (
    <div>
      <Header
        title={"일기 수정하기"}
        leftChild={<Button onClick={() => nav(-1)} text={"< 뒤로가기"} />}
        rightChild={
          <Button onClick={onClickDelete} text={"삭제하기"} type={"NEGATIVE"} />
        }
      />

      {/* 해당 버튼의 클릭되면 onSubmit함수 실행 */}
      <Editor initData={curDiaryItem} onSubmit={onSubmit} />
    </div>
  );
};

export default Edit;
