import React from 'react'

const Footer = () => {
    const year = new Date().getFullYear()
    return (
        <div className='py-2 bg-primary'>
            <div className="container">
                <div className="row">
                    <div className="col">
                        <p className="mb-0 text-white text-center">&copy; {year}.All Right Reserved.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Footer