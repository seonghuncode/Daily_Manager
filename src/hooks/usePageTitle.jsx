import { useEffect } from "react";

const usePageTitle = (title) => {
  //컴포넌트가 마운트되면 호출 하도록(title값을 변경)
  useEffect(() => {
    //$를 붙이는 이유는 관례상 dom요소가 저장된다는 것을 명시하기 위함
    const $title = document.getElementsByTagName("title")[0];
    $title.innerText = title;
  }, [title]);
};

export default usePageTitle;
