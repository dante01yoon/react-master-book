declare global { 
  interface GlobalSettings { // 글로벌 스코프로 선언했기 때문에 프로젝트 어디서든 GlobalSettings 인터페이스를 사용할 수 있습니다.
    theme: string;
    language: string;
  }
}

export {};
