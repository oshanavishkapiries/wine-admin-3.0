'use client';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, Gift, Star, Package, Loader2 } from 'lucide-react';
import { useGetAProductQuery } from '@/features/api/productSlice';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Page = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  const { data: product, isLoading } = useGetAProductQuery(id);

  console.log('product', product?.data);
  const router = useRouter();

  if (isLoading)
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <Loader2 className="w-10 h-10 animate-spin" />
      </div>
    );

  return (
    <div className="w-full h-full p-3">
      <div className="w-full flex flex-col">
        <div className="flex items-center gap-5">
          <Button variant="outline" onClick={() => router.back()}>
            <ArrowLeftIcon className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold uppercase">Add Product</h1>
        </div>

        <div className="container mx-auto py-8 px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column - Image */}
            <div className="relative aspect-square">
              <Image
                src={product?.data?.image || '/placeholder.svg'}
                alt={product?.data?.name || ''}
                fill
                className="object-cover rounded-lg"
              />
            </div>

            {/* Right Column - Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold">{product?.data?.name}</h1>
                <p className="text-muted-foreground mt-2">
                  {product?.data?.description}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  {Array.from({ length: product?.data?.rating || 0 }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    )
                  )}
                </div>
                {product?.data?.isGreatForGift && (
                  <Badge className="bg-secondary text-white">
                    <Gift className="w-4 h-4 mr-1" />
                    Great for Gift
                  </Badge>
                )}
              </div>

              <Card>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold">
                      ${product?.data?.unitPrice}
                    </span>
                    <Badge
                      className={`${product?.data?.inStock ? 'bg-green-500' : 'bg-red-500'} text-white`}
                    >
                      {product?.data?.inStock ? 'In Stock' : 'Out of Stock'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Quantity on hand: {product?.data?.qtyOnHand}
                  </p>
                </CardContent>
              </Card>

              <Separator />

              {/* Wine Details */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Wine Details</h2>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">Vintage</p>
                    <p className="font-medium">
                      {product?.data?.vintage?.year}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">ABV</p>
                    <p className="font-medium">{product?.data?.abv}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Dryness</p>
                    <p className="font-medium">
                      {product?.data?.dryness?.name}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Size</p>
                    <p className="font-medium">{product?.data?.size?.name}</p>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Region Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Region</h2>
                <div className="space-y-2">
                  <p>
                    <span className="text-sm text-muted-foreground">
                      Country:{' '}
                    </span>
                    <span className="font-medium">
                      {product?.data?.country?.name}
                    </span>
                  </p>
                  <p>
                    <span className="text-sm text-muted-foreground">
                      Region:{' '}
                    </span>
                    <span className="font-medium">
                      {product?.data?.regions?.region}
                    </span>
                  </p>
                  <p>
                    <span className="text-sm text-muted-foreground">
                      Sub-region:{' '}
                    </span>
                    {/* <span className="font-medium">
                      {product?.data?.regions.subRegion.map((subRegion) => subRegion.name).join(', ')}
                    </span> */}
                  </p>
                </div>
              </div>

              <Separator />

              {/* Categories and Types */}
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Categories</h2>
                <div className="space-y-2">
                  <p>
                    <span className="text-sm text-muted-foreground">
                      Category:{' '}
                    </span>
                    <span className="font-medium">
                      {product?.data?.categories?.name}
                    </span>
                  </p>
                  <p>
                    <span className="text-sm text-muted-foreground">
                      Sub-category:{' '}
                    </span>
                    {/* <span className="font-medium">
                      {product?.data?.categories.subCategories.name}
                    </span> */}
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-muted-foreground">Type:</span>
                  {product?.data?.type.map((type, index) => (
                    <Badge key={index}>
                      {type.name}
                    </Badge>
                  ))}
                </div>
              </div>

              {product?.data?.isPack && (
                <>
                  <Separator />
                  <div className="flex items-center gap-2">
                    <Package className="w-5 h-5" />
                    <span>This item is sold as a pack</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
