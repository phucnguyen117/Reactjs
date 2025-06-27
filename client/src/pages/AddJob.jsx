import React, { useRef, useState, useEffect, useContext } from 'react'
import Quill from 'quill'
import { JobCategories, JobLocations } from '../assets/assets';
import axios from 'axios';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify'

const AddJob = () => {

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('An Giang');
    const [category, setCategory] = useState('Bảo trì / Kỹ thuật viên');
    const [level, setLevel] = useState('Không yêu cầu');
    const [salary, setSalary] = useState(0);

    const editorRef = useRef(null)
    const quillRef = useRef(null)

    const { backendUrl, companyToken } = useContext(AppContext)

    const onSubmitHandler = async (e) => {
        e.preventDefault()

        try {
            
            const description = quillRef.current.root.innerHTML

            const { data } = await axios.post(backendUrl+'/api/company/post-job',
                {title,description, location,salary, category, level},
                {headers: {token:companyToken}}
            )

            if (data.success) {
                toast.success(data.message)
                setTitle('')
                setSalary(0)
                quillRef.current.root.innerHTML = ""
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }

    useEffect(() => {
        // Initiate Qill only once
        if (!quillRef.current && editorRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: 'snow',
            })
        }
    }, [])

    return (
        <form onSubmit={onSubmitHandler} className='container p-4 flex flex-col w-full items-start gap-3'>

            <div className='w-full'>
                <p className='mb-2'>Tiêu Đề Công Việc</p>
                <input type="text" placeholder='Nhập yêu cầu'
                    onChange={e => setTitle(e.target.value)} value={title}
                    required
                    className='w-full max-w-lg px-3 py-2 border-2 border-gray-300 rounded'
                />
            </div>

            <div className='w-full max-w-lg'>
                <p className='my-2'>Mô tả công việc</p>
                <div ref={editorRef}>

                </div>
            </div>

            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>

                <div>
                    <p className='mb-2'>Danh mục công việc</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setCategory(e.target.value)}>
                        {JobCategories.map((category, index) => (
                            <option key={index} value={category}>{category}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Địa điểm</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLocation(e.target.value)}>
                        {JobLocations.map((location, index) => (
                            <option key={index} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Trình độ công việc</p>
                    <select className='w-full px-3 py-2 border-2 border-gray-300 rounded' onChange={e => setLevel(e.target.value)}>
                        <option value="Không yêu cầu"> Không yêu cầu </option>
                        <option value="Sơ cấp"> Sơ cấp </option>
                        <option value="Trung cấp"> Trung cấp </option>
                        <option value="Cấp cao"> Cấp cao </option>
                    </select>
                </div>

            </div>
            <div>
                <p className='mb-2'>Lương công việc (VNĐ)</p>
                <input min={0} className='w-full px-3 py-2 border-2 border-gray-300 rounded sm:w-[150px]' onChange={e => setSalary(e.target.value)} type="Number" placeholder='Thỏa thuận' />
            </div>

            <button className='w-28 py-3 mt-4 bg-black text-white rounded'>Áp dụng</button>
        </form>
    )
}

export default AddJob