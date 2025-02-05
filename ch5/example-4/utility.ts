interface User {
  id: string;
  name: string;
  email: string;
}

type UpdateUserInput = Partial<User>; // Partial 유틸리티 타입을 사용하여 User 인터페이스의 모든 필드를 선택적으로 만듭니다.

const updateUserInput: UpdateUserInput = { // name, email 필드는 선택입니다.
  name: "Dante",
};

type ReadOnlyUser = Readonly<User>; // Readonly 유틸리티 타입을 사용하여 User 인터페이스의 모든 필드를 읽기 전용으로 만듭니다.

const readonlyUser: ReadOnlyUser = {
  id: "1",
  name: "Dante",
  email: "dante@example.com",
};

readonlyUser.email = "dante@example.com"; // ❌ 읽기 전용 필드는 수정할 수 없습니다.


type CompleteUserInput = Required<UpdateUserInput>; // UpdateUserInput는 모든 필드가 선택적 필드였습니다. Required<T>를 사용헀기에 선택적 필드가 모두 필수 필드로 변환됩니다.

const completeUserInput: CompleteUserInput = {
  id: "1",
  name: "Dante",
  email: "dante@example.com",
};

// ❌ 아래 코드는 일부 필드가 누락되어 오류가 발생합니다.
// const invalidUser: CompleteUserInput = {
//   name: "Dante",
// };

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  manufacturer: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

// 제품 목록 표시에 필요한 최소한의 정보만 선택
type ProductListItem = Pick<Product, 'id' | 'name' | 'price' | 'category'>;

const productListExample: ProductListItem = {
  id: "prod_001",
  name: "Mechanical Keyboard",
  price: 129.99,
  category: "Electronics"
  // description, stock 등은 포함할 수 없습니다.
};

// 재고 관리에 필요한 정보만 선택
type InventoryItem = Pick<Product, 'id' | 'name' | 'stock' | 'isActive'>;

const inventoryItemExample: InventoryItem = {
  id: "prod_001",
  name: "Mechanical Keyboard",
  stock: 50,
  isActive: true
};



// 관리자용 제품 수정 폼 (생성/수정 시간과 ID를 제외한 모든 정보)
type ProductEditForm = Omit<Product, 'id' | 'createdAt' | 'updatedAt'>;

const productEditExample: ProductEditForm = {
  name: "Wireless Mouse",
  price: 49.99,
  description: "High-precision wireless mouse",
  category: "Electronics",
  stock: 100,
  manufacturer: "Tech Corp",
  isActive: true
};

// 공개 API용 제품 정보 (민감한 재고 정보와 관리 정보 제외)
type PublicProduct = Omit<Product, 'stock' | 'isActive' | 'createdAt' | 'updatedAt'>;

const publicProductExample: PublicProduct = { // Omit 유틸리티 타입을 사용하여 Product 인터페이스의 특정 필드만 제외합니다.
  id: "prod_001",
  name: "Wireless Mouse",
  price: 49.99,
  description: "High-precision wireless mouse",
  category: "Electronics",
  manufacturer: "Tech Corp"
  // stock, isActive 등은 포함할 수 없습니다.
};


// 제품 미리보기 정보 (카테고리와 제조사를 제외한 기본 정보만)
type ProductPreview = Pick<Product, 'id' | 'name' | 'price' | 'description'>; // Pick 유틸리티 타입을 사용하여 Product 인터페이스의 특정 필드만 선택합니다.

// 가격 업데이트용 타입 (가격과 재고만 수정 가능)
type PriceUpdate = Pick<Product, 'price' | 'stock'>; // Pick 유틸리티 타입을 사용하여 Product 인터페이스의 특정 필드만 선택합니다.

const priceUpdateExample: PriceUpdate = {
  price: 45.99,
  stock: 75
};

// 제품 기본 정보 (관리용 필드 제외)
type BasicProductInfo = Omit<Product, 'createdAt' | 'updatedAt' | 'isActive'>;

const basicProductExample: BasicProductInfo = {
  id: "prod_001",
  name: "Wireless Mouse",
  price: 49.99,
  description: "High-precision wireless mouse",
  category: "Electronics",
  stock: 100,
  manufacturer: "Tech Corp"
};

// Custom Optional 타입: 특정 키 K에 해당하는 프로퍼티만 선택적으로 만들고 나머지는 그대로 유지합니다. K 타입은 T 타입의 키 중 하나여야 합니다.
type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;

// 특정 키 K에 해당하는 프로퍼티만 선택적으로 만들고 나머지는 그대로 유지합니다.
type CustomOptionalUserInput = Optional<CompleteUserInput, 'email'>;

// 여기서 'email' 필드는 선택적이고 'id'와 'name' 필드는 필수입니다.
const customOptionalUserInput: CustomOptionalUserInput = {
  id: "2",
  name: "Virgil",
};
