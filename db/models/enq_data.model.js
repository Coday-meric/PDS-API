module.exports = mongoose => {
    var schema = new mongoose.Schema(
        {
            num_enq: Number,
            sct: Number,
            date_pds: String,
            week_pds: Number,
            year_pds: Number,
            ras: Boolean
        },
        {timestamps: true}
    );

    return mongoose.model("enq_data", schema);
};