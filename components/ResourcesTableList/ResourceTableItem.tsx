import clsx from 'clsx'
import React from 'react'
import Image from '../Image'

export type ResourceTableItemProps = {
  name: string
  quantity: string
  um?: string
}

const ResourceTableItem = ({ name, quantity, um }: ResourceTableItemProps) => {
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
        <span className="mr-3">{`${quantity} ${um}`}</span>
        <Image alt="delete_icon" src="/icons/delete.svg" />
      </div>
    </div>
  )
}

export default ResourceTableItem
