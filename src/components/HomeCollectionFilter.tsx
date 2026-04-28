/*const HomeCollectionFilter = () => {
  return (
    <div className="max-w-screen-2xl flex items-center justify-between mx-auto mt-24 max-lg:flex-col max-lg:gap-y-5 px-5 max-[400px]:px-3">
      
      <ul className="flex gap-8 items-center text-black text-2xl tracking-[0.72px] max-sm:text-xl max-[450px]:text-lg max-[450px]:gap-2 max-[350px]:text-base">
        <li className="text-black cursor-pointer">All</li>
        <li className="text-secondaryBrown cursor-pointer">Tops</li>
        <li className="text-secondaryBrown cursor-pointer">Dresses</li>
        <li className="text-secondaryBrown cursor-pointer">Shorts</li>
        <li className="text-secondaryBrown cursor-pointer">Jeans</li>
      </ul>
    </div>
  );
};
export default HomeCollectionFilter;
*/

const categories = [
  "All",
  "Home & living",
  "Electronics",
  "Groceries & food",
  "Clothing & accessories",
];

const HomeCollectionFilter = ({
  setCategory,
  activeCategory,
}: {
  setCategory: (category: string) => void;
  activeCategory: string;
}) => {
  return (
    <div className="max-w-screen-2xl flex items-center justify-between mx-auto mt-24 px-5">
      <ul className="flex gap-6 flex-wrap text-lg">
        {categories.map((cat) => (
          <li
            key={cat}
            onClick={() => setCategory(cat)}
            className={`
              px-5 py-2 rounded-full cursor-pointer transition
              ${
                activeCategory === cat
                  ? "bg-secondaryBrown text-white"
                  : "bg-gray-200 text-black hover:bg-gray-300"
              }
            `}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomeCollectionFilter;