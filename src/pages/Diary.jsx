import { useParams } from "react-router-dom";

const Diray = () => {
  const params = useParams();
  console.log(params);
  return <div>{params.id}번 일기입니다. Diray</div>;
};

export default Diray;
