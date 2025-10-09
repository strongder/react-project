export const highlightText = (text: string, term: string) => {
  if (!term) return text;

  const regex = new RegExp(`(${term})`, "gi");
  return text.split(regex).map((part, i) =>
    regex.test(part) ? (
      <span key={i} className="bg-yellow-200 px-1 rounded font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
};
