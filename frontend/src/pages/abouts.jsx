import React from 'react'

import { Link } from "react-router-dom";

const Abouts = () => {
  const attackTypes = [
    {
      name: "Neptune (DoS)",
      type: "Denial of Service",
      description: "SYN flood attack that overwhelms target resources",
      impact: "🛑 Disrupts service availability",
      example: "Flooding TCP SYN requests to exhaust connection queues"
    },
    {
      name: "Satan",
      type: "Probing Attack",
      description: "Network reconnaissance to discover vulnerabilities",
      impact: "🔍 Identifies weak points for future attacks",
      example: "Port scanning, service version detection"
    },
    {
      name: "Normal",
      type: "Legitimate Traffic",
      description: "Regular network communications",
      impact: "✅ Safe, authorized activities",
      example: "Typical web browsing, file transfers"
    },
    {
      name: "Other",
      type: "Miscellaneous Attacks",
      description: "Various potential threat categories",
      impact: "⚠️ Varies by specific attack type",
      examples: ["IP spoofing", "Brute force attempts", "Malware traffic"]
    }
  ];

  const parameters = [
    {
      name: "Attack Type",
      type: "integer",
      values: "0-3",
      description: "Type of network activity being classified (Other, Neptune DoS, Normal, Satan Attack)"
    },
    {
      name: "Flag",
      type: "integer",
      values: "0-2",
      description: "Connection status flags (Other, S0, SF). S0 = No response, SF = Normal establishment/termination"
    },
    {
      name: "Count",
      type: "float",
      values: "0-100000",
      description: "Number of connections to the same host in a short time window"
    },
    {
      name: "dst_host_diff_srv_rate",
      type: "float",
      values: "0.0-1.0",
      description: "Percentage of different services on the destination host"
    },
    {
      name: "dst_host_same_src_port_rate",
      type: "float",
      values: "0.0-1.0",
      description: "Percentage of connections from same source port to destination host"
    },
    {
      name: "dst_host_same_srv_rate",
      type: "float",
      values: "0.0-1.0",
      description: "Percentage of same service connections on destination host"
    },
    {
      name: "dst_host_srv_count",
      type: "integer",
      values: "0-255",
      description: "Number of connections to the same service on destination host"
    },
    {
      name: "last_flag",
      type: "float",
      values: "0.0-1.0",
      description: "Percentage of connections with the same flag in last 2 seconds"
    },
    {
      name: "logged_in",
      type: "boolean",
      values: "0/1",
      description: "Indicates if user was authenticated (1) or not (0)"
    },
    {
      name: "same_srv_rate",
      type: "float",
      values: "0.0-1.0",
      description: "Percentage of connections to the same service"
    },
    {
      name: "serror_rate",
      type: "float",
      values: "0.0-1.0",
      description: "Percentage of connections with SYN errors"
    },
    {
      name: "service_http",
      type: "boolean",
      values: "0/1",
      description: "Indicates if HTTP service was used (1) or not (0)"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-500">
          Network Intrusion Detection Parameters
        </h1>

        <p className="mb-8 text-base md:text-lg text-gray-300 text-center">
          This system uses machine learning to analyze network traffic patterns and detect potential intrusions.
          Below are explanations of the key parameters used in the detection process:
        </p>

        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
          {parameters.map((param, index) => (
            <div key={index} className="bg-gray-800 p-4 md:p-6 rounded-lg shadow-lg">
              <h3 className="text-lg md:text-xl font-semibold mb-2 text-blue-400">{param.name}</h3>
              <div className="mb-2">
                <span className="text-gray-400">Type: </span>
                <span className="text-white">{param.type}</span>
              </div>
              <div className="mb-2">
                <span className="text-gray-400">Values: </span>
                <span className="text-white">{param.values}</span>
              </div>
              <p className="text-gray-300 text-sm md:text-base">{param.description}</p>
            </div>
          ))}
        </div>

        <section className="mt-8 md:mt-12">
          <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center text-red-400">Detected Attack Types</h2>
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
            {attackTypes.map((attack, index) => (
              <div key={index} className="bg-gray-800 p-4 md:p-6 rounded-lg border-2 border-red-700 shadow-lg">
                <h3 className="text-lg md:text-xl font-semibold mb-2 text-red-300">
                  {attack.name}
                  <span className="ml-2 text-sm text-gray-400">({attack.type})</span>
                </h3>
                <p className="text-gray-300 mb-3 text-sm md:text-base">{attack.description}</p>
                <div className="text-yellow-400">
                  <p className="mb-1 text-sm md:text-base">{attack.impact}</p>
                  <p className="text-xs md:text-sm">
                    {attack.example || attack.examples?.join(", ")}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 flex justify-center">
          <Link
            to="/"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg w-32 text-center transition-transform hover:scale-105 shadow-lg"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Abouts;