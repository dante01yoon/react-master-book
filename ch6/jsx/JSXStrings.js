import React, { useState } from 'react';
import ReactDOM from 'react-dom';

// ======================================================================
// JSX Strings 예제
// ======================================================================

/**
 * JSX에서 문자열 사용의 기본 예제
 * JSX에서 문자열을 사용하는 다양한 방법과 특징 설명
 */
export const BasicStringsExample = () => {
  return (
    <div className="example">
      <h2>1. 기본 문자열 예제</h2>
      
      {/* 일반 텍스트 */}
      <div className="basic-text">
        <h3>1-1. 일반 텍스트</h3>
        <p>안녕하세요, 골든래빗입니다.</p>
        <p>JSX에서 일반 텍스트는 그대로 렌더링됩니다.</p>
      </div>
      
      {/* 여러 줄 텍스트 */}
      <div className="multiline-text">
        <h3>1-2. 여러 줄 텍스트</h3>
        <p>
          JSX에서 
          여러 줄에 걸쳐 작성된 텍스트는
          모든 공백과 줄바꿈이 하나의 공백으로 변환됩니다.
        </p>
        <pre>
          {`// 코드 예시
const example = "multiline";
console.log(example);`}
        </pre>
      </div>
    </div>
  );
};

/**
 * 유니코드와 이모지 사용 예제
 * JSX에서 다양한 유니코드 문자와 이모지를 사용하는 방법
 */
export const UnicodeAndEmojiExample = () => {
  return (
    <div className="example">
      <h2>2. 유니코드와 이모지 예제</h2>
      
      {/* 이모지 사용 */}
      <div className="emoji-examples">
        <h3>2-1. 이모지 사용</h3>
        <p>🚀 새 프로젝트 배포 시작!</p>
        <p>🎉 축하합니다! 성공적으로 완료되었습니다.</p>
        <p>⚠️ 주의: 이 기능은 실험적입니다.</p>
        <p>❤️ 리액트를 사랑합니다.</p>
      </div>
      
      {/* 다양한 언어의 문자 */}
      <div className="unicode-examples">
        <h3>2-2. 다양한 언어 지원</h3>
        <p>한국어: 안녕하세요</p>
        <p>일본어: こんにちは</p>
        <p>중국어: 你好</p>
        <p>아랍어: مرحبا</p>
        <p>러시아어: Привет</p>
      </div>
    </div>
  );
};

/**
 * HTML 엔티티 사용 예제
 * JSX에서 HTML 엔티티를 사용하여 특수 문자와 공백 표현하기
 */
export const HtmlEntityExample = () => {
  return (
    <div className="example">
      <h2>HTML 엔티티 예제</h2>
      
      {/* HTML 특수 문자 */}
      <div className="html-special-chars">
        <h3>3-1. HTML 특수 문자</h3>
        <p>HTML 태그를 텍스트로 표시: &lt;div&gt;내용&lt;/div&gt;</p>
        <p>Copyright 기호: &copy; 2023 골든래빗</p>
        <p>앰퍼샌드: A &amp; B</p>
        <p>따옴표: &quot;인용&quot;</p>
      </div>
      
      {/* 공백과 줄바꿈 */}
      <div className="whitespace">
        <h3>3-2. 공백과 줄바꿈</h3>
        <p>일반&nbsp;&nbsp;&nbsp;공백</p>
        <p>텍스트 줄바꿈 첫째줄<br/>둘째줄</p>
      </div>
      
      {/* HTML 엔티티를 사용하는 실제 사례 */}
      <div className="entity-use-case">
        <h3>3-3. 활용 사례</h3>
        <p>값이 &lt; 10인 경우 경고를 표시합니다.</p>
        <p>HTML 코드: <code>&lt;button&gt;클릭&lt;/button&gt;</code></p>
      </div>
    </div>
  );
};

/**
 * 이스케이프 시퀀스 동작 예제
 * JSX에서 이스케이프 시퀀스의 동작과 한계점
 */
export const EscapeSequenceExample = () => {
  // 자바스크립트 문자열에서의 이스케이프 시퀀스
  const jsString = "첫째줄\n둘째줄\n셋째줄";
  const jsTabString = "이름:\t김토끼";
  
  // HTML을 직접 설정하는 방법
  const htmlWithLineBreaks = {
    __html: "첫째줄<br/>둘째줄<br/>셋째줄"
  };
  
  return (
    <div className="example">
      <h2>이스케이프 시퀀스 예제</h2>
      
      {/* JSX 텍스트 노드에서의 이스케이프 시퀀스 */}
      <div className="escape-in-jsx">
        <h3>4-1. JSX 텍스트 노드에서의 이스케이프 시퀀스</h3>
        <p>다음 줄로 이동: 첫째줄\n둘째줄 (동작하지 않음)</p>
        <p>탭 문자: 이름:\t김토끼 (동작하지 않음)</p>
      </div>
      
      {/* 자바스크립트 변수에서의 이스케이프 시퀀스 */}
      <div className="escape-in-js-vars">
        <h3>4-2. 자바스크립트 변수에서의 이스케이프 시퀀스</h3>
        <pre>{jsString}</pre>
        <p>{jsTabString}</p>
        <p><strong>참고:</strong> 변수 내 이스케이프 시퀀스는 처리되지만, 브라우저에서 '\n'은 공백으로 표시됩니다.</p>
      </div>
      
      {/* 올바른 줄바꿈 처리 방법 */}
      <div className="proper-line-breaks">
        <h3>4-3. 줄바꿈을 올바르게 처리하는 방법</h3>
        
        {/* 방법 1: <br/> 태그 사용 */}
        <div className="using-br">
          <h4>방법 1: &lt;br/&gt; 태그 사용</h4>
          <p>첫째줄<br/>둘째줄<br/>셋째줄</p>
        </div>
        
        {/* 방법 2: CSS white-space 속성 사용 */}
        <div className="using-whitespace">
          <h4>방법 2: CSS white-space 속성 사용</h4>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{jsString}</pre>
        </div>
        
        {/* 방법 3: dangerouslySetInnerHTML 사용 (주의 필요) */}
        <div className="using-innerhtml">
          <h4>방법 3: dangerouslySetInnerHTML 사용 (주의 필요)</h4>
          <p dangerouslySetInnerHTML={htmlWithLineBreaks} />
          <p className="warning">⚠️ 주의: 사용자 입력을 이 방식으로 렌더링하면 XSS 공격에 취약해질 수 있습니다.</p>
        </div>
      </div>
    </div>
  );
};

/**
 * 문자열 연결과 템플릿 리터럴 예제
 * JSX에서 동적 문자열을 구성하는 방법
 */
export const StringConcatExample = () => {
  const [name, setName] = useState('김토끼');
  const [age, setAge] = useState(3);
  
  return (
    <div className="example">
      <h2>5. 문자열 연결과 템플릿 리터럴 예제</h2>
      
      {/* 문자열 연결 */}
      <div className="string-concat">
        <h3>5-1. 문자열 연결</h3>
        <p>{'안녕하세요, ' + name + '님!'}</p>
        <p>{'나이: ' + age + '살'}</p>
      </div>
      
      {/* 템플릿 리터럴 */}
      <div className="template-literals">
        <h3>5-2. 템플릿 리터럴</h3>
        <p>{`안녕하세요, ${name}님!`}</p>
        <p>{`나이: ${age}살 (토끼 나이로는 ${age * 7}살)`}</p>
      </div>
      
      {/* 문자열 포맷팅 함수 */}
      <div className="string-formatting">
        <h3>5-3. 문자열 포맷팅 함수</h3>
        <p>{formatGreeting(name, age)}</p>
      </div>
      
      {/* 상호작용 예제 */}
      <div className="interactive">
        <h3>5-4. 상호작용 예제</h3>
        <div>
          <label htmlFor="name">이름: </label>
          <input 
            id="name"
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
          />
        </div>
        <div>
          <label htmlFor="age">나이: </label>
          <input 
            id="age"
            type="number" 
            value={age} 
            onChange={(e) => setAge(Number(e.target.value))} 
          />
        </div>
      </div>
    </div>
  );
};

// 문자열 포맷팅 함수
function formatGreeting(name, age) {
  return `${name}님, 환영합니다! ${age}살이시네요. ${getAgeComment(age)}`;
}

// 나이에 따른 코멘트
function getAgeComment(age) {
  if (age < 3) return '아직 어린 토끼시군요.';
  if (age < 7) return '성장하는 토끼시군요.';
  return '성숙한 토끼시군요.';
}

/**
 * 국제화(i18n)와 문자열 예제
 * 다국어 지원 및 번역된 문자열 관리
 */
export const I18nExample = () => {
  // 간단한 번역 모듈 흉내
  const translations = {
    ko: {
      greeting: '안녕하세요',
      welcome: '{name}님, 환영합니다!',
      items: '{count}개의 항목이 있습니다.'
    },
    en: {
      greeting: 'Hello',
      welcome: 'Welcome, {name}!',
      items: 'You have {count} items.'
    },
    ja: {
      greeting: 'こんにちは',
      welcome: '{name}さん、ようこそ！',
      items: '{count}項目があります。'
    }
  };
  
  const [lang, setLang] = useState('ko');
  const t = (key, params = {}) => {
    let text = translations[lang][key] || key;
    Object.entries(params).forEach(([paramKey, value]) => {
      text = text.replace(`{${paramKey}}`, value);
    });
    return text;
  };
  
  return (
    <div className="example">
      <h2>6. 국제화(i18n) 문자열 예제</h2>
      
      {/* 언어 선택 */}
      <div className="language-selector">
        <h3>6-1. 언어 선택</h3>
        <select value={lang} onChange={(e) => setLang(e.target.value)}>
          <option value="ko">한국어</option>
          <option value="en">English</option>
          <option value="ja">日本語</option>
        </select>
      </div>
      
      {/* 번역된 문자열 */}
      <div className="translated-strings">
        <h3>6-2. 번역된 문자열</h3>
        <p>{t('greeting')}</p>
        <p>{t('welcome', { name: '골든래빗' })}</p>
        <p>{t('items', { count: 5 })}</p>
      </div>
    </div>
  );
};

// ======================================================================
// 메인 컴포넌트
// ======================================================================

/**
 * 모든 예제를 렌더링하는 메인 컴포넌트
 */
const JSXStringsDemo = () => {
  return (
    <div className="jsx-strings-demo">
      <h1>JSX Strings 예제 모음</h1>
      <p>JSX에서 문자열을 다루는 다양한 방법을 보여주는 예제들입니다.</p>
      
      <BasicStringsExample />
      <UnicodeAndEmojiExample />
      <HtmlEntityExample />
      <EscapeSequenceExample />
      <StringConcatExample />
      <I18nExample />
    </div>
  );
};

// DOM에 렌더링
if (typeof document !== 'undefined') {
  const rootElement = document.getElementById('root');
  if (rootElement) {
    ReactDOM.render(<JSXStringsDemo />, rootElement);
  }
}

export default JSXStringsDemo; 