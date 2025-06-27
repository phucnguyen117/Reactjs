import Job from "../models/Job.js"
import JobApplication from "../models/JobApplication.js"
import User from "../models/User.js"
import { v2 as cloudinary } from "cloudinary"


// Get user data
export const getUserData = async (req, res) => {

    const { userId } = await req.auth();

    try {

        const user = await User.findById(userId)

        if (!user) {
            return res.json({ success: false, message: "User not found" })
        }

        res.json({ success: true, user })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Apply for a job
export const applyForJob = async (req, res) => {

    const { jobId } = req.body

    const { userId } = await req.auth();

    try {

        const isAlreadyApplied = await JobApplication.findOne({ jobId, userId })

        if (isAlreadyApplied) {
            return res.json({ success: false, message: "Đã ứng tuyển từ trước" })
        }

        const jobData = await Job.findById(jobId)

        if (!jobData) {
            return res.json({ success: false, message: "Không tìm thấy công việc" })
        }

        await JobApplication.create({
            companyId: jobData.companyId,
            userId,
            jobId,
            date: Date.now()
        })

        res.json({ success: true, message: "Gửi đơn ứng tuyển thành công" })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// Get user applied applications
export const getUserJobApplications = async (req, res) => {

    try {

        const { userId } = await req.auth();

        const applications = await JobApplication.find({ userId })
            .populate('companyId', 'name email image')
            .populate('jobId', 'title description location category level salary')
            .exec()

        if (!applications) {
            return res.json({ success: false, message: "No job applications found for this user." })
        }

        return res.json({ success: true, applications })

    } catch (error) {
        res.json({ success: false, message: error.message })
    }

}

// update user profile (resume)
export const updateUserResume = async (req, res) => {
    try {

        const { userId } = await req.auth();

        const resumeFile = req.file

        const userData = await User.findById(userId)

        if (resumeFile) {
            const resumeUpload = await cloudinary.uploader.upload(resumeFile.path)
            userData.resume = resumeUpload.secure_url
        }

        await userData.save()

        return res.json({ success: true, message: 'Thành Công' })

    } catch (error) {

        res.json({ success: false, message: error.message })

    }
}


