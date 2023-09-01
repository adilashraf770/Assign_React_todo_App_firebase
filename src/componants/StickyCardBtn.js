import { Button } from 'antd'
import React from 'react'

const StickyCardBtn = ({ btn }) => {
    return (
        <div className="col-12 col-md-6 col-lg-4">
            <div className='sticky-card-btn ' style={{
                backgroundColor: 'transparent'
            }}>
                <div className='btn'>
                    <Button type='text' onClick={btn} >+</Button>
                </div>
            </div>
        </div>
    )
}

export default StickyCardBtn