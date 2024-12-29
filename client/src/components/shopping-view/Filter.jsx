import React from 'react'
import { filterOptions } from '@/config'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const ProductFilter = ({filter,handleFilter}) => {
  return (
    <div className='bg-amber-50 shadow-sm rounded-lg'>
      <div className='p-4 border-b'>
        <h2 className='font-semibold'>Filters</h2>
      </div>
      <div className='p-4 space-y-4'>
         {
            Object.keys(filterOptions).map((item,index)=>
             <div key={index}>
                <h3 className='text-base font-extrabold'>{item}</h3>
                <div className='grid gap-2 mt-2'>
                 {
                    filterOptions[item].map(option=>
                    <Label className='flex items-center gap-2 font-medium' key={option.id}>
                      <Checkbox onCheckedChange={()=>handleFilter(item,option.id)}
                        checked={
                          filter &&
                          Object.keys(filter).length > 0 &&
                          filter[item] &&
                          filter[item].indexOf(option.id) > -1
                        }
                        />
                      {option.label}
                    </Label>)
                 }
                </div>
                <Separator/>
             </div>
             
            )
         }
      </div>
    </div>
  )
}

export default ProductFilter
