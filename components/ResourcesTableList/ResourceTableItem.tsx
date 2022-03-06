import clsx from 'clsx'
import React from 'react'
import Image from '../Image'

export type ResourceTableItemProps = {
  id: string
  name: string
  quantity?: number
  um?: string
  onDelete?: (itemName: string) => void
}

const ResourceTableItem = ({ id, name, quantity, um, onDelete }: ResourceTableItemProps) => {
  return (
    <div
      className={clsx(
        'flex items-center justify-between',
        'border-b border-gray-200 last:border-b-0',
        'w-full',
        'px-4 py-3'
      )}
    >
      <div className="w-50%">{name}</div>
      <div className="w-50% flex items-center">
        {quantity && um && <span className="mr-3">{`${quantity} ${um}`}</span>}
        {onDelete &&
          <button onClick={() => onDelete(id)}>
            <Image alt="delete_icon" src="/icons/delete.svg" />
          </button>
        }
      </div>
    </div>
  )
}

export default ResourceTableItem
