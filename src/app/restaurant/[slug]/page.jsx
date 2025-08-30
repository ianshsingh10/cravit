import { getRestaurantData } from "@/lib/restaurantData"; // We will create this helper
import RestaurantClientPage from "@/Components/restaurant/RestaurantClientPage";

export default async function Page({ params }) {
  const { slug } = await params;
  
  const restaurantData = await getRestaurantData(slug);

  if (!restaurantData) {
    return <div>Restaurant not found.</div>;
  }

  return <RestaurantClientPage data={restaurantData} />;
}
