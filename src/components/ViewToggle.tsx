import { useViewStore } from '../store/view-store';
import { LayoutGrid, List } from 'lucide-react';

function ViewToggle() {
  const { viewMode, setViewMode } = useViewStore();

  return (
    <div className='flex items-center bg-gray-200 dark:bg-gray-700 rounded-md p-1'>
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded transition-colors ${
          viewMode === 'grid'
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
        title='Grid view'
      >
        <LayoutGrid className='w-5 h-5' />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded transition-colors ${
          viewMode === 'list'
            ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
            : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200'
        }`}
        title='List view'
      >
        <List className='w-5 h-5' />
      </button>
    </div>
  );
}

export default ViewToggle;
