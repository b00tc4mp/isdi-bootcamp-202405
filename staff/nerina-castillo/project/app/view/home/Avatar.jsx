import Image from '../library/Image'
import './Avatar.css'

export default function Avatar({ url }) {
    return <Image src={url} />
}