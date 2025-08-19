const register = async (req, res) => {
    try {
        res.status(201).json({success: true, message: "Registered user successfully"});
    } catch (error) {
        res.status(500).json({success: false, message: `Internal server error: ${error.message}`})
    }
}

export {
    register
}