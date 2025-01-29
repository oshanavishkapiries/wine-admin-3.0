'use client';

import { useEffect, useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  useGetAllOrdersQuery,
  useOrderStatusMutation,
  useUpdateOrderMutation,
} from '@/features/api/orderSlice';
import { useGetAllProductsQuery } from '@/features/api/productSlice';

interface OrderViewDialogProps {
  order: any | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function OrderViewDialog({
  order,
  open,
  onOpenChange,
}: OrderViewDialogProps) {
  const [products, setProducts] = useState<
    Array<{ product: any; quantity: number }>
  >([]);
  const [openSelect, setOpenSelect] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [orderStatus] = useOrderStatusMutation();
  const { refetch } = useGetAllOrdersQuery({
    page: 1,
    limit: 10,
  });
  const { data: allProducts = [] } = useGetAllProductsQuery({
    page: 1,
    limit: 100,
  });
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  useEffect(() => {
    if (order) setProducts([...order.products]);
  }, [order]);

  if (!order) return null;

  const handleQuantityChange = (index: number, change: number) => {
    setProducts((prevProducts) => {
      // Validate index
      if (index < 0 || index >= prevProducts.length) {
        toast.error('Invalid product index');
        return prevProducts;
      }

      const newProducts = [...prevProducts];
      const currentProduct = { ...newProducts[index] }; // Clone the product to maintain immutability

      const currentQuantity = currentProduct.quantity || 0;
      const newQuantity = currentQuantity + change;

      if (newQuantity > currentProduct?.product?.qtyOnHand) {
        toast.error('Quantity exceeds available stock');
        return prevProducts;
      }

      if (newQuantity > 0) {
        currentProduct.quantity = newQuantity;
        newProducts[index] = currentProduct; // Replace the product with the updated one
      } else {
        toast.error("Can't set quantity to zero or below");
        return prevProducts;
      }
      return newProducts;
    });
  };

  const handelAddNewProduct = (value: any) => {
    setSearchQuery('');
    const product = allProducts.find((product: any) => product.name === value);

    if (!product) {
      toast.error('Product not found');
      return;
    }

    // check product already exist
    const productExists = products.some(
      (item) => item.product._id === (product as any)?._id
    );
    if (productExists) {
      toast.error('Product already added');
      return;
    }

    const newProduct = {
      product: product,
      quantity: 1,
    };
    setProducts([...products, newProduct]);
  };

  const handleDelete = (index: number) => {
    const newProducts = products.filter((_, i) => i !== index);
    setProducts(newProducts);
  };

  const handelClose = (data: boolean = false) => {
    refetch();
    onOpenChange(data);
  };

  const handleSave = async () => {
    const updatedData = { ...order, products };
    try {
      const response = await updateOrder({
        orderId: order?._id,
        updates: updatedData,
      }).unwrap();
      if (response) {
        toast.success('Order updated successfully');
        handelClose();
      }
    } catch (error: any) {
      toast.error(`Failed to update order: ${error.message}`);
    }
  };

  const handelChangeOrderStatus = (status: string) => {
    orderStatus({ orderId: order?._id, data: { status } })
      .unwrap()
      .then(() => {
        toast.success('Order status updated successfully');
        // refetch();
      })
      .catch((error) => {
        toast.error(`Failed to update order status: ${error.message}`);
      });
  };

  return (
    <Dialog open={open} onOpenChange={handelClose}>
      <DialogContent className="max-w-md">
        <div className="space-y-4">
          <div className="text-lg">
            <span className="font-black">Order Details</span>
          </div>
          <div className="space-y-2">
            <div className="text-sm">
              <span className="font-medium">User Name: </span>
              {order.user.firstName} {order.user.lastName}
            </div>
            <div className="text-sm">
              <span className="font-medium">User Email: </span>
              {order.user.email || 'N/A'}
            </div>
            <div className="text-sm">
              <span className="font-medium">Order status: </span>
              {order.status || 'N/A'}
            </div>
            <div className="text-sm">
              <span className="font-medium">Allow substitutions: </span>
              {order.editable ? 'Yes' : 'No'}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Status:</label>
            <Select
              onValueChange={(value) => {
                handelChangeOrderStatus(value);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Change Order Status" />
              </SelectTrigger>
              <SelectContent>
                {['pending', 'delivered', 'cancelled'].map((status) => (
                  <SelectItem
                    key={status}
                    defaultValue={'pending'}
                    value={status}
                  >
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2 relative">
            <Input
              placeholder="Search product"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenSelect(true);
              }}
              onClick={() => setOpenSelect(!openSelect)}
              className="w-full relative z-10"
            />

            {openSelect && (
              <ul className="absolute z-20 w-full bg-background border  shadow-md rounded-md max-h-48 overflow-auto">
                {allProducts
                  .filter((product) =>
                    product?.name
                      ?.toLowerCase()
                      .includes(searchQuery.toLowerCase())
                  )
                  .map((product) => (
                    <li
                      key={(product as any)?._id}
                      className="p-2 cursor-pointer transition-colors hover:bg-foreground hover:text-background"
                      onClick={() => {
                        handelAddNewProduct(product?.name);
                        setSearchQuery(product?.name);
                        setOpenSelect(false);
                      }}
                    >
                      {product?.name}
                    </li>
                  ))
                  .concat(
                    searchQuery.length > 0 &&
                      !allProducts.some((product) =>
                        product?.name
                          ?.toLowerCase()
                          .includes(searchQuery.toLowerCase())
                      ) ? (
                      <li className="p-2 text-gray-500">Product not found</li>
                    ) : (
                      []
                    )
                  )}
              </ul>
            )}
          </div>

          <div className="space-y-2">
            {products.map((product: any, index: number) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-lg border p-2"
              >
                <span className="text-sm">
                  {product?.product?.name || `Product ${index + 1}`}
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleQuantityChange(index, -1)}
                  >
                    <Minus className="h-3 w-3" />
                    <span className="sr-only">Decrease quantity</span>
                  </Button>
                  <span className="w-8 text-center text-sm">
                    {product.quantity || 1}
                  </span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => handleQuantityChange(index, 1)}
                  >
                    <Plus className="h-3 w-3" />
                    <span className="sr-only">Increase quantity</span>
                  </Button>
                  <Button
                    variant="ghost"
                    className="h-6 px-2 text-sm font-normal text-red-500 hover:text-red-600"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-2 pt-4">
            <Button variant="secondary" onClick={() => handelClose(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>
              {isUpdating ? 'Loading...' : 'Save'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
