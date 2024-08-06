import Image from './Image'

export default function Avatar({ url, className }) {
    return <Image src={url} className={className} />
}