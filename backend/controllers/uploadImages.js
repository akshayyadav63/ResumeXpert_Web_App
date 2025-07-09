const fs = require("fs");
const path = require("path");
const Resume = require("../models/resumeModel");
const upload  = require("../middleware/uploadMiddleware");

const uploadResumeImage = async (req, res) => {
    try {
        // cpnfigure mullter to handle images;
        upload.fields([
            { name: "thumbnail" },
            { name: "profileImage" }
        ])(req, res, async (err) => {
            if (err) {
                return res.status(400).json({ message: "file uploads faied", error: err.message });
            }

            const resumeId = req.params.id;
            const resume = await Resume.findOne({ _id: resumeId, userId: req.user._id });

            if (!resume) {
                return res.status(404).json({ message: "Resume Not found or unauthorized" });
            }

            // use process cwd to ocate uploads folder 
            const uploadFolder = path.join(process.cwd(), "uploads");
            const baseUrl = `${req.protocol}://${req.get("host")}`;

            const newThumbnail = req.files?.thumbnail?.[0];
            const newProfileImage = req.files?.profileImage?.[0];

            if (newThumbnail) {
                if (resume.thumbnailLink) {
                    const oldThumbnail = path.join(uploadFolder, path.basename(resume.thumbnailLink));
                    if (fs.existsSync(oldThumbnail)) fs.unlinkSync(oldThumbnail);
                }
                resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
            }

            // same for the profile priew iamge 
            if (newProfileImage) {
                if (resume.profileInfo?.profilePreviewURL) {
                    const oldProfile = path.join(uploadFolder, path.basename(resume.profileInfo.profilePreviewURL));
                    if (fs.existsSync(oldProfile)) fs.unlinkSync(oldProfile);
                }
                if (resume.profileInfo) {
                    resume.profileInfo.profilePreviewURL = `${baseUrl}/uploads/${newProfileImage.filename}`;
                }
            }

            await resume.save();
            res.status(200).json({
                message: "image uploaded succesfully",
                thumbnailLink: resume.thumbnailLink,
                profilePreviewUrl: resume.profileInfo?.profilePreviewURL
            });
        });

    } catch (err) {
        console.error('error uploading image', err);
        res.status(500).json({
            message: "failed to uploaded images",
            error: err.message
        });
    }
}

module.exports={uploadResumeImage}