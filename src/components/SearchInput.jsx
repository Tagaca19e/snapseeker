export default function SearchInput() {
  return (
    <div>
      <div className="mt-1">
        <input
          autocomplete="off"
          placeholder="Search your products"
          type="text"
          name="search"
          className="sm:text-md block w-full rounded-md border-gray-300 shadow-sm focus:border-dark focus:ring-dark"
        />
      </div>
    </div>
  );
}
