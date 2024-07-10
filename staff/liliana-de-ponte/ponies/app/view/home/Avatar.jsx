import Image from '../components/Image'
import './Avatar.css'

function Avatar({ url }) {
    return <Image src={url} className="Avatar" />
}

export default Avatar