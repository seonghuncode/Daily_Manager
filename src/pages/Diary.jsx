import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";
import Button from "../components/Button";
import Viewer from "../components/Viewer";
import useDiary from "../hooks/useDiary";
import { getStringedDate } from "../util/get-Stringed-date";
import usePageTitle from "../hooks/usePageTitle";

const Diray = () => {
  const params = useParams();
  const nav = useNavigate();
  const curDiaryItem = useDiary(params.id);
  usePageTitle(`${params.id}번 일기`);
  //다이어리 컴포넌트가 렌더링 되기 전에 최초로 호출이 되는 경우 undefined가 올 수 있다.
  //컴포넌트가 마운트된 이후에 useEffect가 반환된다.
  if (!curDiaryItem) {
    return <div>데이터 로딩중...!</div>;
  }
  const { createdDate, emotionId, content } = curDiaryItem;
  const title = getStringedDate(new Date(createdDate));
  return (
    <div>
      <Header
        title={`${title} 기록`}
        leftChild={
          <Button
            onClick={() => {
              nav(-1);
            }}
            text="< 뒤로가기"
          />
        }
        rightChild={
          <Button
            onClick={() => {
              nav(`/edit/${params.id}`);
            }}
            text={"수정하기"}
          />
        }
      />
      <Viewer emotionId={emotionId} content={content} />
    </div>
  );
};

export default Diray;
