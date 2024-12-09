import { useState, useEffect } from 'react';

import logic from '../../logic';

import Container from '../library/Container.jsx';
import Heading from '../library/Heading.jsx';
import Paragraph from '../library/Paragraph.jsx';
import Link from '../library/Link.jsx';

export default function Header() {
    const [name, setName] = useState(null);

    useEffect(() => {
        if (logic.isUserLoggedIn()) {
            logic.getUserName()
                .then(name => {
                    setName(name);
                })
                .catch(error => {
                    console.error(error);
                    alert(error.message);
                });
        }
    }, []);

    return <header className='bg-stone-100 fixed left-0 top-0 w-full flex items-center gap-2 p-2 z-40'>
        <Link className='flex-shrink' href={'/'}>
            <img src='../../../logoExoticus.png' alt='logo exoticus' className='h-[3rem] w-auto' />
        </Link>
        <Container>
            <Heading className=' text-2xl font-bold text-black italic m-1'>Exoticus</ Heading>
        </Container>
        <Container className='font-bold text-right flex flex-col text-sm ml-auto'>
            {
                name ? (
                    <Paragraph>{name}</Paragraph>
                ) : (
                    <Paragraph>Bienvenida/o!</Paragraph>
                )
            }
        </Container>
    </header>;
}