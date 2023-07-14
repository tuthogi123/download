const axios = require('axios');
const fs = require('fs');

const downloadMusic = async (url, destinationPath) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    const writer = fs.createWriteStream(destinationPath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });
  } catch (error) {
    throw new Error(`Failed to download music: ${error.message}`);
  }
};

// Example usage
const musicUrl = 'https://hearthis.at';
const destination = "downloads";

downloadMusic(musicUrl, destination)
  .then(() => {
    console.log('Music downloaded successfully!');
  })
  .catch((error) => {
    console.error('Failed to download music:', error);
  });
