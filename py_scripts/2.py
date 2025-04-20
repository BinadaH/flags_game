# import OS module
import os
# Get the list of all files and directories
path = "flag_data/imgs"
dir_list = os.listdir(path)
# print("Files and directories in '", path, "' :")
# prints all files
for a in dir_list:
    print(f'"{path}/{a}",')