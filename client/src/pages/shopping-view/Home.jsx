import { Button } from '@/components/ui/button';
import bannerOne from '../../assets/banner-1.webp';
import bannerTwo from '../../assets/banner-2.webp';
import bannerThree from '../../assets/banner-3.webp';
import { BabyIcon, ChevronsLeftIcon, ChevronsRightIcon, ShirtIcon, UmbrellaIcon, WatchIcon, Footprints } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProduct } from '@/store/shop/product-slice';
import ProductTile from '@/components/shopping-view/ProductTile';
import { useNavigate } from 'react-router-dom';
import { addToCart, getCart } from '@/store/shop/cart-slice';
import GuestDialog from '@/components/shopping-view/GuestDialog';

const ShoppingHome = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slides = [bannerOne, bannerTwo, bannerThree];
  const { productList } = useSelector((state) => state.shopProducts);
  const { cartItem } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [openGuestDialog, setGuestDialog] = useState(false);

  const categoriesWithIcons = [
    { id: 'men', label: 'Men', icon: ShirtIcon },
    { id: 'women', label: 'Women', icon: ShirtIcon },
    { id: 'kids', label: 'Kids', icon: BabyIcon },
    { id: 'accessories', label: 'Accessories', icon: WatchIcon },
    { id: 'footwear', label: 'Footwear', icon: UmbrellaIcon },
  ];

  const brandWithIcons = [
    { id: 'nike', label: 'Nike', icon: Footprints },
    { id: 'adidas', label: 'Adidas', icon: Footprints },
    { id: 'puma', label: 'Puma', icon: Footprints },
    { id: 'levi', label: "Levi's", icon: Footprints },
    { id: 'zara', label: 'Zara', icon: Footprints },
    { id: 'h&m', label: 'H&M', icon: Footprints },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 15000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    dispatch(fetchProduct({ filterParams: {}, sortParams: 'price-lowtohigh' }));
  }, [dispatch]);

   const handleAddtoCart = (selectedProductId, getTotalStock) => {
      let getCartItems = cartItem?.data?.items || [];
      if (!user?.id) {
        setGuestDialog(true);
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

  const handleRedirect = (getCurrentItem, section) => {
    sessionStorage.removeItem('filter');
    const currentFilter = {
      [section]: [getCurrentItem.id],
    };
    sessionStorage.setItem('filter', JSON.stringify(currentFilter));
    navigate(`/shop/listing`);
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Banner Section */}
      <div className="relative w-full h-[300px] md:h-[500px] lg:h-[600px] overflow-hidden">
        {slides.map((slide, index) => (
          <img
            src={slide}
            key={index}
            className={`${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            } absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000`}
          />
        ))}
        <Button
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide - 1 + slides.length) % slides.length)}
          variant="outline"
          size="icon"
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronsLeftIcon className="w-4 h-4" />
        </Button>
        <Button
          onClick={() => setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length)}
          variant="outline"
          size="icon"
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-white/80"
        >
          <ChevronsRightIcon className="w-4 h-4" />
        </Button>
      </div>

      {/* Shop by Category Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categoriesWithIcons.map((categoryItem) => (
              <Card
                key={categoryItem.id}
                onClick={() => handleRedirect(categoryItem, 'category')}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <categoryItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold text-sm md:text-base">{categoryItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Shop by Brand Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Shop by Brand</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {brandWithIcons.map((brandItem) => (
              <Card
                key={brandItem.id}
                onClick={() => handleRedirect(brandItem, 'brand')}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="flex flex-col items-center justify-center p-6">
                  <brandItem.icon className="w-12 h-12 mb-4 text-primary" />
                  <span className="font-bold text-sm md:text-base">{brandItem.label}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Featured Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {productList && productList.length > 0
              ? productList.map((productItem) => (
                  <ProductTile
                    key={productItem._id}
                    handleAddtoCart={handleAddtoCart}
                    product={productItem}
                  />
                ))
              : null}
          </div>
        </div>
      </section>
      <GuestDialog
        openGuestDialog={openGuestDialog}
        setGuestDialog={setGuestDialog}
      />
    </div>
  );
};

export default ShoppingHome;
