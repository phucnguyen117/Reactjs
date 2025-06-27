import React, { useContext, useRef } from 'react'
import { assets } from '../assets/assets'
import { AppContext } from '../context/AppContext'

const Hero = () => {

    const { setSearchFilter, setIsSearched } = useContext(AppContext)

    const titleRef = useRef(null)
    const locationRef = useRef(null)

    const onSearch = () => {
        setSearchFilter({
            title: titleRef.current.value,
            location: locationRef.current.value
        })
        setIsSearched(true)
    }

    return (
        <div className='container 2xl:px-20 mx-auto my-10'>
            <div
                className="relative text-white py-16 text-center mx-2 rounded-xl"
                style={{
                    backgroundImage: `url(${assets.background1})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Lớp phủ tối ảnh */}
                <div className="absolute inset-0 bg-black opacity-35 z-0 rounded-xl"></div>

                {/* Nội dung hiển thị phía trên overlay */}
                <div className="relative z-10">
                    <h2 className='text-2xl md:text-3xl lg:text-4xl font-medium mb-4'>Hơn 1,000+ Việc Làm Tại Việt Nam</h2>
                    <p className='mb-8 max-w-xl mx-auto text-base font-light px-5'>Bước tiến lớn tiếp theo trong sự nghiệp của bạn bắt đầu ngay tại đây - Khám phá những cơ hội việc làm tốt nhất và thực hiện bước đầu tiên hướng tới chạm tay vào tương lai của bạn nào!</p>
                    <div className='flex items-center justify-between bg-white rounded text-gray-600 max-w-xl pl-4 mx-4 sm:mx-auto'>
                        <div className='flex items-center'>
                            <img className='h-4 sm:h-5' src={assets.search_icon} alt="" />
                            <input type="text"
                                placeholder='Thông tin công việc'
                                className='max-sm:text-xs p-2 rounded outline-none w-full'
                                ref={titleRef}
                            />
                        </div>
                        <div className='flex items-center'>
                            <img className='h-4 sm:h-5' src={assets.location_icon} alt="" />
                            <input type="text"
                                placeholder='Địa điểm'
                                className='max-sm:text-xs p-2 rounded outline-none w-full'
                                ref={locationRef}
                            />
                        </div>
                        <button onClick={onSearch} className='bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded text-white m-1'>Tìm</button>
                    </div>
                </div>
            </div>

            <div className='border border-gray-300 shadow-md mx-2 mt-5 p-6 rounded-md flex'>
                <div className='flex justify-center gap-10 lg:gap-16 flex-wrap'>
                    <p className='font-medium'>Lựa chọn bởi</p>
                    <img className='h-7' src={assets.vinamilk_logo} alt="vinamilk" />
                    <img className='h-7' src={assets.samsung_logo} alt="samsung" />
                    <img className='h-7' src={assets.fpt_logo} alt="fpt" />
                    <img className='h-6' src={assets.viettel_logo} alt="viettel" />
                    <img className='h-6' src={assets.aeon_logo} alt="aeon" />
                    <img className='h-6' src={assets.vng_logo} alt="vng" />
                    <img className='h-6' src={assets.canon_logo} alt="Canon" />
                </div>
            </div>

        </div>
    )
}

export default Hero