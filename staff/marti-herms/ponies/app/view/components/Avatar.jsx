import Image from './Image';

import './Avatar.css';

const Avatar = ({ url }) => {
    return <Image src={url} className="Avatar" />
}

export default Avatar