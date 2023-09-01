import { DeleteTwoTone } from "@ant-design/icons"

const StickyCard = ({ title, date, description, bgColor, val, deleteDoc }) => {
    return (
        <div className="col-12 col-md-6 col-lg-4" value={val}>
            <div className='sticky-card ' style={{
                backgroundColor: bgColor
            }}>
                <div style={{
                    display: "flex",
                    flexDirection: "row-reverse",
                    justifyContent: "space-between",
                    // alignItems: "center",
                    width: "100%"

                }}>

                    <DeleteTwoTone style={{
                        fontSize: "20px",
                    }} type="primary" danger onClick={deleteDoc} />
                    <div className='sticky-card-header'>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </div>
                </div>

                <p className='sub-heading mt-3 text-end'>  {date}</p>
            </div>
        </div>
    )
}

export default StickyCard