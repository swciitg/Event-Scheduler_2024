import eventPorModel from '../models/eventPorModel.js';


export const validateEventPOR = async (req, res, next) => {
    try {
        console.log(`${req.user.outlookEmail} posted or made changes to an event for ${req.body.club_org}`);
        const outlookEmail = req.user.outlookEmail;
        const board = req.body.board;
        let por = null;
        try {
            por = await eventPorModel.findOne({});
        } catch (error) {
            console.log(error.message);
            return res.status(400).json({
                success: false,
                message: "Error fetching POR data from database"
            });
        }
        const boardAdmins = por[board].admins;

        const clubOrgs = por[board].clubs_orgs;
        if (!clubOrgs.includes(req.body.club_org)) {
            console.log("Club/Org not found");
            return res.status(400).json({
                success: false,
                message: `The club/organization ${req.body.club_org} is not part of the ${board} board`
            });
        }
        if (!boardAdmins.includes(outlookEmail)) {
            console.log("POR not found");
            return res.status(400).json({
                success: false,
                message: `You are not authorized to post/edit events for ${board} board`
            });
        }
        next();
    }
    catch (error) {
        console.log(error.message);
        return res.status(400).json({
            success: false,
            message: "Error validating POR"
        });
    }
}
