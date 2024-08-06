import Image from '../components/Image'

function Avatar({ url }) {
    return <Image src={url} className="w-[2rem] h-[2rem] rounded-[50%] clip-path-[circle(40%)]" />
}

export default Avatar