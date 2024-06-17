import { useGetRestaurantById } from "@/api/ResturantApi";
import MenuItem from "@/components/MenuItem";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useParams } from "react-router-dom";

function DetailPage() {
  const { restaurantId } = useParams();

  const { resturant, isLoading } = useGetRestaurantById(restaurantId);

  if (isLoading || !resturant) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col gap-10 ">
      <AspectRatio ratio={16 / 5}>
        <img
          src={resturant.imageUrl}
          alt={resturant.restaurantName}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
        <div className="flex flex-col gap-4">
          <RestaurantInfo restaurant={resturant} />
          <span className="text-2xl font-bold tracking-tight">Menu</span>
          {resturant.menuItems.map((menuItem) => (
            <MenuItem
              menuItem={menuItem}
              // addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;