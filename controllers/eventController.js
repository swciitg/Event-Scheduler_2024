import fs from "fs";
import path from "path";
import sharp from "sharp";
import { v4 as uuidv4 } from "uuid";
import eventModel from "../models/eventModel.js";
import porModel from "../models/porModel.js";
import { definedCategories, swcDeployUrl } from "../shared/constants.js";
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import mime from 'mime';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set the upload directory
const uploadDir = path.resolve('uploads');

// Base URL for serving static images
// const baseURL = `${process.env.API_URL}${process.env.BASE_URL}`;
// let baseURL = process.env.BASE_URL;
// if (process.env.NODE_ENV === 'dev') {
const baseURL = swcDeployUrl;
// }

// Get all events
const getAllEvents = async (req, res) => {
    try {
        const details = await eventModel.find();

        // Sort events by startDateTime
        const sortedDetails = details.sort((a, b) => {
            return new Date(a.startDateTime) - new Date(b.startDateTime);
        });

        return res.status(200).json({
            message: 'All events fetched successfully',
            allEvents: sortedDetails
        });
    } catch (error) {
        console.log("Error in getting all events");
        console.log(error.message);
        return res.status(500).json({
            message: 'Server error, could not get all events'
        });
    }
};

// Get a single event by ID
const getEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        if (!eventId) {
            return res.status(400).json({
                message: 'Event ID is required'
            });
        }

        // if eventId is docs or admin direct to 500
        if (eventId === "docs" || eventId === "admin") {
            return res.status(500).json({
                message: 'Server error, event ID cannot be docs or admin'
            });
        }

        // if eventId is not a valid ObjectId
        if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({
                message: `Invalid event ID: ${eventId}`
            });
        }

        const details = await eventModel.findById(eventId);
        if (!details) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }

        return res.json({
            event: details
        });
    } catch (error) {
        console.error(error.message);
        return res.status(500).json({
            message: 'Server error'
        });
    }
};

const groupEventsByCategory = (events) => {
    let groupedEvents = {};
    for (let category of definedCategories) {
        groupedEvents[category] = [];
    }

    for (let event of events) {
        for (let category of event.categories) {
            if (!groupedEvents[category]) {
                groupedEvents[category] = [];
            }
            groupedEvents[category].push(event);
        }
    }

    // sort events in each category by startDateTime
    let sortedCategoryEvents = {};
    for (let category in groupedEvents) {
        sortedCategoryEvents[category] = groupedEvents[category].sort((a, b) => {
            return new Date(a.startDateTime) - new Date(b.startDateTime);
        });
    }

    return sortedCategoryEvents;
}

const getGroupedEvents = async (req, res) => {
    try {
        const events = await eventModel.find();
        const groupedEvents = groupEventsByCategory(events);
        return res.status(200).json(groupedEvents);
    } catch (error) {
        console.error("Error in getting grouped events", error.message);
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
}

// Post a new event
const postEvent = async (req, res) => {
    try {
        const { title, club_org, board, startDateTime, endDateTime, description, venue, contactNumber, categories } = req.body;
        const image = req.file;

        if (!title || !club_org || !startDateTime || !endDateTime || !board) {
            return res.status(400).json({
                saved_successfully: false,
                message: "Title, club_org, board, startDateTime and endDateTime are required"
            });
        }

        // check if categories are valid

        if (categories) {
            for (let category of categories) {
                if (!definedCategories.includes(category)) {
                    return res.status(400).json({
                        saved_successfully: false,
                        message: `Invalid category: ${category}`
                    });
                }
            }
            // check if "All" category is present
            if (!categories.includes("All")) {
                categories.push("All");
            }
        }


        let compressedImageName = null;
        let fullImageUrl = null;
        let compressedImageUrl = null;

        if (image) {
            // check if image is jpg, jpeg or png, else return error
            const mimeType = mime.lookup(image.path);
            if (!mimeType || !mimeType.match(/image\/(jpeg|jpg|png)/)) {
                return res.status(400).json({
                    saved_successfully: false,
                    message: "Invalid image format. Only jpg, jpeg and png are allowed"
                });
            }
            const compressedImage = await sharp(image.path)
                .toBuffer();
            compressedImageName = uuidv4() + "-compressed.jpg";
            const compressedImagePath = path.resolve(uploadDir, compressedImageName);
            fs.writeFileSync(compressedImagePath, compressedImage);

            // Build full URLs
            fullImageUrl = `${baseURL}/uploads/${image.filename}`;
            compressedImageUrl = `${baseURL}/uploads/${compressedImageName}`;
        }

        const newEvent = new eventModel({
            title,
            club_org,
            board,
            startDateTime,
            endDateTime,
            description, // Optional
            venue, // Optional
            contactNumber, // Optional
            imageURL: fullImageUrl,
            compressedImageURL: compressedImageUrl, // Will be null if no image
            categories: categories ? categories : ["All"]
        });

        await newEvent.save();
        // return id of the newly created event for future reference
        return res.status(201).json({
            saved_successfully: true,
            id: newEvent._id
        });
    } catch (error) {
        console.error("Error in posting event", error.message);
        return res.status(500).json({
            saved_successfully: false,
            message: 'Internal Server error'
        });
    }
};

// Edit an event
const editEvent = async (req, res) => {
    try {
        const eventId = req.params.id;
        if (!eventId) {
            return res.status(400).json({
                message: 'Event ID is required'
            });
        }

        const details = await eventModel.findById(eventId);
        if (!details) {
            return res.status(404).json({ message: "Event not found" });
        }

        const userEmail = req.user.outlookEmail;

        // Check if the user is authorized to edit the event
        const user = await porModel.findOne({ outlookEmail: userEmail, board: details.board });
        if (!user) {
            return res.status(400).json({
                message: `You are not authorized to edit this event, as you are not a part of ${details.board} board`
            });
        }

        const { title, club_org, board,  startDateTime, endDateTime, description, venue, contactNumber } = req.body;
        const image = req.file;

        let fullImageUrl = details.imageURL;
        let compressedImageUrl = details.compressedImageURL;

        if (image) {

            // Check if image is jpg, jpeg or png and is parsable by sharp, else return error
            const mimeType = mime.lookup(image.path);
            if (!mimeType || !mimeType.match(/image\/(jpeg|jpg|png)/)) {
                return res.status(400).json({
                    saved_successfully: false,
                    message: "Invalid image format. Only jpg, jpeg and png are allowed"
                });
            }

            // Delete old images if they exist
            if (details.compressedImageURL) {
                const compressedImagePath = path.resolve(uploadDir, details.compressedImageURL);
                if (fs.existsSync(compressedImagePath)) {
                    fs.unlinkSync(compressedImagePath);
                }
            }
            if (details.imageURL) {
                const imagePath = path.resolve(uploadDir, details.imageURL);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }

            // Save new image
            const compressedImage = await sharp(image.path).toBuffer();
            const compressedImageName = uuidv4() + "-compressed.jpg";
            const compressedImagePathNew = path.resolve(uploadDir, compressedImageName);
            fs.writeFileSync(compressedImagePathNew, compressedImage);

            // Build full URLs for new images
            fullImageUrl = `${baseURL}/uploads/${image.filename}`;
            compressedImageUrl = `${baseURL}/uploads/${compressedImageName}`;
        }

        if (title) details.title = title;
        if (club_org) details.club_org = club_org;
        if (board) details.board = board;
        if (startDateTime) details.startDateTime = startDateTime;
        if (endDateTime) details.endDateTime = endDateTime;
        if (description) details.description = description;
        if (venue) details.venue = venue;
        if (contactNumber) details.contactNumber = contactNumber;

        details.imageURL = fullImageUrl;
        details.compressedImageURL = compressedImageUrl;

        await details.save();
        return res.json({
            edited_successfully: true,
        });
    } catch (error) {
        console.error("Error in editing event: ", error.message);
        console.log(error);
        return res.status(500).json({
            edited_successfully: false,
        });
    }
};

// Delete an event
const deleteEvent = async (req, res) => {
    try {
        const eventId = req.params.id;

        if (!eventId) {
            return res.status(400).json({
                message: 'Event ID is required'
            });
        }

        const details = await eventModel.findById(eventId);
        if (!details) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }

        const userEmail = req.user.outlookEmail;
        
        // check if the user is authorized to delete the event
        const user = await porModel.findOne({ outlookEmail: userEmail, board: details.board });
        if (!user) {
            return res.status(400).json({
                message: `You are not authorized to delete this event, as you are not a part of ${details.board} board`
            });
        }

        if (details.compressedImageURL) {
            const compressedImagePath = path.resolve(uploadDir, details.compressedImageURL);
            if (fs.existsSync(compressedImagePath)) {
                fs.unlinkSync(compressedImagePath);
            }
        }
        if (details.imageURL) {
            const imagePath = path.resolve(uploadDir, details.imageURL);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }
        await eventModel.findByIdAndDelete(eventId);
        return res.json({
            deleted_successfully: true
        });
    } catch (error) {
        console.error("Error in deleting event", error.message);
        return res.status(500).json({
            message: 'Server error'
        });
    }
};

// Delete all events
const deleteAllEvents = async (req, res) => {
    try {
        const details = await eventModel.find();
        for (let detail of details) {
            if (detail.compressedImageURL) {
                const compressedImagePath = path.resolve(uploadDir, detail.compressedImageURL);
                if (fs.existsSync(compressedImagePath)) {
                    fs.unlinkSync(compressedImagePath);
                }
            }
            if (detail.imageURL) {
                const imagePath = path.resolve(uploadDir, detail.imageURL);
                if (fs.existsSync(imagePath)) {
                    fs.unlinkSync(imagePath);
                }
            }
            await eventModel.findByIdAndDelete(detail._id);
        }
        return res.json({
            deleted_successfully: true
        });
    } catch (error) {
        console.log("Error in deleting all events", error.message);
        return res.status(500).json({
            message: 'Internal Server error'
        });
    }
};

// Delete all events that have already ended
const deleteExpiredEvents = async () => {
    try {
        const details = await eventModel.find();
        for (let detail of details) {
            if (new Date(detail.endDateTime) < new Date()) {
                if (detail.compressedImageURL) {
                    const compressedImagePath = path.resolve(uploadDir, detail.compressedImageURL);
                    if (fs.existsSync(compressedImagePath)) {
                        fs.unlinkSync(compressedImagePath);
                    }
                }
                if (detail.imageURL) {
                    const imagePath = path.resolve(uploadDir, detail.imageURL);
                    if (fs.existsSync(imagePath)) {
                        fs.unlinkSync(imagePath);
                    }
                }
                await eventModel.findByIdAndDelete(detail._id);
            }
        }
        return "Expired events deleted successfully";
    } catch (error) {
        console.log("Error in deleting expired events", error.message);
    }
}

// Export the controller
export const EventController = {
    getAllEvents,
    getEvent,
    postEvent,
    editEvent,
    deleteEvent,
    deleteAllEvents,
    getGroupedEvents,
    deleteExpiredEvents
};