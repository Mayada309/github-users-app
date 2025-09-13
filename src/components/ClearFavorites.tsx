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
} from './ui/alert-dialog';
import { Button } from './ui/button';
import { useFavoritesStore } from '../store/favorites-store';

function ClearFavorites() {
  const { clearFavorites } = useFavoritesStore();

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant='secondary' className='cursor-pointer'>
          clear favorites
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-foreground'>
            Clear all favorites
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete all your
            favorites.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className='text-foreground bg-transparent hover:text-foreground cursor-pointer'>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={clearFavorites} className='cursor-pointer'>Clear</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ClearFavorites;
