"use  client"
import { useRouter, useSearchParams } from 'next/navigation'
import qs from 'query-string'
import React, { useCallback } from 'react'
import { IconType } from 'react-icons'

interface CategoryBoxProps {
    icon: IconType,
    label: string,
    selected?: boolean
}

const CategoryBox: React.FC<CategoryBoxProps> = ({
    icon: Icon,
    label,
    selected,

}) => {
    const router = useRouter();
    const params = useSearchParams();

    // when click on a category
    const handleClick = useCallback(()=>{
        // init a query
        let currentQuery = {};

        // if params have value then update currentQuery with parsed params
        if(params){
            currentQuery = qs.parse(params.toString());
        }

        // an updatedQuery with category value
        const udpatedQuery: any = {
            ...currentQuery,
            category: label
        }

        // if the category is already selected, remove it from the query
        if(params?.get('category') === label){
            delete udpatedQuery.category;
        }

         const url = qs.stringifyUrl({
            url: '/',
            query: udpatedQuery
        },{
            skipNull: true
        })

        router.push(url)
    },[label, params, router])
    return (
        <div onClick={handleClick} className={`
             flex flex-col items-center justify-center gap-2 p-3 border-b-2 hover:text-neutral-800 transition cursor-pointer
              ${selected ? 'border-b-neutral-800' : 'border-transparent'}
              ${selected ? 'text-neutral-800' : 'text-neutral-500'}
               `}
               >
                <Icon size={26} />
            <div className='font-medium text-sm'>{label}</div>


        </div>
    )
}

export default CategoryBox