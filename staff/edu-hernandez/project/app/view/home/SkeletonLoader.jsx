import Container from '../library/Container'

export default function SkeletonLoader() {
    // console.debug('SkeletonLoader -> call')
    
    return (
        <main className="flex flex-col p-5 items-center gap-4 bg-white dark:bg-background_grey">

            <Container className="w-full h-240 bg-dark_white dark:bg-background_light_grey animate-pulse"></Container>

            <Container className="w-full h-8 bg-dark_white dark:bg-background_light_grey animate-pulse mt-6"></Container>

            <Container className="w-full h-80 bg-dark_white dark:bg-background_light_grey animate-pulse"></Container>

            <Container className="w-full h-8 bg-dark_white dark:bg-background_light_grey animate-pulse mt-6"></Container>

            <Container className="w-full h-40 bg-dark_white dark:bg-background_light_grey animate-pulse"></Container>

            <Container className="w-full h-64 bg-dark_white dark:bg-background_light_grey animate-pulse mt-6"></Container>

            <Container className="w-full h-8 bg-dark_white dark:bg-background_light_grey animate-pulse mt-6"></Container>

            <Container className="w-full h-40 bg-dark_white dark:bg-background_light_grey animate-pulse"></Container>

            <Container className="w-full h-8 bg-dark_white dark:bg-background_light_grey animate-pulse mt-6"></Container>

            <Container className="w-full h-40 bg-dark_white dark:bg-background_light_grey animate-pulse"></Container>

        </main>
    )
}