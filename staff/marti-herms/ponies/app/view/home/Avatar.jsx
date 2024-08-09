import Image from '../library/Image'

export default function Avatar({ url, className = '' }) {
    return <Image src={url} className={'rounded-full clip-path-40 ' + className} />
}