'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card } from '@/components/ui/card';
import { MapPin, Phone, Globe, Mail } from 'lucide-react';
import { DataTable } from './data-table';
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { getOrderData } from '@/utils/orderDataUtils';

const CompanyAddress = () => {
  return (
    <div className="max-w-sm space-y-2 print:space-y-1">
      <h2 className="text-lg font-semibold print:text-base">Company Address</h2>
      <div className="flex items-start gap-2">
        <MapPin className="w-5 h-5 print:w-5 print:h-5" />
        <p>2517 Broadway, New York, NY 10025</p>
      </div>
      <div className="flex items-start gap-2">
        <Phone className="w-5 h-5 print:w-4 print:h-4" />
        <p>(212) 932-0990</p>
      </div>
      <div className="flex items-start gap-2">
        <Globe className="w-5 h-5 print:w-4 print:h-4" />
        <p>www.gothamwines.com</p>
      </div>
      <div className="flex items-start gap-2">
        <Mail className="w-5 h-5 print:w-4 print:h-4" />
        <p>gothamw.work@gmail.com</p>
      </div>
    </div>
  );
};

const ShippingData = ({
  address,
  mobile,
  email,
}: {
  address: any;
  mobile: string;
  email: string;
}) => {
  return (
    <div className="max-w-sm space-y-2 print:space-y-1 print:border-l-2 print:border-gray-200 print:pl-2">
      <h2 className="text-lg font-semibold print:text-base">Shipping Information</h2>
      <div className="flex items-start gap-2">
        <MapPin className="w-5 h-5 print:w-5 print:h-5" />
        <div>
          <p>{address.fullName}</p>
          <p>{address.streetAddress}</p>
          {address.additionalAddress && <p>{address.additionalAddress}</p>}
          <p>{`${address.city}, ${address.state} ${address.zipCode}`}</p>
        </div>
      </div>
      <div className="flex items-start gap-2">
        <Phone className="w-5 h-5 " />
        <p>{mobile}</p>
      </div>
      <div className="flex items-start gap-2">
        <Mail className="w-5 h-5 " />
        <p>{email}</p>
      </div>
    </div>
  );
};

const OrderInvoiceClient: React.FC<any> = ({ order }) => {
  const router = useRouter();

  const [orderData, setOrderData] = useState<any>(null);
  // Second useEffect to calculate order data
  useEffect(() => {
    if (!order) return;

    const fetchOrderData = async () => {
      try {
        const data = await getOrderData({ order: { ...order } });
        console.log(data);
        setOrderData(data);
      } catch (error) {
        console.error('Error calculating order data:', error);
      }
    };

    fetchOrderData();
  }, [order]);

  return (
    <div className="min-h-screen p-6 print:p-1 font-sans flex flex-col gap-5 print:gap-2">
      <Button
        className="w-fit print:hidden"
        onClick={() => router.push('/orders')}
      >
        Back
      </Button>
      <h3 className="text-center print:mb-2">Order number : {order?._id}</h3>

      {/* header image section */}
      <div className="grid grid-cols-3">
        <div>
          <Image
            src="https://tse4.mm.bing.net/th?id=OIP.mpGAb2hg3Q5VY5CWEp3_6QHaHa&pid=Api&P=0&h=220" // Replace with your image URL
            alt="Descriptive Alt Text"
            width={75} // Desired width of the image
            height={75} // Desired height of the image
            priority // Optionally set this to optimize above-the-fold images
          />
        </div>
        <div></div>
        <Card className="w-full p-6 print:p-2 print:border-none print:shadow-none flex flex-col gap-2">
          <span>Order Number : {order?._id}</span>
          <span>
            Order Date :{' '}
            {new Intl.DateTimeFormat('en-US', {
              day: '2-digit',
              month: '2-digit',
              year: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
              second: '2-digit',
            }).format(new Date())}
          </span>
        </Card>
      </div>

      {/* company address and shipping data section */}
      <Card className="w-full p-3 print:p-2 print:rounded-none print:shadow-none print:border-gray-200 grid grid-cols-2">
        <CompanyAddress />
        <ShippingData
          address={order?.shippingAddress}
          mobile={order?.mobileNumber}
          email={order?.user?.email}
        />
      </Card>


      <Card className="w-full p-3 print:text-sm print:p-1 print:rounded-none print:shadow-none print:border-gray-200">
        <p>
          Requested Ship Date :{' '}
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
      </Card>

      <Card className="w-full p-3 print:p-1 print:text-sm print:rounded-none print:shadow-none print:border-gray-200">
        <p>
          Special Instructions :{' '}
          {order?.userComments
            ? order?.userComments
            : 'No Special Instructions'}
        </p>
      </Card>

      <Card className="w-full p-3 print:p-1 print:text-sm print:rounded-none print:shadow-none print:border-gray-200">
        <p>Allow Subs. : {order?.editable ? 'Yes' : 'No'}</p>
      </Card>

      <DataTable columns={columns} data={order?.products || []} />

      <div className="grid grid-cols-3">
        <div></div>
        <div></div>
        <Card className="w-full p-3 flex flex-col gap-0.5 print:p-2 print:rounded-none print:shadow-none print:border-gray-200">
          <span>Subtotal : ${orderData?.subtotal}</span>
          <span>Tax : ${orderData?.tax?.tax}</span>
          <span>Shipping : ${(0.0).toFixed(2)}</span>
          <span>Total Discount : ${orderData?.totalDiscount}</span>
          <span>Total : ${order?.totalAmount}</span>
          <span>
            Total Items : &nbsp;
            {order.products.reduce(
              (acc: number, { quantity }: any) =>
                 acc + quantity,
              0
            )}
          </span>
          {/* <span>
            Total Pack : &nbsp;
            {order.products.reduce(
              (acc: number, { quantity, isPack }: any) =>
                !isPack ? acc : acc + quantity,
              0
            )}
          </span> */}
        </Card>
      </div>
    </div>
  );
};

export default OrderInvoiceClient;
