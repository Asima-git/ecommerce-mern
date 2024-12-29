import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Menu, School, ShoppingCart, UserPlus, LogOut } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useSelector, useDispatch } from "react-redux";
import { shoppingViewHeaderMenuItems } from "@/config";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { logoutUser } from "@/store/auth-slice";
import CartWrapper from "./CartWrapper";
import { useEffect, useState } from "react";
import { getCart } from "@/store/shop/cart-slice";
import { Label } from "../ui/label";

const MenuItems = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleNavigate = (getCurrentMenuItem) => {
    sessionStorage.removeItem("filters");
    const currentFilter =
      getCurrentMenuItem.id !== "home" &&
      getCurrentMenuItem.id !== "products" &&
      getCurrentMenuItem.id !== "search"
        ? {
            category: [getCurrentMenuItem.id],
          }
        : null;

    sessionStorage.setItem("filter", JSON.stringify(currentFilter));

    location.pathname.includes("listing") && currentFilter !== null
      ? setSearchParams(
          new URLSearchParams(`?category=${getCurrentMenuItem.id}`)
        )
      : navigate(getCurrentMenuItem.path);
  };

  return (
    <nav className="flex flex-col md:flex-row mb-3 lg:mb-0 lg:items-center gap-6">
      {shoppingViewHeaderMenuItems.map((menuItem) => (
        <Label onClick={() => handleNavigate(menuItem)} key={menuItem.id} className="cursor-pointer">
          {menuItem.label}
        </Label>
      ))}
    </nav>
  );
};

const HeaderRightContent = () => {
  const dispatch = useDispatch();
  const [openCart, setopenCart] = useState(false);
  const { cartItem } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(user?.id);
    if (user?.id) {
      dispatch(getCart(user?.id));
    }
  }, [dispatch, user?.id]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <div className="flex items-center space-x-4">
      {
        user?.id == undefined ? 
        <>
        <Button><Link to='/auth/login'>Login</Link></Button>
        <Button><Link to='/auth/register'>Register</Link></Button>
        </>
         :
        <>
           <Sheet open={openCart} onOpenChange={() => setopenCart(false)}>
        <Button
          onClick={() => setopenCart(true)}
          variant="outline"
          size="icon"
          className="relative border-none"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="bg-black p-1 w-6 h-6 rounded-full text-white absolute top-[-8px] right-0">
            {cartItem?.data?.items?.length}
          </span>
          <span className="sr-only">User Cart</span>
        </Button>
        <CartWrapper
          setopenCart={setopenCart}
          cartItem={
            cartItem.data && cartItem.data.items && cartItem.data.items.length > 0
              ? cartItem.data.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black text-white cursor-pointer">
            <AvatarFallback className="text-white font-extrabold text-base">
              {user?.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Hello {user?.name}!!</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserPlus /> Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
        </>
      }
      {/* <Sheet open={openCart} onOpenChange={() => setopenCart(false)}>
        <Button
          onClick={() => setopenCart(true)}
          variant="outline"
          size="icon"
          className="relative border-none"
        >
          <ShoppingCart className="w-6 h-6" />
          <span className="bg-black p-1 w-6 h-6 rounded-full text-white absolute top-[-8px] right-0">
            {cartItem?.data?.items?.length}
          </span>
          <span className="sr-only">User Cart</span>
        </Button>
        <CartWrapper
          setopenCart={setopenCart}
          cartItem={
            cartItem.data && cartItem.data.items && cartItem.data.items.length > 0
              ? cartItem.data.items
              : []
          }
        />
      </Sheet>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Avatar className="bg-black text-white cursor-pointer">
            <AvatarFallback className="text-white font-extrabold text-base">
              {user?.name[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Hello {user?.name}!!</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => navigate("/shop/account")}>
            <UserPlus /> Account
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={handleLogout}>
            <LogOut /> Logout
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu> */}
    </div>
  );
};

const ShoppingHeader = () => {
  return (
    <header className="sticky top-0 z-40 w-full border-b bg-blue-100">
      <div className="flex h-16 items-center justify-between px-4 md:px-6 lg:px-8">
        {/* Logo Section */}
        <Link to="/home" className="flex items-center gap-2">
          <School className="h-8 w-8" />
          <span className="font-bold">Ecommerce</span>
        </Link>

        {/* Centered Menu for larger devices */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-center">
          <MenuItems />
        </div>

        {/* Cart and User Info Section */}
        <div className="flex items-center space-x-4">
          <HeaderRightContent />
        </div>

        {/* Mobile Menu - Hamburger */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <Menu />
              <span className="sr-only">Toggle Header Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-full max-w-xs bg-white">
            <MenuItems />
            {/* <HeaderRightContent /> */}
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
};

export default ShoppingHeader;
