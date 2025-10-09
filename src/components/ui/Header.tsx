const Header = ({ content }: { content: string }) => {
  return (
    <header className="bg-blue-600 text-white p-6 rounded-b-lg shadow-md mb-6 text-center text-3xl font-semibold">
      {content}
    </header>
  );
};

export default Header;
