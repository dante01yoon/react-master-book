graph TD;
    ParentFiberDiv["ParentFiber for &lt;div&gt;"] -->|child| ChildAFiber["Fiber for &lt;ChildComponentA /&gt;"];
    ChildAFiber -->|sibling| ChildBFiber["Fiber for &lt;ChildComponentB /&gt;"];
    ChildBFiber -->|sibling| ChildCFiber["Fiber for &lt;ChildComponentC /&gt;"];

    ChildAFiber -->|return| ParentFiberDiv;
    ChildBFiber -->|return| ParentFiberDiv;
    ChildCFiber -->|return| ParentFiberDiv;