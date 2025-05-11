graph TD;
    title "React Fiber Traversal Order (Begin Work Phase)";

    Start["Start Traversal"] --> P["<strong>ParentFiber for &lt;div&gt;</strong><br/><em>(Begin Work: 1)</em>"];
    P --"Process P, then move to P.child"--> C1["<strong>Fiber for &lt;ChildComponentA /&gt;</strong><br/><em>(Begin Work: 2)</em>"];
    C1 --"Process C1, then move to C1.sibling<br/>(assuming C1 has no children)"--> C2["<strong>Fiber for &lt;ChildComponentB /&gt;</strong><br/><em>(Begin Work: 3)</em>"];
    C2 --"Process C2, then move to C2.sibling<br/>(assuming C2 has no children)"--> C3["<strong>Fiber for &lt;ChildComponentC /&gt;</strong><br/><em>(Begin Work: 4)</em>"];
    C3 --"Process C3, no more siblings<br/>(assuming C3 has no children)"--> EndTraversal["End of 'Begin Work' for this branch<br/>(Complete Work phase begins)"];

    classDef processedNode fill:#e6ffe6,stroke:#004d00,stroke-width:2px;
    class P,C1,C2,C3 processedNode;

    classDef flowArrow stroke:#0066cc,stroke-width:2px;
    linkStyle 0 stroke:#0066cc,stroke-width:2px;
    linkStyle 1 stroke:#0066cc,stroke-width:2px;
    linkStyle 2 stroke:#0066cc,stroke-width:2px;
    linkStyle 3 stroke:#0066cc,stroke-width:2px;