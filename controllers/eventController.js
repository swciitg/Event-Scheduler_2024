import fs from "fs";
import path from "path";
import { fileURLToPath } from 'url'
import sharp from "sharp";
import {v4} from "uuid";
import eventModel from "../models/eventModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function errorFxn(res, err) {
    console.log(err.message)
    return res.status(500).json({
        saved_successfully: false,
        image_safe: true
    });
}

const getAllEvents = async (req, res) => {
    try {
        const details = await eventModel.find();
        return res.json({
            allEvents : details
        });
    } catch (error) {
        console.log(error.message);
    }
}

const getEvent = async (req, res) => {
    try {
        const eventId = req.query.id;
        if (!eventId) {
            return res.status(400).json({
                message: 'Event ID is required'
            });
        }
        console.log(eventId);

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

const postEvent = async (req, res) => {
    try {
        const { title, club_org, date, description, venue, contactNumber } = req.body;
        const image = req.file;

        // Check if required fields are present
        if (!title || !club_org || !date) {
            return res.status(400).json({
                saved_successfully: false,
                message: "Title, club_org, and date are required fields.",
            });
        }

        let compressedImageName = null;
        if (image) {
            const compressedImage = await sharp(image.buffer)
                .resize(200, 200)
                .toBuffer();
            compressedImageName = v4() + "-compressed.jpg";
            const compressedImagePath = path.resolve(
                __dirname + "/../" + "images_folder" + "/" + compressedImageName
            );
            fs.writeFileSync(compressedImagePath, compressedImage);
        }

        const newEvent = new eventModel({
            title,
            club_org,
            date,
            description, // Optional
            venue, // Optional
            contactNumber, // Optional
            imageURL: image ? image.filename : null,
            compressedImageURL: compressedImageName // Will be null if no image
        });

        await newEvent.save();
        return res.json({
            saved_successfully: true,
            image_safe: true,
        });
    } catch (error) {
        console.log("Error in adding event");
        errorFxn(res, error);
    }
};

const editEvent = async (req, res) => {
    try {
        const eventId = req.query.id;
        if (!eventId){
            return res.status(400).json({
                message: 'Event ID is required'
            });
        }
        const { title, club_org, date, description, venue, contactNumber } = req.body;
        const image = req.file;

        // Check if required fields are present
        if (!title || !club_org || !date) {
            return res.status(400).json({
                saved_successfully: false,
                message: "Title, club_org, and date are required fields.",
            });
        }

        const details = await eventModel.findById(eventId);
        if (!details) {
            return res.status(404).json({ message: "Event not found" });
        }

        if (image) {
            const compressedImagePath = path.resolve(
                __dirname + "/../" + "images_folder" + "/" + details.compressedImageURL
            );
            const imagePath = path.resolve(
                __dirname + "/../" + "images_folder" + "/" + details.imageURL
            );
            if (fs.existsSync(compressedImagePath)) {
                fs.unlinkSync(compressedImagePath);
            }
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }

            const compressedImage = await sharp(image.buffer)
                .resize(200, 200)
                .toBuffer();
            const compressedImageName = v4() + "-compressed.jpg";
            const compressedImagePathNew = path.resolve(
                __dirname + "/../" + "images_folder" + "/" + compressedImageName
            );
            fs.writeFileSync(compressedImagePathNew, compressedImage);

            details.imageURL = image.filename;
            details.compressedImageURL = compressedImageName;
        }

        details.title = title;
        details.club_org = club_org;
        details.date = date;
        details.description = description || details.description;
        details.venue = venue || details.venue;
        details.contactNumber = contactNumber || details.contactNumber;

        await details.save();
        return res.json({
            saved_successfully: true,
            image_safe: true,
        });
    } catch (error) {
        errorFxn(res, error);
    }
};

const deleteEvent = async (req, res) => {
    try {
        const eventId = req.query.id;

        // Check if event ID is provided
        if (!eventId) {
            return res.status(400).json({
                message: 'Event ID is required'
            });
        }

        // Find event by ID
        const details = await eventModel.findById(eventId);

        // Check if event exists
        if (!details) {
            return res.status(404).json({
                message: 'Event not found'
            });
        }

        // Resolve paths for the images
        const compressedImagePath = path.resolve(__dirname + "/../images_folder/" + details.compressedImageURL);
        const imagePath = path.resolve(__dirname + "/../images_folder/" + details.imageURL);

        let imageDeletionReport = {
            compressedImageDeleted: false,
            mainImageDeleted: false,
            compressedImageMissing: false,
            mainImageMissing: false
        };

        // Try deleting compressed image
        try {
            if (fs.existsSync(compressedImagePath)) {
                fs.unlinkSync(compressedImagePath);
                imageDeletionReport.compressedImageDeleted = true;
            } else {
                imageDeletionReport.compressedImageMissing = true;
                console.warn(`Compressed image not found: ${compressedImagePath}`);
            }
        } catch (err) {
            console.error(`Failed to delete compressed image: ${err.message}`);
        }

        // Try deleting main image
        try {
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
                imageDeletionReport.mainImageDeleted = true;
            } else {
                imageDeletionReport.mainImageMissing = true;
                console.warn(`Main image not found: ${imagePath}`);
            }
        } catch (err) {
            console.error(`Failed to delete main image: ${err.message}`);
        }

        // Delete the event from the database
        await eventModel.findByIdAndDelete(eventId);

        // Construct the response with detailed image deletion report
        return res.json({
            deleted_successfully: true,
            imageDeletionReport: imageDeletionReport
        });

    } catch (error) {
        console.error(`Error occurred during event deletion: ${error.message}`);

        return res.status(500).json({
            message: 'Server error occurred while deleting event'
        });
    }
};

const deleteAllEvents = async (req, res) => {
    try {
        const details = await eventModel.find();
        details.forEach(async (detail) => {
            const compressedImagePath = path.resolve(
                __dirname +
                "/../" +
                "images_folder" +
                "/" +
                detail.compressedImageURL
            );
            const imagePath = path.resolve(
                __dirname +
                "/../" +
                "images_folder" +
                "/" +
                detail.imageURL
            );
            fs.unlinkSync(compressedImagePath);
            fs.unlinkSync(imagePath);
            await eventModel.findByIdAndDelete(detail._id);
        });
        return res.json({
            deleted_successfully: true
        });
    }
    catch (error) {
        console.log(error.message);
    }
}

export const EventController = {
    getAllEvents: getAllEvents,
    getEvent: getEvent,
    postEvent: postEvent,
    editEvent: editEvent,
    deleteEvent: deleteEvent,
    deleteAllEvents: deleteAllEvents
}