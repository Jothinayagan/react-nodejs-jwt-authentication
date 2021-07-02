module.exports = {
    getUserDetails: (req, res) => {
        console.log(`User details will be pop up here!!`);
        return res.send({ success: true, data: "Jothinayagan" });
    },
};
