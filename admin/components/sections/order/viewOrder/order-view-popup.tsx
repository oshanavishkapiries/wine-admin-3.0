'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Eye } from 'lucide-react';
import type { Order } from '@/types/order';
import { DataTable } from './data-table';
import { columns } from './columns';

export default function ViewOrder({ order }: { order: Order }) {

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatAddress = (address: any) => {
    return (
      <div className="space-y-1">
        <p className="font-medium">{address.fullName}</p>
        <p>{address.streetAddress}</p>
        {address.additionalAddress && <p>{address.additionalAddress}</p>}
        <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
      </div>
    );
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Eye className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="flex flex-col gap-0 p-0 sm:max-h-[min(640px,80vh)] sm:max-w-[800px] [&>button:last-child]:hidden">
        <div className="overflow-y-auto">
          <DialogHeader className="space-y-0 text-left px-6 pt-6">
            <DialogTitle className="flex items-center justify-between">
              <span>Order Details</span>
              <Badge
                className={`${getStatusColor(order.status)} hover:${getStatusColor(order.status)} hover:cursor-default`}
              >
                {order.status}
              </Badge>
            </DialogTitle>
            {/* <DialogDescription className="text-sm text-muted-foreground">
              Last updated {new Date(order?.updatedAt).toLocaleString()}
            </DialogDescription> */}
          </DialogHeader>
          <DialogDescription asChild>
            <div className="p-6 space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-base font-bold text-muted-foreground">
                      Customer Details
                    </h3>
                    <p className="mt-1 font-medium">
                      {`Name : ${order.user.firstName} ${order.user.lastName}`.replace(
                        /\w\S*/g,
                        (txt) =>
                          txt.charAt(0).toUpperCase() +
                          txt.substr(1).toLowerCase()
                      )}
                    </p>
                    <p className="text-sm">Phone : {order.user.email}</p>
                    <p className="text-sm">Mobile : {order.mobileNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-muted-foreground">
                      Payment Information
                    </h3>
                    <div className="mt-1 space-y-1">
                      <p>
                        Method:{' '}
                        <span className="font-medium">
                          {order.paymentMethod}
                        </span>
                      </p>
                      <p>
                        Status:{' '}
                        <Badge
                          className={`${getStatusColor(order.paymentStatus)} hover:${getStatusColor(order.paymentStatus)} hover:cursor-default`}
                          variant="outline"
                        >
                          {order.paymentStatus}
                        </Badge>
                      </p>
                      <p>
                        Amount:{' '}
                        <span className="font-medium">
                          ${order.totalAmount.toFixed(2)}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-muted-foreground">
                    Shipping Address
                  </h3>
                  <div className="mt-1 rounded-lg border p-4">
                    {formatAddress(order?.shippingAddress)}
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-base font-bold text-muted-foreground">
                  Delivery details
                </h3>
                <p className="mt-1 font-medium">
                  Delivery Type : {order.deliveryType}
                </p>
                <p className="text-sm">
                  {order.deliveryType} Date :
                  {order?.deliveryDate
                    ? new Intl.DateTimeFormat('en-US', {
                      year: 'numeric',
                      month: '2-digit',
                      day: '2-digit',
                      hour: '2-digit',
                      minute: '2-digit',
                    }).format(new Date(order.deliveryDate))
                    : 'N/A'}
                </p>
                <br />
                <br />
                <p className="text-sm">
                  Allow Subs: {order?.editable ? 'Yes' : 'No'}
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="mb-4 text-sm font-medium text-muted-foreground">
                  Order Items
                </h3>
                <div className="space-y-4">
                  <DataTable columns={columns} data={order.products} />
                </div>
                <div className="mt-2 space-y-4 text-end">
                  Total Items : &nbsp;
                  {order.products.reduce(
                    (acc, { quantity }) =>
                      acc + quantity,
                    0
                  )}
                  {/* <br />
                  Total Pack : &nbsp;
                  {order.products.reduce(
                    (acc, { quantity, isPack }) =>
                      !isPack ? acc : acc + quantity,
                    0
                  )} */}
                </div>
                <div className="mt-2 space-y-4 text-end">
                  Total Price: $ {order.totalAmount.toFixed(2)}
                </div>
              </div>
            </div>
          </DialogDescription>
          <DialogFooter className="px-6 pb-6 sm:justify-start">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
