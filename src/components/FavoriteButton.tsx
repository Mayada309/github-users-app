import { useFavoritesStore } from '../store/favorites-store';
import type { User } from '../types/user';
import { Star} from 'lucide-react';

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
          ? 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200 dark:bg-yellow-900 dark:text-yellow-200 dark:hover:bg-yellow-800'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
      }`}
      title={isUserFavorited ? 'Remove from favorites' : 'Add to favorites'}
    >
      <Star
        className='w-4 h-4 mr-1 text-yellow-200'
        fill={`${isUserFavorited ? 'yellow' : 'none'}`}
      />
      {isUserFavorited ? 'Favorited' : 'Favorite'}
    </button>
  );
}

export default FavoriteButton;
