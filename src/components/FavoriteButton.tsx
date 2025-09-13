import { useFavoritesStore } from '../store/favorites-store';
import type { User } from '../types/user';
import { Star } from 'lucide-react';
import { Button } from './ui/button';

interface FavoriteButtonProps {
  user: User;
}

function FavoriteButton({ user }: FavoriteButtonProps) {
  const { isFavorite, addToFavorites, removeFromFavorites } =
    useFavoritesStore();
  const isUserFavorited = isFavorite(user.id);

  const handleToggleFavorite = () => {
    if (isUserFavorited) {
      removeFromFavorites(user);
    } else {
      addToFavorites(user);
    }
  };

  return (
    <Button
      onClick={handleToggleFavorite}
      className={`transition-colors text-foreground bg-transparent hover:bg-secondary/80 cursor-pointer`}
      size='icon'
      title={isUserFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star
        className='w-4 h-4 '
        fill={`${isUserFavorited ? 'currentColor' : 'none'}`}
      />
    </Button>
  );
}

export default FavoriteButton;
