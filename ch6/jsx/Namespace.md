```JSX
var xml = <ns:root xmlns:ns="http://example.com/ns">
            <ns:child>Content</ns:child>
          </ns:root>;
console.log(xml.ns::child); // ➊ 
```