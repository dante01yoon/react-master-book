// 템플릿 리터럴의 실용적인 예제

// 1. 간단한 HTML 템플릿 생성하기
function createHTMLElement(type, content, attributes = {}) {
  const attributesString = Object.entries(attributes)
    .map(([key, value]) => `${key}="${value}"`)
    .join(' ');
  
  return `<${type} ${attributesString}>${content}</${type}>`;
}

// 템플릿 리터럴을 활용하여 HTML 요소 동적 생성
const title = "템플릿 리터럴 활용하기";
const content = "템플릿 리터럴을 사용하면 동적 HTML 생성이 쉬워집니다.";

const htmlTemplate = `
  <!DOCTYPE html>
  <html>
    <head>
      <title>${title}</title>
    </head>
    <body>
      ${createHTMLElement('h1', title, { class: 'title' })}
      ${createHTMLElement('p', content, { class: 'content' })}
      <ul>
        ${['간편한 문법', '동적 값 삽입', '여러 줄 지원'].map(item => 
          createHTMLElement('li', item, { class: 'list-item' })
        ).join('')}
      </ul>
    </body>
  </html>
`;

console.log(htmlTemplate);

// 2. SQL 쿼리 작성에 활용하기
function createSQLQuery(table, fields, conditions) {
  return `
    SELECT ${fields.join(', ')}
    FROM ${table}
    WHERE ${conditions.join(' AND ')}
  `;
}

const table = 'users';
const fields = ['id', 'name', 'email', 'created_at'];
const userId = 42;
const minAge = 25;

const sqlQuery = createSQLQuery(
  table,
  fields,
  [`id = ${userId}`, `age >= ${minAge}`]
);

console.log(sqlQuery);

// 3. 템플릿 리터럴을 활용한 간단한 템플릿 엔진
function render(template, data) {
  // ${key} 형태의 모든 변수를 찾아 데이터에서 값을 가져옴
  return template.replace(/\${([^}]+)}/g, (match, key) => {
    // 중첩된 객체 접근 처리 (user.name 같은 경우)
    const value = key.split('.').reduce((obj, prop) => obj[prop], data);
    return value !== undefined ? value : match;
  });
}

const userData = {
  user: {
    name: '김골드',
    age: 28
  },
  products: ['노트북', '마우스', '키보드'],
  count: 3
};

const userTemplate = `
안녕하세요, \${user.name}님!
현재 \${count}개의 제품을 보유하고 계십니다:
${userData.products.map(product => `- ${product}`).join('\n')}

귀하의 나이: \${user.age}세
`;

const renderedTemplate = render(userTemplate, userData);
console.log(renderedTemplate); 