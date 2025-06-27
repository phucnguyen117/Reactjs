import React, { useContext, useEffect, useState } from 'react'
import { assets, viewApplicationsPageData } from '../assets/assets'
import { AppContext } from '../context/AppContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import Loading from '../components/Loading'

const ViewApplications = () => {

  const { backendUrl, companyToken } = useContext(AppContext)

  const [applicants, setApplicants] = useState(false)

  // Function to fetch company Job Applications data
  const fetchCompanyJobApplications = async () => {
    try {

      const { data } = await axios.get(backendUrl + '/api/company/applicants',
        { headers: { token: companyToken } }
      )

      if (data.success) {
        setApplicants(data.applications.reverse())
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  // Function to update job applications status
  const changeJobApplicationStatus = async (id, status) => {
    try {

      const { data } = await axios.post(backendUrl + '/api/company/change-status',
        { id, status },
        { headers: { token: companyToken } }
      )

      if (data.success) {
        fetchCompanyJobApplications()
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error.message)
    }
  }

  useEffect(() => {
    if (companyToken) {
      fetchCompanyJobApplications()
    }
  }, [companyToken])

  return applicants ? applicants.length === 0 ? (
    <div className='flex items-center justify-center h-[70vh]'>
      <p className='text-xl sm:text-2xl'>Không có người ứng tuyển nào cả</p>
    </div>
  ) : (
    <div className='container mx-auto p-4'>
      <div>
        <table className='w-full max-w-8xl bg-white border border-gray-200 max-sm:test-sm'>
          <thead>
            <tr className='border-b bg-gray-50'>
              <th className='py-2 px-4 text-left'>#</th>
              <th className='py-2 px-4 text-left'>Tên ứng viên</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Tiêu đề công việc</th>
              <th className='py-2 px-4 text-left max-sm:hidden'>Địa điểm</th>
              <th className='py-2 px-4 text-left'>CV ứng tuyển</th>
              <th className='py-2 px-4 text-left'>Trạng thái</th>
            </tr>
          </thead>
          <tbody>
            {applicants.filter(item => item.jobId && item.userId).map((applicant, index) => (
              <tr key={index} className='text-gray-700 border-b'>
                <td className='py-2 px-4 text-center text-center flex items-center'>{index + 1}</td>

                {/* Tên ứng viên + avatar */}
                <td className='py-2 px-4'>
                  <div className='flex items-center gap-2 max-w-[180px]'>
                    <img
                      className='w-10 h-10 rounded-full max-sm:hidden'
                      src={applicant.userId.image}
                      alt="avatar"
                    />
                    <span className='truncate' title={applicant.userId.name}>
                      {applicant.userId.name}
                    </span>
                  </div>
                </td>

                {/* Tiêu đề công việc */}
                <td className='py-2 px-4 max-sm:hidden'>
                  <div className='max-w-[400px]' title={applicant.jobId.title}>
                    {applicant.jobId.title}
                  </div>
                </td>

                {/* Địa điểm */}
                <td className='py-2 px-4 max-sm:hidden'>
                  <div className='truncate max-w-[150px]' title={applicant.jobId.location}>
                    {applicant.jobId.location}
                  </div>
                </td>

                {/* Hồ sơ */}
                <td className='py-2 px-4'>
                  <a
                    href={applicant.userId.resume}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='bg-blue-50 text-blue-500 px-3 py-1 rounded inline-flex items-center gap-2 items-center truncate max-w-[160px]'
                    title="Tải xuống hồ sơ"
                  >
                    Hồ sơ <img src={assets.resume_download_icon} alt="icon" />
                  </a>
                </td>

                <td className='py-2 px-4 border-b relative'>
                  {applicant.status === "Pending"
                    ? <div className='relative inline-block text-left group'>
                      <button className='text-gray-500 action-button'>...</button>
                      <div className='z-10 hidden absolute right-0 md:left-0 top-0 mt-2 w-32 bg-white border border-gray-200 rounded shadow group-hover:block'>
                        <button onClick={() => changeJobApplicationStatus(applicant._id, 'Accepted')} className='block w-full text-left px-4 py-2 text-blue-500 hover:bg-gray-100'>Chấp nhận</button>
                        <button onClick={() => changeJobApplicationStatus(applicant._id, 'Rejected')} className='block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100'>Từ chối</button>
                      </div>
                    </div>
                    : (
                    <span className={`${applicant.status === 'Accepted' ? 'text-blue-500' : 'text-red-500'}`}>
                      {applicant.status === 'Accepted' ? 'Chấp nhận' : applicant.status === 'Rejected' ? 'Từ chối' : applicant.status}
                    </span>
                  )}

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : <Loading />
}

export default ViewApplications