const Resume = require("../models/resumeModel");
const fs = require("fs");
const path = require("path");

const createdResume = async (req, res) => {
   try {
    console.log("💥 req.user:", req.user);

    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized: No user info" });
    }

    const title = req.body.title;
    if (!title) {
      return res.status(400).json({ message: 'Title is required' });
    }

        //default template 
        const defaultResumeData = {
            profileInfo: {
                profileImg: null,
                previewUrl: '',
                fullName: '',
                designation: '',
                summary: '',
            },
            contactInfo: {
                email: '',
                phone: '',
                location: '',
                linkedin: '',
                github: '',
                website: '',
            },
            workExperience: [
                {
                    company: '',
                    role: '',
                    startDate: '',
                    endDate: '',
                    description: '',
                },
            ],
            education: [
                {
                    degree: '',
                    institution: '',
                    startDate: '',
                    endDate: '',
                },
            ],
            skills: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            projects: [
                {
                    title: '',
                    description: '',
                    github: '',
                    liveDemo: '',
                },
            ],
            certifications: [
                {
                    title: '',
                    issuer: '',
                    year: '',
                },
            ],
            languages: [
                {
                    name: '',
                    progress: 0,
                },
            ],
            interests: [''],
        };
  
       const newResume = await Resume.create({
      userId: req.user._id,
      title,
      ...defaultResumeData,
      ...req.body
    });
 

        res.status(201).json(newResume);
    } catch (error) {
    console.error("🔥 Resume Create Error:", error); // add this too
    res.status(500).json({ message: "Failed to create resume", error: error.message });
  }
}


//get function
const getUserResume = async (req, res) => {
    try {
        const resumes = await Resume.find({ userId: req.user._id }).sort({
            updatedAt: -1
        });
        res.json(resumes);
    } catch (error) {
        res.status(500).json({ message: "failed to get resume", error: error.message });
    }
}

//get resume by id
const getResumeById = async (req, res) => {
    try {
        const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
        if (!resume) {
            return res.status(404).json({ message: "Resume Not Found" });
        }
        res.json(resume);
    } catch (error) {
        res.status(500).json({ message: "failed to get resume", error: error.message });
    }
}

//update resume function
const updateResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!resume) {
            return res.status(404).json({ message: "Resume Not found or not aurthrized" });
        }
        // merge updated resumes;
        Object.assign(resume, req.body);
        // save updated resume
        const savedResume = await resume.save();
        res.json(savedResume);
    } catch (error) {
        res.status(500).json({ message: "failed to update resume", error: error.message });
    }
}

//delete resume function..
const deleteResume = async (req, res) => {
    try {
        const resume = await Resume.findOne({
            _id: req.params.id,
            userId: req.user._id
        });
        if (!resume) {
            return res.status(404).json({ message: "Resume not found or not authorized" });
        }

        // create a upload folder and store The Resume their.....
        const uploadsFolder = path.join(process.cwd(), "uploads");

        // delete the thumnail..
        if (resume.thumbnailLink) {
            const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
            if (fs.existsSync(oldThumbnail)) {
                fs.unlinkSync(oldThumbnail);
            }
        }

        if (resume.profileInfo?.previewUrl) {
            const oldProfile = path.join(
                uploadsFolder,
                path.basename(resume.profileInfo.previewUrl)
            );
            if (fs.existsSync(oldProfile)) {
                fs.unlinkSync(oldProfile);
            }
        }

        // delete the resume doc
        await resume.deleteOne();

        res.json({ message: "Resume deleted Succesfully" });

    } catch (error) {
        res.status(500).json({ message: "failed to delete resume", error: error.message });
    }
}

module.exports = {
    createdResume,
    getResumeById,
    getUserResume,
    updateResume,
    deleteResume
};
