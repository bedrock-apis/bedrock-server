# Specify the path to the folder you want to process
$targetFolder = "./@bedrock"

# Get all subfolders (directories) within the target folder
$subfolders = Get-ChildItem -Path $targetFolder -Directory

# Loop through each subfolder and perform an action (e.g., create a file)
foreach ($subfolder in $subfolders) {
    # Customize your action here:
    # For example, create a text file in each subfolder
    Remove-Item "./@bedrock/$($subfolder.Name)/dist" -Recurse
}
