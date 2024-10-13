import porModel from '../models/porModel.js';


export const validateEventPOR = async (req, res, next) => {
    try {
        console.log(`${req.user.outlookEmail} posted or made changes to an event for ${req.body.club_org}`);
        const outlookEmail = req.user.outlookEmail;
        const board = req.body.board;

        let por = await porModel.findOne({ outlookEmail: outlookEmail, board: board });
        if (!por) {
            console.log("POR not found");
            return res.status(400).json({
                success: false,
                message: `You are not authorized to post events for ${board} board`
            });
        }
        next();
    }
    catch (error) {
        console.log(error.message);
    }
}
