import { c as _c } from "react/compiler-runtime";


const ProductItem = (t0) => {
 const $ = _c(13); // ➊
 const { product, onAddToCart } = t0;


 console.log(`[ProductItem] 렌더링됨: ${product.name}`);
 let t1;
 if ($[0] !== product.name) { // ➋ product.name이 이전 렌더링과 다르면
   t1 = <strong>{product.name}</strong>; // JSX 새로 생성
   $[0] = product.name; // 현재 product.name 값을 캐시의 1번 슬롯에 저장 (의존성)
   $[1] = t1; // 생성된 JSX를 캐시의 2번 슬롯에 저장 (결과)
 } else {
   t1 = $[1]; // product.name이 같으면 캐시된 JSX(t1) 재사용
 }
 let t2;
 if ($[2] !== product.price) {
   t2 = product.price.toLocaleString();
   $[2] = product.price;
   $[3] = t2;
 } else {
   t2 = $[3];
 }
 let t3;
 if ($[4] !== t1 || $[5] !== t2) {
   t3 = (
     <p className="m-0 mb-1">
       {t1} - {t2}원
     </p>
   );
   $[4] = t1;
   $[5] = t2;
   $[6] = t3;
 } else {
   t3 = $[6];
 }
 let t4;
 if ($[7] !== onAddToCart || $[8] !== product.id) {
   t4 = (
     <button
       onClick={() => onAddToCart(product.id)}
       className="py-1 px-2.5 text-sm bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200"
     >
       장바구니에 추가
     </button>
   );
   $[7] = onAddToCart;
   $[8] = product.id;
   $[9] = t4;
 } else {
   t4 = $[9];
 }
 let t5;
 if ($[10] !== t3 || $[11] !== t4) {
   t5 = (
     <div className="border border-gray-200 p-2.5 my-1.5 rounded bg-white text-gray-900">
       {t3}
       {t4}
     </div>
   );
   $[10] = t3;
   $[11] = t4;
   $[12] = t5;
 } else {
   t5 = $[12];
 }
 return t5;
};
