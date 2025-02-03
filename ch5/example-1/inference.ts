
// 타입 추론은 preferences.language에 undefine 타입만 올 수 있다고 정의 합니다.
// address.zip은 상황에 따라 string 타입도 되어야 합니다.
const userProfile = {
  username: "Dante", // string
  address: {
    city: "Seoul", // string
    zip: 12345 // number
  },
  preferences: {
    theme: "dark", // string
    language: undefined // undefined
  }
};
