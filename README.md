# Giải thích về useCallback và useMemo trong dự án

## useCallback

`useCallback` được dùng để tạo ra một hàm ghi nhớ (memoized callback), giúp tránh việc tạo lại hàm mới mỗi lần component render. Điều này rất hữu ích khi truyền hàm xuống các component con, đặc biệt là các component con dùng React.memo hoặc có props phụ thuộc vào callback.

**Ví dụ thực tế trong dự án:**

Trong file `EmployeeTablePage.tsx`, các hàm như `handleEdit`, `handleDelete`, `handleView` đều dùng `useCallback` để đảm bảo hàm không bị tạo lại mỗi lần render, giúp tối ưu hiệu năng và tránh render lại không cần thiết ở các component con.

```tsx
const handleEdit = useCallback((employee: Employee) => {
  setEmployeeForm(employee);
  setIsEditMode(true);
  setIsAddMode(true);
}, []);
```

## useMemo

`useMemo` được dùng để ghi nhớ giá trị tính toán (memoized value), chỉ tính lại khi các dependencies thay đổi. Thường dùng cho các phép tính phức tạp, lọc/sắp xếp dữ liệu, hoặc tạo props phức tạp truyền xuống component con.

**Ví dụ thực tế trong dự án:**

Nếu bạn cần lọc danh sách nhân viên theo nhiều điều kiện, có thể dùng `useMemo` để chỉ tính lại khi dữ liệu hoặc bộ lọc thay đổi:

```tsx
const filteredEmployees = useMemo(() => {
  return employees.filter(emp => emp.status === filterStatus);
}, [employees, filterStatus]);
```

## Tổng kết

- Dùng `useCallback` cho các hàm truyền xuống component con hoặc làm event handler.
- Dùng `useMemo` cho các giá trị tính toán phức tạp, tránh render lại không cần thiết.
# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
