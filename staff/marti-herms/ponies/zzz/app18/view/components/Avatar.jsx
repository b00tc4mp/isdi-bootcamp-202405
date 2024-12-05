import Image from './Image';

import './Avatar.css';

export default function Avatar({ url }) {
    return <Image src={url} className="Avatar" />
}