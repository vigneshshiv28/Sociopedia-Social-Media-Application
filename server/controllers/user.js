import User from "../models/User.js";


export const getUser = async(req,res) =>{
    try {
        const { id } = req.params.id;
        const user = await User.findById(id);
        res.json(user);
    } catch (err) {
        res.status(404).json({error: err.message});
    }
};

export const getUserFriends = async (req,res) =>{
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        ) ;
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath}) => {
                return {_id,firstName,lastName,occupation,location,picturePath}
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({message: err});
    }
}

export const addRemoveFriends = async(req,res) =>{
    try {
        const {id,friendId} = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(id);

        if(user.friends.includes(friendId)){
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = freind.friends.filter((id) => id !== id);
        } else{
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        ) ;
        const formattedFriends = friends.map(
            ({_id,firstName,lastName,occupation,location,picturePath}) => {
                return {_id,firstName,lastName,occupation,location,picturePath}
            }
        );
    } catch (err) {
        res.status(404).json({message:err});
    }
}