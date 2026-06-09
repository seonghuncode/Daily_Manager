//이미지는 public폴더에 보관해도 되고 assets폴더에 보관을 해도된다.
// assets 폴더 : 최적화가 되면 한번 꺼내오면 캐시에 저장하기 때문에 빠르다. 소수의 사진을 사용하는 경우 -> import문으로 사용
// public 폴더 : 특정 경로에 저장하는 방식으로 매번 꺼내오기 때문에 이미지가 많은 경우는 캐시에 부하가 가기 때문에 public에 관리 -> img태그로 사용
import emotion1 from "./../assets/emotion1.png";
import emotion2 from "./../assets/emotion2.png";
import emotion3 from "./../assets/emotion3.png";
import emotion4 from "./../assets/emotion4.png";
import emotion5 from "./../assets/emotion5.png";

export function getEmotionImage(emotionId) {
  switch (emotionId) {
    case 1:
      return emotion1;
    case 2:
      return emotion2;
    case 3:
      return emotion3;
    case 4:
      return emotion4;
    case 5:
      return emotion5;
    default:
      return null;
  }
}
