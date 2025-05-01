import mongoose from "mongoose";

const featureSchema = new mongoose.Schema({
    attack: { type: Number, required: true },
    count: { type: Number, required: true },
    dst_host_diff_srv_rate: { type: Number, required: true },
    dst_host_same_src_port_rate: { type: Number, required: true },
    dst_host_same_srv_rate: { type: Number, required: true },
    dst_host_srv_count: { type: Number, required: true },
    flag: { type: Number, required: true },
    last_flag: { type: Number, required: true },
    logged_in: { type: Number, required: true, enum: [0, 1] },
    same_srv_rate: { type: Number, required: true },
    serror_rate: { type: Number, required: true },
    service_http: { type: Number, required: true, enum: [0, 1] },
    prediction: { type: String, required: true },
},{
    timestamps: true
});

const Feature = mongoose.model("Feature", featureSchema);

export default Feature;
