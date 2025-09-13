import { useFavoritesStore } from '../store/favorites-store';
import type { User } from '../types/user';
import { Star } from 'lucide-react';

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
    <button
      onClick={handleToggleFavorite}
      className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium transition-colors ${
        isUserFavorited
          ? 'bg-accent text-accent-foreground hover:bg-accent/90'
          : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
      }`}
      title={isUserFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star
        className='w-4 h-4 mr-1'
        fill={`${isUserFavorited ? 'currentColor' : 'none'}`}
      />
      {isUserFavorited ? 'Favorited' : 'Favorite'}
    </button>
  );
}

export default FavoriteButton;
