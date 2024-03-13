import fs from "node:fs";
import https from "node:https";

const fileNames = [
    "biome_definitions_full.nbt",
    "canonical_block_states.nbt",
    "creativeitems.json",
    "required_item_list.json",
];
for (const fn of fileNames) {
    const url = "https://raw.githubusercontent.com/pmmp/BedrockData/master/" + fn; // Replace with your desired file URL
    const targetFilePath = "./data/" + fn; // Specify the local file path
    
    const fileStream = fs.createWriteStream(targetFilePath);
    
    https.get(url, (response) => {
        if (response.statusCode !== 200) {
            console.error(`Error: HTTP status code ${response.statusCode}`);
            return;
        }
    
        response.pipe(fileStream);
    
        fileStream.on("finish", () => {
            fileStream.close();
            console.log(`File downloaded successfully to ${targetFilePath}`);
        });
    }).on("error", (error) => {
        fileStream.close();
        console.error("Error downloading file:", error.message);
    });
}
