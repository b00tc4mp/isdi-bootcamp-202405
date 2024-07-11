import Image from '../components/Image'

function Avatar({ url, className }) {
    return <Image src={url} className={className} />
}

export default Avatar