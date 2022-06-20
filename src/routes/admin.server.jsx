import { useShopQuery, gql, CacheLong } from "@shopify/hydrogen";

export default function AdminRedirect({ response }) {
  const { data } = useShopQuery({
    query: SHOP_QUERY,
    cache: CacheLong(),
  });

  const { url } = data.shop.primaryDomain;
  return response.redirect(`${url}/admin`);
}

const SHOP_QUERY = gql`
  query {
    shop {
      primaryDomain {
        url
      }
    }
  }
`;
