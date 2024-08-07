import Image from "../components/Image";

export default function Avatar({ url }) {
    return <Image src={url} className="w-8 h-8 rounded-full clip-path-40" />
}
