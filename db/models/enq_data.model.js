module.exports = mongoose => {
    var schema = new mongoose.Schema(
        {
            num_enq: Number,
            sct: Number,
            date_pds: String
        },
        {timestamps: true}
    );

    return mongoose.model("enq_data", schema);
};