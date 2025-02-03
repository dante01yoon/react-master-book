interface Address {
  city: string;
  zip: number | string;   // number 혹은 string 타입
}
interface Preferences {
  theme: string;
  language?: string;      // undefined 혹은 string 타입
}

interface UserProfile {
  username: string;
  address: Address;
  preferences: Preferences;
}

const userProfile: UserProfile = {
  username: "Dante",
  address: {
    city: "Seoul",
    zip: "ABC 123" // 이제 string 타입도 가능합니다.
  },
  preferences: {
    theme: "dark"
    // language는 생략할 수 있습니다.
  }
};
