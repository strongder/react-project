
## Các kiến thức đã sử dụng
```ts
  - useState, useEffect, useCallback, React.memo
  - MobX: dùng để lưu trạng thái toàn cục
  - Antdesign, tailwind css 
  - Context: làm chức năng lightmode, darkmode
  - LocalStorage: dùng để lưu thêm
  - router: react-router-dom
```



## Tối ưu hiệu năng với useCallback và React.memo
Project sử dụng useCallback và React.memo để giảm re-render không cần thiết:

- React.memo
	- File: `src/pages/employee/component/EmployeeCard.tsx`
	- Mô tả: `export default React.memo(EmployeeCard)` để thẻ nhân viên không re-render khi props không đổi. (ví dụ khi gọi hàm mở modal xem chi tiết thì các employee-card không bị render lại)

- useCallback
	- Files: `src/pages/employee/EmployeeCardPage.tsx`, `src/pages/employee/EmployeeTablePage.tsx`
	- Các handler được memo hóa: `handleDelete`, `handleEdit`, `handleView`, `handleViewModalClose`.
	- Lý do: giữ ổn định tham chiếu hàm khi truyền xuống component con, giúp `React.memo` phát huy hiệu quả.

Ví dụ:

```tsx
const handleFilterChange = (changed: EmployeeFilterState) => {
    const newFilters = { ...filters, ...changed };
    setFilters(newFilters);
    setSearchQuery((prev) => ({ ...prev, filters: newFilters }));
  };

const handleEdit = useCallback((employee: Employee) => {
    setEmployeeForm(employee);
    setIsEditMode(true);
    setIsAddMode(true);
  }, []);

const handleDelete = useCallback((id: number) => {
	confirm({
		title: "Xác nhận xóa",
		content: "Bạn có chắc chắn muốn xóa nhân viên này không?",
		onOk() { employeeStore.remove(id); },
	});
}, [confirm, employeeStore]);

// component employee-card
const EmployeeCard = () => {

  return (
    <>
    {/* ........... */}
    </>
  )
};

export default React.memo(EmployeeCard);

```

.
