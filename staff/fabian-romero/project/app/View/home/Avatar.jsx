import Image from "../library/Image"

export default function Avatar({ url }) {
    return <Image src={url} className="w-[2rem] h-[2rem] rounded-full clip-path-40" />
}