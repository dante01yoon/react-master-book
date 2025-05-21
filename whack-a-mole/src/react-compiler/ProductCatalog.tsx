import React, { useState, useMemo, useCallback } from 'react'; // useMemo, useCallback은 설명을 위해 임포트

interface ProductItemProps {
  product: { id: number; name: string; price: number };
  onAddToCart: (productId: number) => void;
}

// 개별 제품을 표시하는 간단한 컴포넌트
const ProductItem = ({ product, onAddToCart }: ProductItemProps) => {
  // 이 로그는 ProductItem이 실제로 다시 렌더링될 때만 출력됨
  console.log(`[ProductItem] 렌더링됨: ${product.name}`);
  return (
    <div className="border border-gray-200 p-2.5 my-1.5 rounded bg-white text-gray-900">
      <p className="m-0 mb-1">
        {/* 프롭스를 참조하여 렌더링하는 부분 */}
        <strong>{product.name}</strong>
         - {product.price.toLocaleString()}원
      </p>
      <button
        onClick={() => onAddToCart(product.id)}
        className="py-1 px-2.5 text-sm bg-gray-100 text-gray-800 border border-gray-300 rounded hover:bg-gray-200"
      >
        장바구니에 추가
      </button>
    </div>
  );
};
ProductItem.displayName = "ProductItem"; // 개발자 도구에 표시될 이름 설정

// 제품 목록을 필터링하고 표시하는 컴포넌트
interface ProductListProps {
  products: { id: number; name: string; price: number }[];
  searchTerm: string;
  onAddToCart: (productId: number) => void;
}

function ProductList({ products, searchTerm, onAddToCart }: ProductListProps) {
  console.log(`[ProductList] 렌더링 시작 - 현재 검색어: "${searchTerm}"`);

  // ➊ 비용이 높은 연산이 될 수 있는 필터링 로직
  //    ProductList가 리렌더링될 때마다 searchTerm이나 products가 변경되지 않았더라도 항상 재실행됨.
  //    products 배열이 매우 크거나 필터링 로직이 복잡할 경우 성능에 영향을 줄 수 있음.
  const filteredProducts = products.filter(product => {
    console.log(`[ProductList] "${product.name}" 필터링 중...`); // 개별 필터링 확인용 로그
    return product.name.toLowerCase().includes(searchTerm.toLowerCase());
  });
  console.log(`[ProductList] 필터링된 제품 개수: ${filteredProducts.length}`);

  /*
    // 💡 useMemo 적용 고려 지점:
    // products나 searchTerm이 변경될 때만 필터링 로직을 다시 실행하도록 메모이제이션 가능
    const filteredProducts = useMemo(() => {
      console.log("[ProductList] useMemo: 제품 필터링 실행됨");
      return products.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }, [products, searchTerm]);
  */

  // ➋ 조기 반환 로직
  if (filteredProducts.length === 0 && searchTerm) {
    return <p>"{searchTerm}"에 해당하는 제품이 없습니다.</p>;
  }

  return (
    <div>
      {filteredProducts.map(product => (
        <ProductItem key={product.id} product={product} onAddToCart={onAddToCart} />
      ))}
    </div>
  );
}

/*
  // 💡 React.memo 적용 고려 지점:
  // ProductList 컴포넌트 자체를 React.memo로 감싸면,
  // ProductList에 전달되는 props(products, searchTerm, onAddToCart)가 모두
  // 이전 렌더링과 동일할 경우 ProductList의 리렌더링을 방지할 수 있음.
  const MemoizedProductList = React.memo(ProductList);
*/


// 최상위 애플리케이션 또는 페이지 컴포넌트
export default function ProductCatalog() {
  const [searchTerm, setSearchTerm] = useState("");
  // ProductList의 렌더링과 직접적인 관련이 없는 상태 (부모 컴포넌트의 리렌더링 유도 목적)
  const [themeColor, setThemeColor] = useState("light");

  // 초기 제품 목록 (실제 애플리케이션에서는 API 호출 등을 통해 비동기적으로 가져옴)
  // 이 데이터 자체는 변경되지 않는다고 가정함.
  // 여기서는 useMemo를 사용하여 이 배열이 ProductCatalog 리렌더링 시 재생성되지 않도록 보장함.
  const allProducts = useMemo(() => {
    console.log("[ProductCatalog] allProducts 생성됨 (최초 1회 또는 의존성 변경 시)");
    return [
      { id: 1, name: "고성능 게이밍 노트북", price: 1800000 },
      { id: 2, name: "기계식 키보드 (청축)", price: 120000 },
      { id: 3, name: "무선 마우스", price: 45000 },
      { id: 4, name: "4K UHD 모니터 27인치", price: 350000 },
      { id: 5, name: "노트북 쿨링 스탠드", price: 28000 },
      { id: 6, name: "웹캠 (Full HD)", price: 70000 },
    ];
  }, []);

  // ➋ 장바구니 추가 핸들러 함수
  //    ProductCatalog 컴포넌트가 리렌더링될 때마다 이 함수는 새로 생성됨.
  //    이 함수가 ProductList를 거쳐 ProductItem까지 전달되므로, 새로운 함수 참조는
  //    React.memo로 감싸진 ProductItem이라도 리렌더링을 유발할 수 있음 (onAddToCart prop이 변경되었다고 간주).
  const handleAddToCart = (productId: number) => {
    console.log(`[ProductCatalog] 장바구니 추가: 제품 ID ${productId} (현재 테마: ${themeColor})`);
    // 실제 장바구니 추가 로직이 여기에 위치함 (예: API 호출, 상태 업데이트 등)
  };

  /*
    // 💡 useCallback 적용 고려 지점:
    // handleAddToCart 함수를 useCallback으로 메모이제이션하면,
    // 의존성 배열(여기서는 themeColor 또는 다른 관련 상태)이 변경되지 않는 한
    // 동일한 함수 참조를 유지하여 불필요한 자식 컴포넌트 리렌더링 방지
    const handleAddToCart = useCallback((productId: number) => {
      console.log(`[ProductCatalog] useCallback: 장바구니 추가: 제품 ID ${productId} (현재 테마: ${themeColor})`);
    }, [themeColor]); // 만약 themeColor가 콜백 로직과 관련 있다면 의존성 배열에 포함
  */

  console.log(`[ProductCatalog] 렌더링됨 - 현재 테마: ${themeColor}`);

  return (
    <div className={`p-5 font-sans ${themeColor === 'dark' ? 'bg-gray-800 text-white' : 'bg-gray-50 text-black'}`}>
      <h2 className="text-center mb-5 text-2xl font-semibold">React 최적화: 제품 카탈로그 예제</h2>

      <div className={`mb-5 p-4 rounded-lg shadow-md ${themeColor === 'dark' ? 'bg-gray-700' : 'bg-white'}`}>
        <input
          type="text"
          placeholder="제품 이름으로 검색..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`mb-2.5 p-2.5 w-full border rounded
            ${themeColor === 'dark'
              ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
              : 'border-gray-300 text-gray-900 placeholder-gray-500'
            }`}
        />
        <button
          onClick={() => setThemeColor(prev => prev === 'light' ? 'dark' : 'light')}
          className="py-2.5 px-4 border-none rounded bg-blue-500 text-white cursor-pointer hover:bg-blue-600"
        >
          테마 변경 (부모 리렌더 유도): {themeColor}
        </button>
      </div>

      <div className={`mt-5 p-4 border border-dashed border-gray-300 rounded ${themeColor === 'dark' ? 'bg-gray-700 border-gray-600' : 'bg-white'}`}>
        <h4 className="mt-0 mb-3 text-xl font-semibold">필터링된 제품 목록:</h4>
        {/*
          ProductList에 props 전달.
          themeColor 상태가 변경되면 ProductCatalog가 리렌더링되고,
          이때 handleAddToCart 함수는 (useCallback으로 감싸지 않으면) 항상 새로 생성됨.
          ProductList 내부의 filteredProducts 로직도 (useMemo로 감싸지 않으면) 항상 다시 실행됨.
          이러한 부분들이 메모이제이션을 통해 최적화될 수 있는 지점임.
        */}
        <ProductList products={allProducts} searchTerm={searchTerm} onAddToCart={handleAddToCart} />
        {/* <MemoizedProductList products={allProducts} searchTerm={searchTerm} onAddToCart={handleAddToCart} /> */}
      </div>

      <div className={`mt-7 p-4 rounded-lg leading-relaxed ${themeColor === 'dark' ? 'bg-gray-700' : 'bg-gray-100'}`}>
        <h4 className="text-xl font-semibold mb-2">주요 관찰 포인트 (메모이제이션 필요성):</h4>
        <p className="mb-2">
          개발자 도구의 콘솔을 열고 확인해보세요. "테마 변경" 버튼을 클릭하면 <code>ProductCatalog</code> 컴포넌트가 리렌더링됩니다.
        </p>
        <ol className="list-decimal list-inside space-y-1 mb-3">
          <li>
            <strong>필터링 로직 반복 실행 (<code>ProductList</code> 내부):</strong> "테마 변경"으로 <code>ProductCatalog</code>가 리렌더링될 때, <code>searchTerm</code>이나 <code>allProducts</code>가 변경되지 않았음에도 <code>ProductList</code> 내부의 필터링 연산(<code>products.filter(...)</code>)이 다시 실행됩니다. (콘솔에서 "[ProductList] 필터링 중..." 로그 확인) 이는 <code>useMemo</code>로 최적화할 수 있는 부분입니다.
          </li>
          <li>
            <strong>새로운 함수 참조 전달 (<code>handleAddToCart</code>):</strong> "테마 변경" 시 <code>handleAddToCart</code> 함수가 새로 생성되어 <code>ProductList</code> 및 <code>ProductItem</code>에 전달됩니다. <code>ProductItem</code>은 <code>React.memo</code>로 감싸져 있지만, <code>onAddToCart</code> prop이 새 참조로 변경되었기 때문에 불필요하게 리렌더링될 수 있습니다. (콘솔에서 "[ProductItem] 렌더링됨..." 로그 확인) 이는 <code>useCallback</code>으로 최적화할 수 있습니다.
          </li>
          <li>
            <strong><code>ProductList</code> 자체의 리렌더링:</strong> <code>ProductList</code>로 전달되는 모든 props(<code>products</code>, <code>searchTerm</code>, <code>onAddToCart</code>)가 실제 값의 변경 없이 참조만 변경되는 경우, <code>ProductList</code> 자체를 <code>React.memo</code>로 감싸 리렌더링을 방지할 수 있습니다.
          </li>
        </ol>
        <p>
          주석 처리된 <code>useMemo</code>, <code>useCallback</code>, <code>MemoizedProductList</code> 부분을 활성화하고 다시 테스트해보면 콘솔 로그의 변화를 통해 최적화 효과를 명확히 확인할 수 있습니다.
        </p>
      </div>
    </div>
  );
} 