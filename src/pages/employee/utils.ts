export function getStatusText(status: string) {
  switch (status) {
    case "active":
      return "Đang làm việc";
    case "inactive":
      return "Nghỉ việc";
    default:
      return "Không xác định";
  }
}

export function getStatusTextColor(status: string) {
  switch (status) {
    case "active":
      return "p-1 text-green-600 bg-green-100 rounded-full";
    case "inactive":
      return "p-1 text-red-600 bg-red-100 rounded-full";
    default:
      return "p-1 text-gray-600 bg-gray-100 rounded-full";
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("vi-VN");
}
