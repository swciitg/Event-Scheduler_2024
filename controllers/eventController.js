import fs from "fs";
import path from "path";
import sharp from "sharp";
import uuid from "uuid";
import eventModel from "../models/eventModel";

function errorFxn(res, err) {
    console.log(err);
    return res.status(500).json({
        saved_successfully: false,
        image_safe: true
    });
}

const getAllEvents = async (req, res) => {
    try {
        const details = await eventModel.find();
        return res.json({
            details: details
        });
    } catch (error) {
        console.log(error.message);
    }
}

const getEvent = async (req, res) => {
    try {
        const details = await eventModel.findById(req.query.id);
        return res.json({
            details: details
        });
    }
    catch (error) {
        console.log(error.message);
    }
};

const postEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            club_org,
            date,
            venue,
            contactNumber
        } = req.body;
        const image = req.file;
        const compressedImage = await sharp(image.buffer)
            .resize(200, 200)
            .toBuffer();
        const compressedImageName = uuid.v4() + "-compressed.jpg";
        const compressedImagePath = path.resolve(
            __dirname + "/../" + "images_folder" + "/" + compressedImageName
        );
        fs.writeFileSync(compressedImagePath, compressedImage);
        const newEvent = new eventModel({
            title,
            description,
            club_org,
            date,
            venue,
            contactNumber,
            imageURL: image.filename,
            compressedImageURL: compressedImageName
        });
        await newEvent.save();
        return res.json({
            saved_successfully: true,
            image_safe: true
        });
    } catch (error) {
        errorFxn(res, error);
    }
};

const editEvent = async (req, res) => {
    try {
        const {
            title,
            description,
            club_org,
            date,
            venue,
            contactNumber
        } = req.body;
        const image = req.file;
        const details = await eventModel.findById(req.query.id);
        const compressedImagePath = path.resolve(
            __dirname +
            "/../" +
            "images_folder" +
            "/" +
            details.compressedImageURL
        );
        const imagePath = path.resolve(
            __dirname +
            "/../" +
            "images_folder" +
            "/" +
            details.imageURL
        );
        fs.unlinkSync(compressedImagePath);
        fs.unlinkSync(imagePath);
        const compressedImage = await sharp(image.buffer)
            .resize(200, 200)
            .toBuffer();
        const compressedImageName = uuid.v4() + "-compressed.jpg";
        const compressedImagePathNew = path.resolve(
            __dirname + "/../" + "images_folder" + "/" + compressedImageName
        );
        fs.writeFileSync(compressedImagePathNew, compressedImage);
        await eventModel.findByIdAndUpdate(req.query.id, {
            title,
            description,
            club_org,
            date,
            venue,
            contactNumber,
            imageURL: image.filename,
            compressedImageURL: compressedImageName
        });
        return res.json({
            saved_successfully: true,
            image_safe: true
        });
    } catch (error) {
        errorFxn(res, error);
    }
}


const deleteEvent = async (req, res) => {
    try {
        const details = await
            eventModel.findById(req.query.id);
        const compressedImagePath = path.resolve(
            __dirname +
            "/../" +
            "images_folder" +
            "/" +
            details.compressedImageURL
        );
        const imagePath = path.resolve(
            __dirname +
            "/../" +
            "images_folder" +
            "/" +
            details.imageURL
        );
        fs.unlinkSync(compressedImagePath);
        fs.unlinkSync(imagePath);
        await eventModel.findByIdAndDelete(req.query.id);
        return res.json({
            deleted_successfully: true
        });
    }
    catch (error) {
        console.log(error.message);
    }
}

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

export const eventController = {
    getAllEvents: getAllEvents,
    getEvent: getEvent,
    postEvent: postEvent,
    editEvent: editEvent,
    deleteEvent: deleteEvent,
    deleteAllEvents: deleteAllEvents
}