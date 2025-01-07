import React, { forwardRef } from 'react'

const Container = forwardRef(({ children, className = '' }, ref) => {
    // console.debug('Container -> call')

    return (
        <div ref={ref} className={`flex gap-2 p-[0.5rem] ${className}`}>
            {children}
        </div>
    )
})
Container.displayName = "Container"

export default Container