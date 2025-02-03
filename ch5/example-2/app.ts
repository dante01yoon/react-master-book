function configureApp(settings: GlobalSettings) {
  console.log("Theme:", settings.theme);
  console.log("Language:", settings.language);

  if (settings.dateFormat) {
    console.log("Date Format:", settings.dateFormat);
  }

  if (settings.cacheTTL) { // 제공하지 않는 타입이기 때문에 타입 에러가 발생하고 실행되지 않습니다.
    console.log("Cache TTL:", settings.cacheTTL);
  }
}

const myGlobalSettings: GlobalSettings = {
  theme: "dark",
  language: "en-US",
  dateFormat: "YYYY-MM-DD",
  cacheTTL: 3600 // 제공하지 않는 타입이기 때문에 타입 에러가 발생합니다.
};

configureApp(myGlobalSettings);
