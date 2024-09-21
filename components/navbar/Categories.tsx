"use client"
import React from 'react'
import Container from '../Container'
import { TbBeach, TbMountain, TbPool } from 'react-icons/tb'
import { GiBarn, GiBoatFishing, GiCactus, GiCastle, GiCaveEntrance, GiForestCamp, GiIsland, GiWindmill } from 'react-icons/gi'
import { MdOutlineVilla } from 'react-icons/md'
import CategoryBox from '../CategoryBox'
import { usePathname, useSearchParams } from 'next/navigation'
import { FaSkiing } from 'react-icons/fa'
import { BsSnow } from 'react-icons/bs'
import { IoDiamond } from 'react-icons/io5'

export const categories = [
    {
        label: 'Beach',
        icon: TbBeach,
        description:'This property is close to the beach!'
    },
    {
        label: 'Windmills',
        icon: GiWindmill,
        description:'This property has WindMills!'
    },
    {
        label: 'Modern',
        icon: MdOutlineVilla,
        description:'This property is near to Modern villa!'
    },
    {
        label: 'Countryside',
        icon: TbMountain,
        description:'This property is near to Country side!'
    },
    {
        label: 'Pools',
        icon: TbPool,
        description:'This property is near to the Tb poolss!'
    },
    {
        label: 'Islands',
        icon: GiIsland,
        description:'This property is the gi Island description!'
    },
    {
        label: 'Lake',
        icon: GiBoatFishing,
        description:'This property of Lake and close to fishing!'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description:'This property is close to lake and skiing'
    },
    {
        label: 'Castles',
        icon: GiCastle,
        description:'This property is close to archaic castles'
    },
    {
        label: 'Camping',
        icon: GiForestCamp,
        description:'This property is close to camping activities!'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description:'This property is close to arctic places'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description:'This property is close for Cave interance  '
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description:'This property is the desert!  '
    },
    {
        label: 'Barns',
        icon: GiBarn,
        description:'This property is the Barn!  '
    },
    {
        label: 'Lux',
        icon: IoDiamond,
        description:'This property is the founding Unique luxurous!  '
    },
]
const Categories = () => {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if(!isMainPage){
        return null;
    }

    
  return (
    <Container>
        <div className="
              pt-4
              flex
              flex-row
              items-center
              justify-between
              overflow-x-auto
        ">
            {
                categories.map(item => (
                    <CategoryBox 
                        key={item.label} 
                        label={item.label} 
                        icon={item.icon}
                        selected={category === item.label}
                        // description={category.description}
                      />
                ))
            }

        </div>
    </Container>
  )
}

export default Categories