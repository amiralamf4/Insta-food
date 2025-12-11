const mongose = require('mongoose');

const likeSchema = new mongose.Schema({
    user:{
        type: mongose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    food:{
        type: mongose.Schema.Types.ObjectId,
        ref: 'food',
        required: true
    }
},{
    timestamps: true
})

const Like = mongose.model('like', likeSchema);

module.exports = Like;