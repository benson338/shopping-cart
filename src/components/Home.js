import { CartState, FilterState } from '../contexts/Context';
import Filters from './Filters';
import SingleProduct from './SingleProduct';

function Home() {
  const {
    state: { products },
  } = CartState();

  const {
    filterState: { sort, byStock, byFastDelivery, byRating, searchQuery },
  } = FilterState();

  const transformProducts = () => {
    let sortedProducts = products;

    if (sort) {
      sortedProducts = sortedProducts.sort(
        (a, b) => (sort === 'lowToHigh' ? a.price - b.price : b.price - a.price)
        // a-b ascending & b-a desceding
      );
    }

    if (!byStock) {
      // !byStock => byStock: false by default
      // byStock: true ; if statement ignored
      sortedProducts = sortedProducts.filter((p) => p.inStock);
      // coerction: 0 is considered to be false & is omitted; hence only products inStock are displayed
    }

    if (byFastDelivery) {
      sortedProducts = sortedProducts.filter((p) => p.fastDelivery);
    }

    if (byRating) {
      sortedProducts = sortedProducts.filter((p) => p.ratings >= byRating);
    }

    if (searchQuery) {
      sortedProducts = sortedProducts.filter((p) =>
        p.name.toLowerCase().includes(searchQuery)
      );
    }

    return sortedProducts;
  };

  return (
    <div className="home">
      <Filters />
      <div className="productContainer">
        {transformProducts().map((pro) => (
          <SingleProduct product={pro} key={pro.id} />
        ))}
      </div>
    </div>
  );
}

export default Home;
