import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "Genearl"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model('notes', NotesSchema);