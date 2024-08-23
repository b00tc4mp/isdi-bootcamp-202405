import Container from '../library/Container'

import { PLAYER_SIZE } from '../../util/constants.js'

export default function Player({ position }) {
    return <Container className={`absolute w-[${PLAYER_SIZE}px] aspect-square bg-white`} style={{ top: `${position.top}px`, left: `${position.left}px` }}></Container>
}