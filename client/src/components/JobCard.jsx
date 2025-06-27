import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

// Hàm định dạng tiền tệ VND
const formatVND = (amount) => {
    if (!amount) return 'Thỏa thuận';
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ' VNĐ';
};

const JobCard = ({ job }) => {

    const navigate = useNavigate()

    return (
        <div className='border p-6 shadow rounded-xl'>
            <div className='flex justify-between items-center'>
                <img className='h-8' src={job.companyId.image} alt="" />
            </div>
            <h4 className='font-medium text-xl mt-2'>{job.title}</h4>
            <div className='flex flex-wrap items-center gap-3 mt-2 text-sm'>
                <span className='bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>{job.location}</span>
                <span className='bg-red-50 border border-red-200 px-4 py-1.5 rounded'>{job.level}</span>
                <span className="bg-green-50 border border-gray-400 px-4 py-1.5 rounded-xl text-green-800 flex items-center gap-1">{formatVND(job.salary)}</span>
            </div>
            <p className="text-gray-500 text-sm mt-4 line-clamp-2">
                {job.description.replace(/<[^>]+>/g, '')}
            </p>
            <div className='mt-4 flex gap-4 text-sm '>
                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='bg-blue-600 text-white px-4 py-2 rounded'>Ứng Tuyển</button>
                <button onClick={() => { navigate(`/apply-job/${job._id}`); scrollTo(0, 0) }} className='text-gray-500 border border-gray-500 rounded px-4 py-2'>Xem Thêm</button>
            </div>
        </div>
    )
}

export default JobCard