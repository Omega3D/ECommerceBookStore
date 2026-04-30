export const Filters = () => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg sticky top-6">
      <h3 className="font-bold text-lg mb-4">Filters</h3>
      {/* Додайте ваші поля фільтрації */}
      <input
        type="text"
        placeholder="Search by title..."
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="number"
        placeholder="Min price"
        className="w-full p-2 border rounded mb-3"
      />
      <input
        type="number"
        placeholder="Max price"
        className="w-full p-2 border rounded mb-3"
      />
      <button className="w-full bg-blue-600 text-white py-2 rounded">
        Apply Filters
      </button>
    </div>
  );
};
