module.exports = mongoose => {
    var schema = new mongoose.Schema(
        {
            num_enq: Number,
            sct: Number,
            date_rdv: String,
            date_pds: String,
        },
        {timestamps: true}
    );

    return mongoose.model("rdv_data", schema);
};