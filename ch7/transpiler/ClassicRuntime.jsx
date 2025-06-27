import React from 'react';

// 변환 전 JSX
const element = <h1 className="greeting">Hello, world</h1>;

// 변환 후 JavaScript (클래식 런타임)
const element = React.createElement('h1', {className: 'greeting'}, 'Hello, world');