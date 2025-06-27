import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { assets, JobCategories, JobLocations } from '../assets/assets'
import JobCard from './JobCard'

const JobListing = () => {
    const { isSearched, searchFilter, setSearchFilter, jobs } = useContext(AppContext)

    const [showFilter, setShowFilter] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [selectedCategories, setSelectedCategories] = useState([])
    const [selectedLocations, setSelectedLocations] = useState([])
    const [categoryFilter, setCategoryFilter] = useState('')
    const [locationFilter, setLocationFilter] = useState('')
    const [showAllCategories, setShowAllCategories] = useState(false)
    const [showAllLocations, setShowAllLocations] = useState(false)

    const [filteredJobs, setFilteredJobs] = useState(jobs)

    const handleCategoryChange = (category) => {
        setSelectedCategories(
            prev => prev.includes(category) ? prev.filter(c => c !== category) : [...prev, category]
        )
    }

    const handleLocationChange = (location) => {
        setSelectedLocations(
            prev => prev.includes(location) ? prev.filter(c => c !== location) : [...prev, location]
        )
    }

    useEffect(() => {
        const matchesCategory = job => selectedCategories.length === 0 || selectedCategories.includes(job.category)
        const matchesLocation = job => selectedLocations.length === 0 || selectedLocations.includes(job.location)
        const matchesTitle = job => searchFilter.title === "" || job.title.toLowerCase().includes(searchFilter.title.toLowerCase())
        const matchesSearchLocation = job => searchFilter.location === "" || job.location.toLowerCase().includes(searchFilter.location.toLowerCase())

        const newFilteredJobs = jobs.slice().reverse().filter(
            job => matchesCategory(job) && matchesLocation(job) && matchesTitle(job) && matchesSearchLocation(job)
        )

        setFilteredJobs(newFilteredJobs)
        setCurrentPage(1)
    }, [jobs, selectedCategories, selectedLocations, searchFilter])

    // Filter categories and locations based on user input
    const filteredCategories = JobCategories.filter(category =>
        category.toLowerCase().includes(categoryFilter.toLowerCase())
    )
    const filteredLocations = JobLocations.filter(location =>
        location.toLowerCase().includes(locationFilter.toLowerCase())
    )

    return (
        <div className='container 2xl:px-20 mx-auto flex flex-col lg:flex-row max-lg:space-y-8 py-8'>
            {/* Sidebar */}
            <div className='w-full lg:w-1/4 bg-white px-4'>
                {/* Search Filter from Hero Component */}
                {isSearched && (searchFilter.title !== "" || searchFilter.location !== "") && (
                    <>
                        <h3 className='font-medium text-lg mb-4'>Tìm kiếm hiện tại</h3>
                        <div className='mb-4 text-gray-600 flex flex-wrap gap-2'>
                            {searchFilter.title && (
                                <span className='inline-flex items-center gap-2.5 bg-blue-50 border border-blue-200 px-4 py-1.5 rounded'>
                                    <img src={assets.search_icon} alt="Tìm" className="h-4 w-4" />
                                    {searchFilter.title}
                                    <img onClick={e => setSearchFilter(prev => ({ ...prev, title: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                </span>
                            )}
                            {searchFilter.location && (
                                <span className='ml-2 inline-flex items-center gap-2.5 bg-red-50 border border-red-200 px-4 py-1.5 rounded'>
                                    <img src={assets.location_icon} alt="địa điểm" className="h-4 w-4" />
                                    {searchFilter.location}
                                    <img onClick={e => setSearchFilter(prev => ({ ...prev, location: "" }))} className='cursor-pointer' src={assets.cross_icon} alt="" />
                                </span>
                            )}
                        </div>
                    </>
                )}

                <button onClick={e => setShowFilter(prev => !prev)} className='px-4 py-1 rounded border border-gray-400 lg:hidden mb-4'>
                    {showFilter ? 'Đóng' : 'Bộ lọc'}
                </button>

                <div className="flex flex-col gap-8 mt-3">
                    {/* Category Filter */}
                    <div className={`${showFilter ? "" : "max-lg:hidden"} bg-white border border-gray-300 rounded-lg shadow-sm p-5 mb-6`}>
                        <h4 className='font-medium text-lg py-4'>Tìm Theo Danh Mục</h4>
                        <input
                            type="text"
                            placeholder="Tìm danh mục..."
                            value={categoryFilter}
                            onChange={e => setCategoryFilter(e.target.value)}
                            className='w-500 px-3 py-1.5 mb-4 border border-gray-500 rounded text-sm'
                        />
                        <div className='max-h-40 overflow-y-auto'>
                            <ul className='space-y-2 text-gray-600 text-sm'>
                                {filteredCategories.slice(0, showAllCategories ? undefined : 5).map((category, index) => (
                                    <li className='flex gap-3 items-center' key={index}>
                                        <input
                                            className='w-4 h-4 accent-blue-600 cursor-pointer rounded'
                                            type="checkbox"
                                            onChange={() => handleCategoryChange(category)}
                                            checked={selectedCategories.includes(category)}
                                        />
                                        <span className="font-medium">{category}</span>
                                    </li>
                                ))}
                                {filteredCategories.length > 5 && !showAllCategories && (
                                    <li className='text-blue-500 cursor-pointer hover:underline mt-2' onClick={() => setShowAllCategories(true)}>
                                        Xem thêm ({filteredCategories.length - 5})
                                    </li>
                                )}
                                {filteredCategories.length === 0 && (
                                    <li className='text-gray-500'>Không tìm thấy danh mục</li>
                                )}
                            </ul>
                        </div>
                    </div>

                    {/* Location Filter */}
                    <div className={`${showFilter ? "" : "max-lg:hidden"} bg-white border border-gray-300 rounded-lg shadow-sm p-5 mb-6`}>
                        <h4 className='font-medium text-lg py-4'>Tìm Theo Địa Điểm</h4>
                        <input
                            type="text"
                            placeholder="Tìm địa điểm..."
                            value={locationFilter}
                            onChange={e => setLocationFilter(e.target.value)}
                            className='w-500 px-3 py-1.5 mb-4 border border-gray-500 rounded text-sm'
                        />
                        <div className='max-h-40 overflow-y-auto'>
                            <ul className='space-y-2 text-gray-600 text-sm'>
                                {filteredLocations.slice(0, showAllLocations ? undefined : 5).map((location, index) => (
                                    <li className='flex gap-3 items-center' key={index}>
                                        <input
                                            className='w-4 h-4 accent-blue-600 cursor-pointer rounded'
                                            type="checkbox"
                                            onChange={() => handleLocationChange(location)}
                                            checked={selectedLocations.includes(location)}
                                        />
                                        <span className='font-medium'>{location}</span>
                                    </li>
                                ))}
                                {filteredLocations.length > 5 && !showAllLocations && (
                                    <li className='text-blue-500 cursor-pointer hover:underline mt-2' onClick={() => setShowAllLocations(true)}>
                                        Xem thêm ({filteredLocations.length - 5})
                                    </li>
                                )}
                                {filteredLocations.length === 0 && (
                                    <li className='text-gray-500'>Không tìm thấy địa điểm</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* Job listings */}
            <section className='w-full lg:w-3/4 text-gray-800 max-lg:px-4'>
                <h3 className='font-medium text-3xl py-2' id='job-list'>Các Việc Làm Mới Nhất</h3>
                <p className='mb-8'>Có được công việc mong muốn từ các công ty hàng đầu</p>
                <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4'>
                    {filteredJobs.slice((currentPage - 1) * 9, currentPage * 9).map((job, index) => (
                        <JobCard key={index} job={job} />
                    ))}
                </div>

                {/* Pagination */}
                {filteredJobs.length > 0 && (
                    <div className='flex items-center justify-center space-x-2 mt-10'>
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} src={assets.left_arrow_icon} alt="" />
                        </a>
                        {Array.from({ length: Math.ceil(filteredJobs.length / 9) }).map((_, index) => (
                            <a key={index} href="#job-list">
                                <button onClick={() => setCurrentPage(index + 1)} className={`w-8 h-8 flex items-center justify-center border border-gray-300 rounded text-sm ${currentPage === index + 1 ? 'bg-blue-100 text-blue-500' : 'text-gray-500'}`}>{index + 1}</button>
                            </a>
                        ))}
                        <a href="#job-list">
                            <img onClick={() => setCurrentPage(Math.min(currentPage + 1, Math.ceil(filteredJobs.length / 9)))} src={assets.right_arrow_icon} alt="" />
                        </a>
                    </div>
                )}
            </section>
        </div>
    )
}

export default JobListing