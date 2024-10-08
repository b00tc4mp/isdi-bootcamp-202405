import { useState } from 'react'
import Image from '../library/Image'
import Container from '../library/Container'
import BandList from './BandList'
import LabelList from './LabelList'
import PromotersList from './PromotersList'
import VenuesList from './VenuesList'
import Button from '../library/Button'
import Heading from '../library/Heading'

export default function AllLists({ refreshStamp }) {
    const [visibleList, setVisibleList] = useState(null)

    const handleBandsClick = () => setVisibleList('bands')

    const handleLabelsClick = () => setVisibleList('labels')

    const handlePromotersClick = () => setVisibleList('promoters')

    const handleVenuesClick = () => setVisibleList('venues')

    const handleBackClick = () => setVisibleList(null)

    return <Container className='bg-slate-700 text-slate-300 flex flex-col items-start border-b border--b border-t border--t border-gray-500 ml-2 mr-2'>
        {visibleList === null && (
            <>
                <Heading className='mb-2 mt-2 text-xl font-bold'>lists</Heading>

                <Button onClick={handleBandsClick} className='mb-4 w-full flex self-start'>
                    Band List
                </Button>
                <Button onClick={handleLabelsClick} className='mb-4 w-full flex self-start'>
                    Label List
                </Button>
                <Button onClick={handlePromotersClick} className='mb-4 w-full flex self-start'>
                    Promoters List
                </Button>
                <Button onClick={handleVenuesClick} className='mb-4 w-full flex self-start'>
                    Venues List
                </Button>
            </>
        )}

        {visibleList === 'bands' && (
            <>
                <Button onClick={handleBackClick} className='mt-4 w-full'>
                    <Image src='./back.png' className='w-[15px] h-[15px]' />
                </Button>
                <BandList refreshStamp={refreshStamp} />
            </>
        )}

        {visibleList === 'labels' && (
            <>
                <Button onClick={handleBackClick} className='mt-4 w-full'>
                    <Image src='./back.png' className='w-[15px] h-[15px]' />
                </Button>
                <LabelList refreshStamp={refreshStamp} />
            </>
        )}

        {visibleList === 'promoters' && (
            <>
                <Button onClick={handleBackClick} className='mt-4 w-full'>
                    <Image src='./back.png' className='w-[15px] h-[15px]' />
                </Button>
                <PromotersList refreshStamp={refreshStamp} />
            </>
        )}

        {visibleList === 'venues' && (
            <>
                <Button onClick={handleBackClick} className='mt-4 w-full'>
                    <Image src='./back.png' className='w-[15px] h-[15px]' />
                </Button>
                <VenuesList refreshStamp={refreshStamp} />
            </>
        )}
    </Container>

}