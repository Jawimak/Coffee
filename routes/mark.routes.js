const authMiddleware = require("../middleware/auth.middleware");
const Mark = require('../models/Mark');
const { Router } = require("express");
const router = Router();

router.post('/create', authMiddleware, async (req, res) => {
    try {
        const { courseId, val } = req.body;
        const existingMark = await Mark.findOne({ courseId, user: req.user.userId });

        if (existingMark) {
            if (val > existingMark.val) {
                existingMark.val = val;
                await existingMark.save();
                return res.status(200).json({ mark: existingMark });
            }
        } else {
            const newMark = new Mark({
                courseId,
                val,
                user: req.user.userId
            });
            await newMark.save();
            return res.status(201).json({ mark: newMark });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error. Please try again." });
    }
});

module.exports = router;