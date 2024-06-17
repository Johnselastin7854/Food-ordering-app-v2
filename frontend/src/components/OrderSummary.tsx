import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "@radix-ui/react-separator";

type Props = {
  resturant: Restaurant;
  cartItems: CartItem[];
};

const OrderSummary = ({ resturant, cartItems }: Props) => {
  const getTotalCost = () => {
    const totalInPrice = cartItems.reduce(
      (total, cartItem) => total + cartItem.price * cartItem.quantity,
      0
    );

    const totalDeliveryPrice = totalInPrice + resturant.deliveryPrice;

    return (totalDeliveryPrice / 100).toFixed(2);
  };
  return (
    <>
      <CardHeader>
        <CardTitle className="tracking-tight flex justify-between text-2xl font-bold">
          <span>Your Order</span>
          <span>₹ {getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>
              <Badge variant={"outline"} className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              ₹ {((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>₹ {(resturant.deliveryPrice / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
};

export default OrderSummary;
