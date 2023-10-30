import os

def list_all_files(start_directory='.'):
    """Lists all files in the given directory and its sub-directories."""
    for dirpath, dirnames, filenames in os.walk(start_directory):
        # Exclude node_modules directory
        if 'node_modules' in dirnames:
            dirnames.remove('node_modules')
        
        for filename in filenames:
            yield os.path.relpath(os.path.join(dirpath, filename), start_directory)

if __name__ == "__main__":
    current_directory = os.getcwd()  # Gets the current working directory
    print(f"Listing all files in: {current_directory}\n")
    for filepath in list_all_files(current_directory):
        print(filepath)
