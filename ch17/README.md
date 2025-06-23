## 실습 가이드
본 장의 실습에는 릭앤 모티 공개 API를 사용합니다. 
릭 앤 모티 공개 API 서버에 부하를 주는 것을 막기 위해 프리즈마를 사용해 로컬에 데이터를 저장해두고 불러오는 것을 권장합니다.
1. npm install -g pnpm@10
2. pnpm install
3. pnpm prisma db seed #프리즈마 데이터베이스 시딩을 위해 
4. pnpm dev