import Heading from '../library/Heading'
import Container from '../library/Container'
import SearchHCP from './SearchHCP'
import ResultsHCPList from './ResultsHCPList'

export default function MapSection() {
    return <>
        <section className="flex flex-col justify-center items-center gap-7 mb-6 z-40">
            <Container className="flex flex-col items-center h-28">
                <Heading className="text-[#C900CD] text-[20px] font-bold text-center mt-2">LGBTQI+ friendly healthcare providers</Heading>
                <SearchHCP />
            </Container>
        </section >

        <ResultsHCPList />
    </>
}