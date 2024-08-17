import Image from '../library/Image'

export default function Avatar({ url, className = '' }) {
    return <Image src={url} className={className + ' w-[2rem] h-[2rem] rounded-full clip-path-40'} />
}