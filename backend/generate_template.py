import pandas as pd
import numpy as np

# Create sample data
data = {
    'attack': [0, 1, 2, 3],  # 0: Other, 1: Neptune, 2: Normal, 3: Satan
    'count': [100, 200, 300, 400],
    'dst_host_diff_srv_rate': [0.1, 0.2, 0.3, 0.4],
    'dst_host_same_src_port_rate': [0.2, 0.3, 0.4, 0.5],
    'dst_host_same_srv_rate': [0.3, 0.4, 0.5, 0.6],
    'dst_host_srv_count': [10, 20, 30, 40],
    'flag': [0, 1, 2, 0],  # 0: Other, 1: S0, 2: SF
    'last_flag': [0.1, 0.2, 0.3, 0.4],
    'logged_in': [0, 1, 0, 1],  # 0: No, 1: Yes
    'same_srv_rate': [0.4, 0.5, 0.6, 0.7],
    'serror_rate': [0.1, 0.2, 0.3, 0.4],
    'service_http': [0, 1, 0, 1]  # 0: No, 1: Yes
}

# Create DataFrame
df = pd.DataFrame(data)

# Add descriptions for each column
descriptions = {
    'attack': 'Attack Type (0: Other, 1: Neptune, 2: Normal, 3: Satan)',
    'count': 'Number of connections (0-100000)',
    'dst_host_diff_srv_rate': 'Rate of different services (0.0-1.0)',
    'dst_host_same_src_port_rate': 'Rate of same source ports (0.0-1.0)',
    'dst_host_same_srv_rate': 'Rate of same services (0.0-1.0)',
    'dst_host_srv_count': 'Count of services (0-255)',
    'flag': 'Connection Flag (0: Other, 1: S0, 2: SF)',
    'last_flag': 'Last Flag Value (0.0-1.0)',
    'logged_in': 'Logged In Status (0: No, 1: Yes)',
    'same_srv_rate': 'Same Service Rate (0.0-1.0)',
    'serror_rate': 'Serror Rate (0.0-1.0)',
    'service_http': 'HTTP Service (0: No, 1: Yes)'
}

# Create Excel writer
with pd.ExcelWriter('bulk_predict_template.xlsx', engine='xlsxwriter') as writer:
    # Write the data
    df.to_excel(writer, sheet_name='Data', index=False)
    
    # Get workbook and worksheet objects
    workbook = writer.book
    worksheet = writer.sheets['Data']
    
    # Add descriptions in a new sheet
    desc_sheet = workbook.add_worksheet('Column Descriptions')
    desc_sheet.write(0, 0, 'Column Name')
    desc_sheet.write(0, 1, 'Description')
    
    for i, (col, desc) in enumerate(descriptions.items(), start=1):
        desc_sheet.write(i, 0, col)
        desc_sheet.write(i, 1, desc)
    
    # Add data validation for categorical columns
    attack_validation = {'validate': 'list', 'source': ['0', '1', '2', '3']}
    flag_validation = {'validate': 'list', 'source': ['0', '1', '2']}
    logged_in_validation = {'validate': 'list', 'source': ['0', '1']}
    service_http_validation = {'validate': 'list', 'source': ['0', '1']}
    
    # Apply validations
    worksheet.data_validation('A2:A1000', attack_validation)
    worksheet.data_validation('G2:G1000', flag_validation)
    worksheet.data_validation('I2:I1000', logged_in_validation)
    worksheet.data_validation('L2:L1000', service_http_validation)
    
    # Add number format for decimal columns
    decimal_format = workbook.add_format({'num_format': '0.00'})
    for col in ['C', 'D', 'E', 'H', 'J', 'K']:
        worksheet.set_column(f'{col}:{col}', None, decimal_format)
    
    # Add number format for integer columns
    integer_format = workbook.add_format({'num_format': '0'})
    for col in ['B', 'F']:
        worksheet.set_column(f'{col}:{col}', None, integer_format)

print("Template file 'bulk_predict_template.xlsx' has been created successfully!") 