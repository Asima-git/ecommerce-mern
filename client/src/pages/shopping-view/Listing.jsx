import ProductFilter from "@/components/shopping-view/Filter";
import ProductDetails from "@/components/shopping-view/ProductDetails";
import ProductTile from "@/components/shopping-view/ProductTile";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { sortOptions } from "@/config";
import { addToCart, getCart } from "@/store/shop/cart-slice";
import { fetchProduct, getProductDetails } from "@/store/shop/product-slice";
import { ArrowUpDown } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createSearchParams, useSearchParams } from "react-router-dom";
import GuestDialog from "@/components/shopping-view/GuestDialog";

const createSearchParamsHelper = (filterParams) => {
  const queryParams = Object.entries(filterParams)
    .filter(([_, value]) => Array.isArray(value) && value.length > 0)
    .map(([key, value]) => `${key}=${encodeURIComponent(value.join(","))}`);
  return queryParams.join("&");
};

const ShoppingList = () => {
  const [filter, setFilter] = useState({});
  const [sort, setSort] = useState(null);
  const [searParam, setSearchParam] = useSearchParams();
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openGuestDialog, setGuestDialog] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { cartItem } = useSelector((state) => state.shopCart);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { productList, productDetailsListOne } = useSelector(
    (state) => state.shopProducts
  );

  const categorySearchParams = searParam.get("category");

  const handleAddtoCart = (selectedProductId, getTotalStock) => {
    let getCartItems = cartItem?.data?.items || [];
    if (!user?.id) {
      // Trigger Dialog if user is not logged in
      setGuestDialog(true); // Assuming you have a state to control the Dialog
      return;
    }
    if (getCartItems.length) {
      const indexOfCurrentItem = getCartItems.findIndex(
        (item) => item.productId === selectedProductId
      );
      if (indexOfCurrentItem > -1) {
        const getQty = getCartItems[indexOfCurrentItem].qty;
        if (getQty + 1 > getTotalStock) {
          toast({
            title: `Only ${getTotalStock} quantity can be added.`,
          });
          return;
        }
      }
    }
    dispatch(addToCart({ userId: user.id, productId: selectedProductId, qty: 1 }))
      .then((data) => {
        if (data?.payload.success) {
          dispatch(getCart(data?.payload.data.userId));
          toast({ title: "Product added successfully" });
        }
      });
  };

  const handleGetProductDetails = (id) => {
    if (
      !productDetailsListOne ||
      productDetailsListOne.id !== id ||
      productDetailsListOne !== null
    ) {
      dispatch(getProductDetails(id));
      setOpenDetailsDialog(true);
    }
  };

  useEffect(() => {
    if (filter && Object.keys(filter).length > 0) {
      const createQryString = createSearchParamsHelper(filter);
      setSearchParam(new URLSearchParams(createQryString.toString()));
    }
  }, [filter]);

  useEffect(() => {
    if (filter !== null && sort !== null) {
      dispatch(fetchProduct({ filterParams: filter, sortParams: sort }));
    }
  }, [dispatch, sort, filter]);

  const handleSort = (value) => {
    setSort(value);
  };

  const handleFilter = (getSectionId, getCurrentOption) => {
    let copyFilter = { ...filter };
    const indexOfCurrentSection = Object.keys(copyFilter).indexOf(getSectionId);
    if (indexOfCurrentSection === -1) {
      copyFilter = { ...copyFilter, [getSectionId]: [getCurrentOption] };
    } else {
      const indexOfCurrentOption = copyFilter[getSectionId].indexOf(getCurrentOption);
      if (indexOfCurrentOption === -1)
        copyFilter[getSectionId].push(getCurrentOption);
      else copyFilter[getSectionId].splice(indexOfCurrentOption, 1);
    }
    setFilter(copyFilter);
    sessionStorage.setItem("filter", JSON.stringify(copyFilter));
  };

  useEffect(() => {
    setSort("price-lowtohigh");
    setFilter(JSON.parse(sessionStorage.getItem("filter")) || {});
  }, [categorySearchParams]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 p-4 md:p-6">
      <ProductFilter filter={filter} handleFilter={handleFilter} />
      <div className="bg-white w-full shadow-sm">
        <div className="p-4 border-b flex flex-col md:flex-row items-center justify-between gap-4">
          <h2 className="text-lg font-extrabold">All Products</h2>
          <div className="flex items-center gap-2">
            <span>{productList.length} products</span>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-3"
                >
                  <ArrowUpDown />
                  <span>Sort By</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuRadioGroup value={sort} onValueChange={handleSort}>
                  {sortOptions.map((item) => (
                    <DropdownMenuRadioItem value={item.id} key={item.id}>
                      {item.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuRadioGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
          {productList && productList.length > 0
            ? productList.map((productItem) => (
                <ProductTile
                  key={productItem._id}
                  handleAddtoCart={handleAddtoCart}
                  product={productItem}
                  handleGetProductDetails={handleGetProductDetails}
                />
              ))
            : null}
        </div>
      </div>
      <ProductDetails
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        productDetails={productDetailsListOne}
      />
      <GuestDialog
        openGuestDialog={openGuestDialog}
        setGuestDialog={setGuestDialog}
      />
    </div>
  );
};

export default ShoppingList;