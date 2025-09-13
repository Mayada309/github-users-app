import { useViewStore } from '../store/view-store';
import { LayoutGrid, List } from 'lucide-react';

function ViewToggle() {
  const { viewMode, setViewMode } = useViewStore();

  return (
    <div className='flex items-center bg-secondary rounded-md p-1'>
      <button
        onClick={() => setViewMode('grid')}
        className={`p-2 rounded transition-colors ${
          viewMode === 'grid'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title='Grid view'
      >
        <LayoutGrid className='w-5 h-5' />
      </button>
      <button
        onClick={() => setViewMode('list')}
        className={`p-2 rounded transition-colors ${
          viewMode === 'list'
            ? 'bg-background text-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        }`}
        title='List view'
      >
        <List className='w-5 h-5' />
      </button>
    </div>
  );
}

export default ViewToggle;
