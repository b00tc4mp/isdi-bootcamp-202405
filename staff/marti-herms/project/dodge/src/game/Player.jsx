import Container from '../library/Container'

import { PLAYER_SIZE } from '../../util/constants.js'

export default function Player({ player }) {
    // console.log(player.top, player.left)

    return <Container className='absolute aspect-square bg-white' style={{ top: `${player.top}px`, left: `${player.left}px`, width: `${player.width}px`, height: `${player.height}px` }}></Container>
}