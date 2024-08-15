import logic from '../../logic'
import Avatar from './Avatar'
import Button from '../library/Button'
import Container from '../library/Container'
import Heading from '../library/Heading'

export default function User({ user, onUserFollowToggled }) {
    const handleFollowUserClick = () => {
        try {
            logic.toggleFollowUser(user.id)
                .then(() => onUserFollowToggled())
                .catch(error => {
                    console.log(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <Container>
        <Avatar url={user.avatar} alt={`${user.username}'s avatar`} />

        <Container>
            <Heading level='4'>{user.username}</Heading>

            <Button onClick={handleFollowUserClick}>{user.following ? 'unfollow' : 'follow'}</Button>
        </Container>
    </Container>
}