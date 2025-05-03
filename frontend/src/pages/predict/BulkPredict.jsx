import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const BulkPredict = () => {
    const navigate = useNavigate();
    const [file, setFile] = useState(null);
    const [predictions, setPredictions] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && selectedFile.type === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            setFile(selectedFile);
            setError("");
        } else {
            setError("Please select a valid Excel file (.xlsx)");
            setFile(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            setError("Please select a file first");
            return;
        }

        setLoading(true);
        setError("");
        setPredictions([]);

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post(
                `${API_URL}/api/v1/predict/bulk`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                    withCredentials: true
                }
            );
            setPredictions(response.data.predictions);
        } catch (err) {
            setError(err.response?.data?.message || err.message);
        } finally {
            setLoading(false);
        }
    };

    const getAttackType = (attack) => {
        switch (parseInt(attack)) {
            case 0: return 'Other';
            case 1: return 'Neptune (DOS)';
            case 2: return 'Normal';
            case 3: return 'Satan';
            default: return 'Unknown';
        }
    };

    const getFlagType = (flag) => {
        switch (parseInt(flag)) {
            case 0: return 'Other';
            case 1: return 'S0';
            case 2: return 'SF';
            default: return 'Unknown';
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center bg-black text-white p-4 md:p-8">
            <div className="w-full max-w-6xl mx-auto">
                <h1 className="text-3xl font-bold mb-6 text-blue-500 text-center">
                    Bulk Network Intrusion Detection
                </h1>

                <div className="bg-gray-800 rounded-lg p-6 mb-8">
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <div className="form-group flex flex-col">
                            <label className="mb-2 text-lg">Upload Excel File:</label>
                            <input
                                type="file"
                                accept=".xlsx"
                                onChange={handleFileChange}
                                className="text-white file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:font-semibold file:bg-blue-500 file:text-white hover:file:bg-blue-600"
                            />
                            <p className="text-sm text-gray-400 mt-2">
                                The Excel file should contain columns: attack, count, dst_host_diff_srv_rate, dst_host_same_src_port_rate,
                                dst_host_same_srv_rate, dst_host_srv_count, flag, last_flag, logged_in, same_srv_rate, serror_rate, service_http
                            </p>
                        </div>

                        <div className="flex justify-center mt-4 gap-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-40 disabled:opacity-50 transition-all duration-200 hover:scale-105"
                            >
                                {loading ? "Processing..." : "Predict"}
                            </button>
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg w-40 transition-all duration-200 hover:scale-105"
                            >
                                Back
                            </button>
                        </div>
                    </form>
                </div>

                {error && (
                    <div className="mt-4 p-4 bg-red-900/50 text-red-200 rounded-lg text-center border border-red-500">
                        {error}
                    </div>
                )}

                {predictions.length > 0 && (
                    <div className="mt-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-blue-400">Prediction Results</h2>
                            <span className="text-gray-400">Total Predictions: {predictions.length}</span>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {predictions.map((pred, index) => (
                                <div
                                    key={index}
                                    className={`bg-gray-800 rounded-lg p-6 border-l-4 ${pred.output.toLowerCase() === 'normal'
                                        ? 'border-green-500'
                                        : 'border-red-500'
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="text-gray-400">#{index + 1}</span>
                                        <span className={`px-3 py-1 rounded-full text-sm font-semibold ${pred.output.toLowerCase() === 'normal'
                                            ? 'bg-green-500/20 text-green-400'
                                            : 'bg-red-500/20 text-red-400'
                                            }`}>
                                            {pred.output}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-400 text-sm">Attack Type</p>
                                                <p className="text-white">{getAttackType(pred.input.attack)}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Count</p>
                                                <p className="text-white">{pred.input.count}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-400 text-sm">Flag</p>
                                                <p className="text-white">{getFlagType(pred.input.flag)}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Service</p>
                                                <p className="text-white">{pred.input.service_http === 1 ? 'HTTP' : 'Other'}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-400 text-sm">Logged In</p>
                                                <p className="text-white">{pred.input.logged_in === 1 ? 'Yes' : 'No'}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Last Flag</p>
                                                <p className="text-white">{pred.input.last_flag}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-400 text-sm">Same Service Rate</p>
                                                <p className="text-white">{pred.input.same_srv_rate}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Serror Rate</p>
                                                <p className="text-white">{pred.input.serror_rate}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-400 text-sm">Dst Host Diff Srv Rate</p>
                                                <p className="text-white">{pred.input.dst_host_diff_srv_rate}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Dst Host Same Src Port Rate</p>
                                                <p className="text-white">{pred.input.dst_host_same_src_port_rate}</p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <p className="text-gray-400 text-sm">Dst Host Same Srv Rate</p>
                                                <p className="text-white">{pred.input.dst_host_same_srv_rate}</p>
                                            </div>
                                            <div>
                                                <p className="text-gray-400 text-sm">Dst Host Srv Count</p>
                                                <p className="text-white">{pred.input.dst_host_srv_count}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BulkPredict; 
