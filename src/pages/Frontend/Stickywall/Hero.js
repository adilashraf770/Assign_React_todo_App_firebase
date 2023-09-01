import React, { useEffect, useState } from 'react'
import { Divider, Modal, message } from 'antd'

// Componants
import StickyCardBtn from 'componants/StickyCardBtn'


import { collection, deleteDoc, doc, getDocs, query, serverTimestamp, setDoc, where } from 'firebase/firestore'
import { useAuthContext } from 'contexts/AuthContext'
import { useInputContext } from 'contexts/InputContext'
import { firestore } from 'config/firebase'
import { DeleteFilled, EditFilled } from '@ant-design/icons'


const insitialState = {
    title: "", color: "", date: "", description: ""
}
const Hero = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [state, setstate] = useState(insitialState)
    const [documents, setDocuments] = useState([])
    const { takeInputVal } = useInputContext()
    // const [isProcessing, setIsProcessing] = useState(false)
    const { user, isAuth } = useAuthContext()

    const handleChange = (e) => setstate(s => ({ ...s, [e.target.name]: e.target.value }))

    useEffect(() => {
        getAllStickyWalls()
        searchTodo()
    }, [documents, takeInputVal])



    const getAllStickyWalls = async () => {
        const q = query(collection(firestore, "stickyWall"), where("CreatedBy.uid", "==", user.uid));
        const querySnapshot = await getDocs(q)
        const array = []
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            array.push(data)
        });

        setDocuments(array)
        // console.log('documents', documents)
    }

    const searchTodo = async () => {
        const q = query(collection(firestore, "stickyWall"), where("CreatedBy.uid", "==", user.uid));
        const querySnapshot = await getDocs(q)
        const array = []
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            array.push(data)
        });
        const filterArray = array.filter((sticky) => sticky.title.toLowerCase().includes(takeInputVal.toLowerCase()))

        setDocuments(filterArray)
        // console.log('documents', documents)
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        // setIsProcessing(true)

        const { title, color, date, description } = state

        const stickyWall = {
            title, color, date, description,
            dateCreated: serverTimestamp(),
            status: "active",
            id: Math.random().toString(36).slice(2),
            CreatedBy: {
                email: user?.email,
                uid: user?.uid
            }
        }
        setIsModalOpen(false);
        try {
            await setDoc(doc(firestore, "stickyWall", stickyWall.id), stickyWall);
            message.success("Stickywall is Added Successfully.")


        } catch (e) {
            console.log(e)
        }


    }
    const handleDelete = async (todo) => {
        await deleteDoc(doc(firestore, "stickyWall", todo.id));

        const todos = documents.filter((oldTodo) => oldTodo.id !== todo.id)
        message.success("StikyWall is Deleted Successfully.")

        setDocuments(todos)
    }


    return (
        <>
            <main >
                <div className="container">
                    <div className="row">
                        <div className="col-12">
                            <h1 className='heading'>Sticky Wall</h1>
                        </div>
                    </div>
                    <Divider />
                    {
                        isAuth ?
                            <div className="row">
                                <div className="col-12">

                                    <div className="row">

                                        {
                                            isAuth &&
                                            documents.map((document, key) => {
                                                return (
                                                    <div className="col-12 col-md-6 col-lg-4" value={document.title + key + 10}>
                                                        <div className='sticky-card ' style={{
                                                            backgroundColor: document.color
                                                        }}>
                                                            <div style={{
                                                                display: "flex",
                                                                flexDirection: "row-reverse",
                                                                justifyContent: "space-between",
                                                                alignItems: "start",
                                                                width: "100%"

                                                            }}>
                                                                <div>

                                                                    <DeleteFilled style={{
                                                                        fontSize: "20px",
                                                                        color: "red"
                                                                    }} onClick={() => handleDelete(document)} />
                                                                </div>


                                                                <div className='sticky-card-header'>
                                                                    <h2>{document.title}</h2>
                                                                    <p>{document.description}</p>
                                                                </div>
                                                            </div>

                                                            <p className='sub-heading mt-3 text-end'>  {document.date}</p>


                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }


                                        <StickyCardBtn btn={() => setIsModalOpen(true)} />
                                    </div>
                                </div>
                            </div>
                            : <h1>Please Login First</h1>
                    }
                </div>
            </main >

            < Modal title="Sticky Wall" open={isModalOpen} onOk={handleSubmit} onCancel={() => setIsModalOpen(false)} width={1000} >
                <Divider />
                <form className="row g-3">
                    <div className="col-12 col-md-10 mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input type="text" className="form-control" id="title" name='title' placeholder='Enter title ' onChange={handleChange} />
                    </div>
                    <div className="col-12 col-md-2 mb-3">
                        <label htmlFor="color" className="form-label">Color</label>
                        <input type="color" className="form-control" id="color" name='color' placeholder='Enter color ' onChange={handleChange} />

                    </div>
                    <div className="col-12  mb-3">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input type="date" className="form-control" id="date" name='date' placeholder='Enter date ' onChange={handleChange} />
                    </div>
                    <div className="col-12  mb-3">
                        <label htmlFor="description" className="form-label">Description</label>

                        <textarea className="form-control" id="description" name='description' placeholder='Enter description ' onChange={handleChange}></textarea>
                    </div>
                    {/* <div className="col-12 text-center">
                        {isProcessing
                            && <button className="btn btn-primary w-100" type="button" disabled>
                                <span className="spinner-border spinner-border-sm " role="status" aria-hidden="true"></span>

                            </button>

                        }
                    </div> */}
                </form>

            </ Modal>
        </>
    )
}

export default Hero