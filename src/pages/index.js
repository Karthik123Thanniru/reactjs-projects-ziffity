import Link from 'next/link';
import axios from 'axios';
import { PRODUCT_LIST_QUERY } from '../queries/graphqlQueries';

function HomePage({ products }) {
  return (
    <div>
      <h1>Product List</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {products.map((product) => (
          <div key={product.sku} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <img src={product.image.url} alt={product.image.label} style={{ width: '100%' }} />
            <h3>
              <Link href={`/${encodeURIComponent(product.name.replace(/\s+/g, '-'))}`}>
                {product.name}
              </Link>
            </h3>
            <p>
              Price: {product.price_range.minimum_price.final_price.value} {product.price_range.minimum_price.final_price.currency}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export async function getStaticProps() {
  try {
    const response = await axios.post(
      process.env.MAGENTO_GRAPHQL,
      {
        query: PRODUCT_LIST_QUERY,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    const { data } = response.data;
    return {
      props: {
        products: data.products.items,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error.message);
    return {
      props: {
        products: [],
      },
    };
  }
}

export default HomePage;
