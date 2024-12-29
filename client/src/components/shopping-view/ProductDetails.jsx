import { StarIcon } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Input } from "../ui/input";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, getCart } from "@/store/shop/cart-slice";
import { useToast } from "@/hooks/use-toast";
import { setProductDetails } from "@/store/shop/product-slice";
import { Label } from "../ui/label";
import StarRatingComponent from "../common/StarRating";
import { addReview, getReviews } from "@/store/shop/review-slice";
import { useEffect, useState } from "react";

const ProductDetails = ({ open, setOpen, productDetails }) => {
  if (!open) return null;
  const [reviewMsg, setReviewMsg] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { toast } = useToast();
  const { cartItem } = useSelector(state => state.shopCart);
  const { reviews } = useSelector((state) => state.shopReview);

  console.log(reviews, "reviews");

  function handleRatingChange(getRating) {
    setRating(getRating);
  }

  const handleAddtoCart = (selectedProductId, getTotalStock) => {
    let getCartItems = cartItem?.data?.items || [];
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(item => item.productId === selectedProductId);
      if (indexOfCurrentItem > -1) {
        const getQty = getCartItems[indexOfCurrentItem].qty;
        if (getQty + 1 > getTotalStock) {
          toast({
            title: `only ${getQty} quantity can be added`
          });
          return;
        }
      }
    }
    dispatch(addToCart({ userId: user.id, productId: selectedProductId, qty: 1 }))
      .then((data) => {
        if (data?.payload.success) {
          dispatch(getCart(data?.payload.data.userId));
          toast({
            title: "Product added successfully",
          });
        }
      });
  };

  function handleDialogClose() {
    setOpen(false);
    dispatch(setProductDetails());
    setRating(0);
    setReviewMsg("");
  }

  function handleAddReview() {
    dispatch(
      addReview({
        productId: productDetails?._id,
        userId: user?.id,
        name: user?.name,
        reviewMessage: reviewMsg,
        reviewValue: rating,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        setRating(0);
        setReviewMsg("");
        dispatch(getReviews(productDetails?._id));
        toast({
          title: "Review added successfully!",
        });
      }
    });
  }

  useEffect(() => {
    if (productDetails !== null) dispatch(getReviews(productDetails?._id));
  }, [productDetails]);

  console.log(reviews, "reviews");

  const averageReview =
    reviews && reviews.length > 0
      ? reviews.reduce((sum, reviewItem) => sum + reviewItem.reviewValue, 0) /
        reviews.length
      : 0;

  return (
    <>
      <Dialog open={open} onOpenChange={handleDialogClose} className="bg-white">
        <DialogContent className="grid grid-cols-1 sm:grid-cols-2 gap-8 sm:p-12 max-w-[90vw] sm:max-w-[60vw] lg:max-w-[50vw] xl:max-w-[40vw] bg-white">
          {/* Product Image Section */}
          <div className="relative overflow-hidden rounded-lg sm:w-full max-w-full">
            <img
              src={productDetails?.image}
              alt={productDetails?.title}
              width={600}
              height={600}
              className="aspect-square w-full object-cover"
            />
          </div>

          {/* Product Info Section */}
          <div className="grid gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold">{productDetails?.title}</h1>
              <p className="text-sm sm:text-base text-muted-foreground">{productDetails?.description}</p>

              {/* Rating */}
              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-0.5">
                  <StarRatingComponent rating={averageReview} />
                </div>
                <span className="text-sm sm:text-base text-muted-foreground">
                  ({averageReview.toFixed(2)})
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-center justify-between mt-4">
              <p className="text-2xl sm:text-3xl font-bold text-primary">${productDetails?.price}</p>
            </div>

            {/* Add to Cart Button */}
            {productDetails?.totalStock === 0 ? (
              <Button className="bg-black text-white hover:bg-slate-400 w-full opacity-60 cursor-not-allowed">
                Out Of Stock
              </Button>
            ) : (
              <Button
                onClick={() => handleAddtoCart(productDetails?._id, productDetails?.totalStock)}
                className="w-full bg-black text-white hover:bg-slate-400"
              >
                Add to cart
              </Button>
            )}
          </div>

          {/* Reviews Section */}
          <div className="max-h-[300px] overflow-auto mt-8 sm:mt-10">
            <h2 className="text-xl font-bold mb-4">Reviews</h2>
            <div className="space-y-4">
              {reviews && reviews.length > 0 ? (
                reviews.map((reviewItem) => (
                  <div key={reviewItem?.id} className="flex gap-4">
                    <Avatar className="w-10 h-10 border">
                      <AvatarFallback>
                        {/* {reviewItem?.name[0].toUpperCase()} */}
                      </AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold">{reviewItem?.name}</h3>
                      </div>
                      <div className="flex items-center gap-0.5">
                        <StarRatingComponent rating={reviewItem?.reviewValue} />
                      </div>
                      <p className="text-muted-foreground">{reviewItem?.reviewMessage}</p>
                    </div>
                  </div>
                ))
              ) : (
                <h1>No Reviews</h1>
              )}
            </div>

            {/* Review Submission Form */}
            <div className="mt-10 flex flex-col gap-2">
              <Label>Write a review</Label>
              <div className="flex">
                <StarRatingComponent rating={rating} handleRatingChange={handleRatingChange} />
              </div>
              <Input
                value={reviewMsg}
                onChange={(e) => setReviewMsg(e.target.value)}
                placeholder="Write a review..."
                className="mt-2"
              />
              <Button
                className="bg-black mt-4"
                onClick={handleAddReview}
                disabled={reviewMsg.trim() === ""}
              >
                Submit
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ProductDetails;
