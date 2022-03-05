import clsx from 'clsx'
import ResourceTableItem, { ResourceTableItemProps } from './ResourceTableItem'

export interface IResourcesTableListProps {
  list?: ResourceTableItemProps[]
  title?: string;
  columns?: string[]
  onItemRemoved?: (itemName: string) => void
  className?: string
}

const ResourcesTableList = ({ list, title, columns, className, onItemRemoved }: IResourcesTableListProps) => {
  return (
    <div
      className={clsx(
        'flex flex-col',
        'min-w-[270px] w-full',
        'border border-gray-200 rounded-md',
        'pt-3', className
      )}
    >
      {title && <h2 className="font-semibold text-lg mb-3 px-4">{title}</h2>}
      <div
        className={clsx(
          'w-full',
          'border-b border-gray-200',
          'flex items-center justify-between',
          'px-4 pb-2'
        )}
      >
        {columns && columns.map((column, index) => <div key={index} className="w-50%">{column}</div>)}
      </div>
      {list &&
        list?.length > 0 &&
        list.map(({ id, name, quantity, um }: ResourceTableItemProps) => (
          <ResourceTableItem
            id={id}
            key={`${name}_${quantity}`}
            name={name}
            quantity={quantity}
            um={um}
            onDelete={onItemRemoved}
          />
        ))}
    </div>
  )
}

export default ResourcesTableList
