import { FaSearch } from 'react-icons/fa';

interface SearchBarProps {
  onSearch: (value: string) => void;
}

export default function SearchBar({ onSearch }: SearchBarProps) {
  return (
    <div className="flex items-center mb-4 bg-gray-900 rounded-lg p-2 shadow-md">
      <FaSearch className="text-gray-400 ml-2" />
      <input
        type="text"
        placeholder="Ara..."
        onChange={(e) => onSearch(e.target.value)}
        className="flex-1 bg-transparent border-none outline-none text-white ml-2 placeholder-gray-500"
      />
    </div>
  );
}
