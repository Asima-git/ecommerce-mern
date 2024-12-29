import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import accountImg from '../../assets/account.jpg';
import { TabsContent } from '@radix-ui/react-tabs';
import Orders from '@/components/shopping-view/Orders';
import Address from '@/components/shopping-view/Address';

const ShoppingAccount = () => {
  return (
    <div className="flex flex-col">
      {/* Header Image */}
      <div className="relative h-[200px] sm:h-[300px] w-full overflow-hidden">
        <img
          src={accountImg}
          alt="Account"
          className="h-full w-full object-cover object-center"
        />
      </div>

      {/* Tabs Section */}
      <div className="container mx-auto grid grid-cols-1 gap-6 px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <div className="flex flex-col rounded-lg border bg-background p-4 sm:p-6">
          <Tabs defaultValue="orders">
            {/* Tabs Header */}
            <TabsList className="flex justify-center space-x-4 sm:space-x-6">
              <TabsTrigger
                value="orders"
                className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium rounded-lg border transition-all hover:bg-gray-100 focus:ring focus:ring-primary"
              >
                Orders
              </TabsTrigger>
              <TabsTrigger
                value="address"
                className="px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-base font-medium rounded-lg border transition-all hover:bg-gray-100 focus:ring focus:ring-primary"
              >
                Address
              </TabsTrigger>
            </TabsList>

            {/* Tabs Content */}
            <TabsContent value="orders" className="mt-4">
              <Orders />
            </TabsContent>
            <TabsContent value="address" className="mt-4">
              <Address />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ShoppingAccount;