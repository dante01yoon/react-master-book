```tsx
export default async function getUser() {
  const res = await fetch(`${API_ENDPOINT}/user`})
  return res.json();
}

// layout.tsx
const user = await getUser();

// page.tsx
const user = await getUser();
```