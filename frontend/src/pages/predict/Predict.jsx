import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./App.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/";

const Predict = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    attack: 0,
    count: "",
    dst_host_diff_srv_rate: "",
    dst_host_same_src_port_rate: "",
    dst_host_same_srv_rate: "",
    dst_host_srv_count: "",
    flag: 0,  // ADDED flag field
    last_flag: "",
    logged_in: 0,
    same_srv_rate: "",
    serror_rate: "",
    service_http: 0,
  });

  const [prediction, setPrediction] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPrediction("");

    try {
      const payload = {
        ...formData,
        count: parseFloat(formData.count),
        dst_host_diff_srv_rate: parseFloat(formData.dst_host_diff_srv_rate),
        dst_host_same_src_port_rate: parseFloat(formData.dst_host_same_src_port_rate),
        dst_host_same_srv_rate: parseFloat(formData.dst_host_same_srv_rate),
        dst_host_srv_count: parseInt(formData.dst_host_srv_count),
        flag: parseInt(formData.flag),  // Ensure flag is an integer
        last_flag: parseFloat(formData.last_flag),
        same_srv_rate: parseFloat(formData.same_srv_rate),
        serror_rate: parseFloat(formData.serror_rate),
        logged_in: parseInt(formData.logged_in),
      };

      const response = await axios.post(
        `${API_URL}api/v1/predict/result`,
        payload,
        { withCredentials: true }
      );
      setPrediction(response.data.output);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-black text-white p-4 md:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-500">
          Network Intrusion Detection System
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Attack Type */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">Attack Type:</label>
              <select
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                name="attack"
                value={formData.attack}
                onChange={handleInputChange}
              >
                <option value={0}>Other</option>
                <option value={1}>Neptune (DOS)</option>
                <option value={2}>Normal</option>
                <option value={3}>Satan (Attack)</option>
              </select>
            </div>

            {/* Flag Field */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">Flag:</label>
              <select
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                name="flag"
                value={formData.flag}
                onChange={handleInputChange}
              >
                <option value={0}>Other</option>
                <option value={1}>S0</option>
                <option value={2}>SF</option>
              </select>
            </div>

            {/* Count */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">Count (0 - 100000):</label>
              <input
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                type="number"
                name="count"
                value={formData.count}
                onChange={handleInputChange}
                min="0"
                max="100000"
                required
              />
            </div>

            {/* dst_host_diff_srv_rate */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">dst_host_diff_srv_rate (0.0 - 1.0):</label>
              <input
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                type="number"
                step="0.01"
                name="dst_host_diff_srv_rate"
                value={formData.dst_host_diff_srv_rate}
                onChange={handleInputChange}
                min="0"
                max="1"
                required
              />
            </div>

            {/* dst_host_same_src_port_rate */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">dst_host_same_src_port_rate (0.0 - 1.0):</label>
              <input
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                type="number"
                step="0.01"
                name="dst_host_same_src_port_rate"
                value={formData.dst_host_same_src_port_rate}
                onChange={handleInputChange}
                min="0"
                max="1"
                required
              />
            </div>

            {/* dst_host_same_srv_rate */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">dst_host_same_srv_rate (0.0 - 1.0):</label>
              <input
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                type="number"
                step="0.01"
                name="dst_host_same_srv_rate"
                value={formData.dst_host_same_srv_rate}
                onChange={handleInputChange}
                min="0"
                max="1"
                required
              />
            </div>

            {/* dst_host_srv_count */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">dst_host_srv_count (0 - 255):</label>
              <input
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                type="number"
                name="dst_host_srv_count"
                value={formData.dst_host_srv_count}
                onChange={handleInputChange}
                min="0"
                max="255"
                required
              />
            </div>

            {/* last_flag */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">Last Flag (0.0 - 1.0):</label>
              <input
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                type="number"
                step="0.01"
                name="last_flag"
                value={formData.last_flag}
                onChange={handleInputChange}
                min="0"
                max="1"
                required
              />
            </div>

            {/* logged_in */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">Logged In (0 or 1):</label>
              <select
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                name="logged_in"
                value={formData.logged_in}
                onChange={handleInputChange}
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>

            {/* same_srv_rate */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">Same Service Rate (0.0 - 1.0):</label>
              <input
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                type="number"
                step="0.01"
                name="same_srv_rate"
                value={formData.same_srv_rate}
                onChange={handleInputChange}
                min="0"
                max="1"
                required
              />
            </div>

            {/* serror_rate */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">Serror Rate (0.0 - 1.0):</label>
              <input
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                type="number"
                step="0.01"
                name="serror_rate"
                value={formData.serror_rate}
                onChange={handleInputChange}
                min="0"
                max="1"
                required
              />
            </div>

            {/* service_http */}
            <div className="form-group">
              <label className="block text-sm md:text-base mb-2">Service HTTP (0 or 1):</label>
              <select
                className="w-full p-2 rounded-lg bg-white text-black focus:ring-2 focus:ring-blue-500"
                name="service_http"
                value={formData.service_http}
                onChange={handleInputChange}
              >
                <option value={0}>No</option>
                <option value={1}>Yes</option>
              </select>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row justify-center gap-4 mt-8">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg w-full md:w-auto transition-transform hover:scale-105 shadow-lg"
            >
              Predict
            </button>
            <button
              type="button"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg w-full md:w-auto transition-transform hover:scale-105 shadow-lg"
              onClick={() => navigate('/bulk-predict')}
            >
              Bulk Predict
            </button>
            <button
              type="button"
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg w-full md:w-auto transition-transform hover:scale-105 shadow-lg"
              onClick={() => navigate('/')}
            >
              Back
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-lg text-center">
            {error}
          </div>
        )}

        {prediction && (
          <div className="mt-4 p-4 bg-gray-800 rounded-lg text-center">
            <h3 className="text-lg md:text-xl">
              Attack Class: <span className="text-red-500 font-bold">{prediction}</span>
            </h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default Predict;
