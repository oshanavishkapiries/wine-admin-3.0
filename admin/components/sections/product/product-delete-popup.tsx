import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import { Product } from './columns';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useDeleteProductMutation } from '@/features/api/productSlice';

const ProductDeletePopup = ({ product }: { product: Product }) => {
  const router = useRouter();
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();
  const handleDelete = async () => {
    try {
      await deleteProduct(product._id);
      toast.success('Product deleted successfully');
      router.refresh();
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete product');
    }
  };

  return (
    <>
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 hover:bg-muted text-destructive hover:text-destructive"
            title="Delete product"
          >
            <Trash className="h-4 w-4" />
            <span className="sr-only">Delete product</span>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              product "{product.name}" and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isLoading}
            >
              {isLoading ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductDeletePopup;
