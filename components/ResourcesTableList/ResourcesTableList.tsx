import clsx from 'clsx'
import { listenerCount } from 'process'
import ResourceTableItem, { ResourceTableItemProps } from './ResourceTableItem'

export interface IResourcesTableListProps {
  list?: ResourceTableItemProps[]
}

const ResourcesTableList = ({ list }: IResourcesTableListProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col',
        'min-w-[270px] w-full',
        'border border-gray-200 rounded-md',
        'pt-3'
      )}
    >
      <h2 className="font-semibold text-lg mb-3 px-4">Produse adaugate</h2>
      <div
        className={clsx(
          'w-full',
          'border-b border-gray-200',
          'flex items-center justify-between',
          'px-4 pb-2'
        )}
      >
        <div className="w-50%">Produs</div>
        <div className="w-50%">Cantitate</div>
      </div>
      {list &&
        list?.length > 0 &&
        list.map(({ name, quantity, um }: ResourceTableItemProps) => (
          <ResourceTableItem
            key={`${name}_${quantity}`}
            name={name}
            quantity={quantity}
            um={um}
          />
        ))}
    </div>
  )
}

export default ResourcesTableList
