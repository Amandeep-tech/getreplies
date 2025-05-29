export default function Header({ title }: { title: string }) {
    return (
      <header className="px-8 py-4 border-b-2 border-gray-200 bg-white text-black text-xl font-semibold">
        {title}
      </header>
    );
  }