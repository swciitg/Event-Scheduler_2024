import porModel from '../models/porModel.js';


export const validateEventPOR = async (req, res, next) => {
    try {
        console.log(`${req.user.outlookEmail} posted or made changes to an event for ${req.body.club_org}`);
        const outlookEmail = req.user.outlookEmail;
        const club_org = req.body.club_org;

        let por = await porModel.findOne({ outlookEmail: outlookEmail, club_org: club_org });
        if (!por) {
            return res.status(400).json({
                success: false,
                message: "You are not a part of this club/organization"
            });
        }
        next();
    }
    catch (error) {
        console.log(error.message);
    }
}
