# import numpy as np
# import sys
# import json
# import joblib

# # Load the model
# model = joblib.load('model.pkl')

# # Read input data from Node.js
# input_data = json.loads(sys.argv[1])

# # Extract features
# attack = int(input_data['attack'])
# count = float(input_data['count'])
# dst_host_diff_srv_rate = float(input_data['dst_host_diff_srv_rate'])
# dst_host_same_src_port_rate = float(input_data['dst_host_same_src_port_rate'])
# dst_host_same_srv_rate = float(input_data['dst_host_same_srv_rate'])
# dst_host_srv_count = float(input_data['dst_host_srv_count'])
# flag = int(input_data['flag'])
# last_flag = float(input_data['last_flag'])
# logged_in = int(input_data['logged_in'])
# same_srv_rate = float(input_data['same_srv_rate'])
# serror_rate = float(input_data['serror_rate'])
# service_http = int(input_data['service_http'])

# # One-hot encode categorical variables
# attack_encoding = [0, 0, 0]  # Default encoding for "Other"
# if attack == 1:
#     attack_encoding = [1, 0, 0]  # Neptune
# elif attack == 2:
#     attack_encoding = [0, 1, 0]  # Normal
# elif attack == 3:
#     attack_encoding = [0, 0, 1]  # Satan

# flag_encoding = [0, 0]  # Default encoding for "Other"
# if flag == 1:
#     flag_encoding = [1, 0]  # S0
# elif flag == 2:
#     flag_encoding = [0, 1]  # SF

# # Ensure a flat numerical array
# features = np.array([
#     *attack_encoding,  # Unpack attack encoding
#     count,
#     dst_host_diff_srv_rate,
#     dst_host_same_src_port_rate,
#     dst_host_same_srv_rate,
#     dst_host_srv_count,
#     *flag_encoding,  # Unpack flag encoding
#     last_flag,
#     logged_in,
#     same_srv_rate,
#     serror_rate,
#     service_http
# ]).reshape(1, -1)  # Ensure 2D shape

# # Make prediction
# prediction = model.predict(features)[0]

# # Map prediction to label
# output_map = {
#     0: 'Normal',
#     1: 'DOS',
#     2: 'PROBE',
#     3: 'R2L',
#     4: 'U2R'
# }
# output = output_map.get(prediction, 'Unknown')

# # Print JSON output for Node.js to read
# print(json.dumps({"output": output}))

import numpy as np
import sys
import json
import joblib

try:
    # Load the model
    model = joblib.load('model.pkl')
    
    # Read input data from Node.js
    input_data = json.loads(sys.argv[1])
    
    # Handle both single record and multiple records
    if not isinstance(input_data, list):
        input_data = [input_data]
    
    predictions = []
    
    for record in input_data:
        # Extract features
        attack = int(record.get('attack', 0))
        count = float(record.get('count', 0))
        dst_host_diff_srv_rate = float(record.get('dst_host_diff_srv_rate', 0))
        dst_host_same_src_port_rate = float(record.get('dst_host_same_src_port_rate', 0))
        dst_host_same_srv_rate = float(record.get('dst_host_same_srv_rate', 0))
        dst_host_srv_count = float(record.get('dst_host_srv_count', 0))
        flag = int(record.get('flag', 0))
        last_flag = float(record.get('last_flag', 0))
        logged_in = int(record.get('logged_in', 0))
        same_srv_rate = float(record.get('same_srv_rate', 0))
        serror_rate = float(record.get('serror_rate', 0))
        service_http = int(record.get('service_http', 0))

        # One-hot encode categorical variables
        attack_encoding = [0, 0, 0]  # Default encoding for "Other"
        if attack == 1:
            attack_encoding = [1, 0, 0]  # Neptune
        elif attack == 2:
            attack_encoding = [0, 1, 0]  # Normal
        elif attack == 3:
            attack_encoding = [0, 0, 1]  # Satan

        flag_encoding = [0, 0]  # Default encoding for "Other"
        if flag == 1:
            flag_encoding = [1, 0]  # S0
        elif flag == 2:
            flag_encoding = [0, 1]  # SF

        # Ensure a flat numerical array
        features = np.array([
            *attack_encoding,  # Unpack attack encoding
            count,
            dst_host_diff_srv_rate,
            dst_host_same_src_port_rate,
            dst_host_same_srv_rate,
            dst_host_srv_count,
            *flag_encoding,  # Unpack flag encoding
            last_flag,
            logged_in,
            same_srv_rate,
            serror_rate,
            service_http
        ]).reshape(1, -1)  # Ensure 2D shape

        # Make prediction
        prediction = model.predict(features)[0]

        # Map prediction to label
        output_map = {
            0: 'Normal',
            1: 'DOS',
            2: 'PROBE',
            3: 'R2L',
            4: 'U2R'
        }
        output = output_map.get(prediction, 'Unknown')
        
        predictions.append({
            "input": record,
            "output": output
        })

    # Print JSON output for Node.js to read
    print(json.dumps({"predictions": predictions}))
    
except Exception as e:
    print(json.dumps({"error": str(e)}))