### File Manager - Node.js CLI Application

This is a File Manager application built with Node.js. It provides a Command-Line Interface (CLI) for performing various file and system operations.
### Features
 - CLI-based interface for easy navigation and operations.
 - Supports file management:
    - Create, rename, delete, copy, move files.
    - Read file content with Streams API.
 - Supports retrieving system information:
    - CPU details, End-Of-Line (EOL), OS architecture, home directory, etc.
 - Provides hash calculation for files.
 - Supports Brotli compression and decompression for files (using Streams API).
### Prerequisites
 - Node.js 22.x.x (```22.9.0```) or higher is required to run this application.
No external dependencies are required.
### Getting Started
 - Clone this repository
### Running the File Manager
To start the application, run the following command:
```npm run start -- --username=your_username```
### Commands
### NOTE: If a file or directory name in the path contains spaces, enclose the name in either single or double quotes to ensure it is correctly processed. Be sure to match the opening and closing quotes, using the same type (either both single or both double)
### EXAMPLE: ```desktop/my project/super app/start it.exe``` should be ```desktop/'my project'/'super app'/'start it.exe'```
 - Navigation:
    - ```up```: Go up one directory.
    - ```cd```: path_to_directory: Change to the specified directory.
    - ```ls```: List files and directories in the current directory.
 - File Operations:
    - ```cat path_to_file```: Display file content.
    - ```add new_file_name```: Create a new empty file.
    - ```rn path_to_file new_filename```: Rename a file.
    - ```cp path_to_file path_to_new_directory```: Copy a file.
    - ```mv path_to_file path_to_new_directory```: Move a file.
    - ```rm path_to_file```: Delete a file.
 - System Information:
    - ```os --EOL```: Display system EOL.
    - ```os --cpus```: Show CPU details.
    -  ```os --homedir```: Display home directory.
    - ```os --username```: Show OS username.
    -  ```os --architecture```: Display CPU architecture.
 - Hash Calculation:
    - ```hash path_to_file```: Calculate hash for the specified file.
 - Compression/Decompression:
    - ```compress path_to_file path_to_destination```: Compress a file using Brotli.
    - ```decompress path_to_file path_to_destination```: Decompress a Brotli file.
### Exit:
 - Press ```CTRL + C``` 
 - Type ```.exit``` in the terminal.
### Conclusion
This File Manager provides a simple way to manage files, retrieve system information, calculate hashes, and compress/decompress files directly from the command line. The application is lightweight, efficient, and designed to work entirely with Node.js built-in modules.
