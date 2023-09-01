import { Divider, Modal } from 'antd'
import { firestore } from 'config/firebase'
import { useAuthContext } from 'contexts/AuthContext'
import { useInputContext } from 'contexts/InputContext'
import dayjs from 'dayjs'
import { collection, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

const initialState = {
    title: "", date: ""
}

const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [state, setState] = useState(initialState)
    const [documents, setDocuments] = useState([])
    const { user, isAuth } = useAuthContext()
    const { takeInputVal } = useInputContext()

    useEffect(() => {
        getAllTodays()
        searchTodo()
    }, [documents, takeInputVal])

    const handleChange = (e) => setState(s => ({ ...s, [e.target.name]: e.target.value }))


    const getAllTodays = async () => {
        let currentDate = dayjs().format('YYYY-MM-DD')

        const q = query(collection(firestore, "today"), where("CreatedBy.uid", "==", user.uid), where("date", ">", currentDate));

        const querySnapshot = await getDocs(q)
        const array = []
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            array.push(data)
            // console.log(doc.id, " => ", doc.data());
        });
        setDocuments(array)
        // console.log('documents', documents)
    }

    const handleClick = async (event) => {
        event.preventDefault()
        const { title, date } = state

        const today = {
            title, date,
            dateCreated: serverTimestamp(),
            status: "active",
            id: Math.random().toString(36).slice(2),
            CreatedBy: {
                email: user?.email,
                uid: user?.uid
            }
        }
        try {
            await setDoc(doc(firestore, "today", today.id), today);
        } catch (e) {
            console.log(e)
        }

        // console.log('today', today)
        setIsModalOpen(false);
    }

    const searchTodo = async () => {

        let currentDate = dayjs().format('YYYY-MM-DD')
        const q = query(collection(firestore, "today"), where("CreatedBy.uid", "==", user.uid), where("date", "==", currentDate));
        const querySnapshot = await getDocs(q)
        const array = []
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            array.push(data)
        });
        const filterArray = array.filter((today) => today.title.toLowerCase().includes(takeInputVal.toLowerCase()))

        setDocuments(filterArray)
        // console.log('documents', documents)
    }
    return (
        <>
            <div className="row">
                <div className="col-12 mt-5">
                    <div className="row">
                        <div className='row mb-3'>
                            <div className="col-12">
                                <h4 className='mb-2 pb-3'>This Week </h4>
                            </div>
                            <Divider />

                        </div>

                        {isAuth ? <div div >
                            {
                                documents.map((document, key) => {
                                    return (
                                        <div className="row mb-1 mx-2" value={document.title + key} style={{
                                        }}>
                                            <div className="col-12">
                                                <p className='mb-0' style={{
                                                    fontSize: "20px"
                                                }}>{document.title}</p>
                                                <hr className='mb-2' />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div> :
                            <h1>Please Login First</h1>
                        }

                    </div>

                </div >
            </div >


            {/* model */}
            < Modal title="Sticky Wall" open={isModalOpen} onOk={handleClick} onCancel={() => setIsModalOpen(false)}  >
                <Divider />
                <form className="row g-3">
                    <div className="col-12  mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' placeholder='Enter title ' onChange={handleChange} />
                    </div>

                    <div className="col-12  mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" name='date' placeholder='Enter date ' onChange={handleChange} />
                    </div>


                </form>

            </ Modal >
        </>

    )
}

export default Hero