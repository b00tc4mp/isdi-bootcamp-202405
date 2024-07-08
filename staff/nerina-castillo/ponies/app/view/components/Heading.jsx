
function Heading({ level = 1, children }) {
    const Tag = `h${level}` // 'h' + {this.props.level}

    return <Tag className='Heading'>
        {children}
    </Tag>
}

export default Heading
