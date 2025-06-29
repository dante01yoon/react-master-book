import { useState } from "react";
import { flushSync } from "react-dom";

const TikTok = () => {
  const [timeState, setTimeState] = useState("tik");

  /**
    // 오류를 발생시키는 코드  
    const handleClick = (state) => () => {
      setTimeState(state);
      const element = document.getElementById(state);
      element.focus();
    }
  */

  // 수정된 코드
  const handleClick = (state) => () => {
    flushSync(() => {
      setTimeState(state);
    })
    const element = document.getElementById(state);
    // 이 코드가 실행될 때는 이미 <textarea/> 엘리먼트가 존재
    element.focus();
 }

  return (
    <div>
      <button
        onClick={handleClick('tik')}
        style={{backgroundColor: "red"}}
      >TIK</button>
      <button
        onClick={handleClick('tok')}
        style={{backgroundColor: "green"}}
      >TOK</button>
      {timeState === "tik" ?
      <div>
        TIK: <input id="tik" />
      </div> :
      <div>
        TOK: <textarea id="tok" />
      </div>
      }
    </div>
  )
}

export default TikTok;
