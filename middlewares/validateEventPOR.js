import porModel from '../models/por.model.js';


export const validateEventPOR = async (req, res, next) => {
    try {
        console.log(req);
        const rollNo = req.user.rollNo;
        const club_org = req.body.club_org;

        let por = await porModel.findOne({ rollNo: rollNo, club_org: club_org });
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
