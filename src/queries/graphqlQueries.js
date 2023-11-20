const PRODUCT_LIST_QUERY = `
  query {
    products(
      filter: { category_id: { eq: "4" } },
      sort: { name: ASC },
      pageSize: 14,
      currentPage: 1
    ) {
      total_count
      items {
        name
        sku
        image {
          url
          label
        }
        price_range {
          minimum_price {
            final_price {
              value
              currency
            }
          }
        }
      }
    }
  }
`;

export { PRODUCT_LIST_QUERY };
