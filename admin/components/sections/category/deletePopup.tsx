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
import { useDeleteSubCategoryMutation } from '@/features/api/categorySlice';
import { useGetMetaQuery } from '@/features/api/metaSlice';
import { Trash } from 'lucide-react';
import { toast } from 'sonner';

const DeletePopup = ({ subCategoryId }: { subCategoryId: string }) => {
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const { refetch } = useGetMetaQuery({});
  const handleDelete = async () => {
    try {
      await deleteSubCategory({ id: subCategoryId });
      toast.success('Sub-category deleted successfully');
      refetch();
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete sub-category');
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 hover:bg-muted text-destructive hover:text-destructive"
          title="Delete sub-category"
        >
          <Trash className="h-4 w-4 text-red-500" />
          <span className="sr-only">Delete sub-category</span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            sub-category.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeletePopup;
