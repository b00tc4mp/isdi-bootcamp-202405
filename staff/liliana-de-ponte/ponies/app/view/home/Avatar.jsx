import Image from '../components/Image'

export default function Avatar({ url }) {
    return <Image src={url} className="w-[2rem] h-[2rem] rounded-[50%] clip-path-40" />
}


/* .Avatar {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
    clip-path: circle(40%);

} */