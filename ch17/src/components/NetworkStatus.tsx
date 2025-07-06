import { useSyncExternalStore } from "react";

// ➊ 네트워크 상태를 관리하는 외부 스토어 객체 정의
const networkStore = {
  // ➋ 브라우저의 현재 온라인 상태를 초기값으로 설정함
  // navigator.onLine은 브라우저가 네트워크에 연결되어 있는지 여부를 나타내는 boolean 값을 반환함
  isOnline: typeof navigator !== 'undefined' ? navigator.onLine : true, // 서버 사이드 렌더링 시 navigator가 없을 수 있으므로 확인
  // ➌ 상태 변경을 구독하는 리스너들을 저장하는 Set 객체
  // Set을 사용하여 동일한 리스너가 중복으로 등록되는 것을 방지함
  listeners: new Set<() => void>(),

  // ➍ 외부 스토어의 상태 변경을 구독하는 함수 (useSyncExternalStore의 첫 번째 인자)
  // listener: 상태 변경 시 호출될 콜백 함수
  subscribe(listener: () => void) {
    this.listeners.add(listener); // 리스너 Set에 콜백 함수를 추가함
    // 구독 해지 함수를 반환함
    // 컴포넌트가 언마운트되거나 의존성이 변경될 때 호출되어 리스너를 제거함 (메모리 누수 방지)
    return () => this.listeners.delete(listener);
  },

  // ➎ 스토어의 상태가 변경되었음을 모든 리스너에게 알리는 함수
  notify() {
    // 등록된 모든 리스너를 순회하며 실행함
    this.listeners.forEach(listener => listener());
  },

  // ➏ 스토어의 현재 상태(스냅샷)를 반환하는 함수 (useSyncExternalStore의 두 번째 인자)
  // React는 이 함수의 반환값을 사용하여 UI를 업데이트할지 결정함
  getSnapshot() {
    return this.isOnline;
  }
};

// ➐ 브라우저가 온라인 상태로 변경될 때 실행될 이벤트 리스너 등록
if (typeof window !== 'undefined') { // window 객체가 사용 가능한 환경인지 확인 (브라우저 환경)
  window.addEventListener('online', () => {
    networkStore.isOnline = true; // 스토어의 isOnline 상태를 true로 업데이트함
    networkStore.notify(); // 상태 변경을 리스너들에게 알림
  });

  // ➑ 브라우저가 오프라인 상태로 변경될 때 실행될 이벤트 리스너 등록
  window.addEventListener('offline', () => {
    networkStore.isOnline = false; // 스토어의 isOnline 상태를 false로 업데이트함
    networkStore.notify(); // 상태 변경을 리스너들에게 알림
  });
}

const NetworkStatus = () => {
  // useSyncExternalStore 훅을 사용하여 외부 스토어(networkStore)의 상태를 구독함
  // 이 훅은 React 외부의 상태 관리 로직과 React 컴포넌트를 동기화하는 데 사용됨
  // subscribe 함수와 getSnapshot 함수를 바인딩하여 networkStore의 컨텍스트에서 실행되도록 함
  const isOnline = useSyncExternalStore(
    networkStore.subscribe.bind(networkStore),
    networkStore.getSnapshot.bind(networkStore)
    // 서버 사이드 렌더링 시 초기 스냅샷을 제공하기 위한 세 번째 인자 (선택 사항)
    // () => typeof navigator !== 'undefined' ? navigator.onLine : true 
  );

  return (
    <div className="flex items-center space-x-2 p-4 border rounded-lg shadow-md">
      <div
        className={`w-4 h-4 rounded-full ${
          isOnline ? 'bg-green-500' : 'bg-red-500'
        }`}
      ></div>
      <span className="font-medium">
        {isOnline ? 'Online' : 'Offline'}
      </span>
    </div>
  );
};

export default NetworkStatus;
