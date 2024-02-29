# Your Friendly Editor Bot

Your Friendly Editor Bot is a Discord bot powered by Discord.js and Cloudinary that provides image editing functionalities through Discord commands.

## Features

- Resize images to fill or scale with specified dimensions
- Limit image size while maintaining aspect ratio
- Crop images based on custom coordinates
- Blur or pixelate faces in images
- Apply pixelization to specific portions of images
- Convert images to grayscale
- Add custom text overlay to images
- Remove background from images (Note: Feature under development)

## Commands

- `$resize_fill <width> <height>` - Resizes and crops the image to the specified dimensions.
- `$resize_scale <width> <height>` - Resizes the image to scale with the specified dimensions.
- `$limit <width> <height>` - Limits the size of the image while maintaining its aspect ratio.
- `$crop <x> <y> <width> <height>` - Crops the image based on custom coordinates.
- `$blur_face` - Hides faces in the image by blurring or pixelating them.
- `$pixelate_portion <x> <y> <width> <height>` - Applies pixelization to a specific portion of the image.
- `$to_grayscale` - Converts the image to grayscale.
- `$add_text <color_code> <font_size> <position> <text>` - Adds custom text overlay to the image.

## Usage

### Inviting the Bot

You can invite Your Friendly Editor Bot to your Discord server by using the following invite link:
[Invite Your Friendly Editor Bot](https://discord.com/oauth2/authorize?client_id=1212630882549112872&permissions=379968&scope=bot+applications.commands)

### Local Deployment

If you prefer to run the bot locally, follow these steps:

1. **Fork and Clone the Repository:**
```bash
git clone https://github.com/yourusername/your-friendly-editor-bot.git
```

2. **Install Dependencies:**
```bash
npm install
```

3. **Set Up Cloudinary Account:**
If you don't have a Cloudinary account, sign up at [Cloudinary](https://cloudinary.com/).
Obtain your API key, API secret, and cloud name.

4. **Get Discord Token:**
Obtain your Discord bot token from the Discord Developer Portal.
When generating the invite URL for Your Friendly Editor Bot, ensure that the bot has the following permissions:
- Read Messages
- Send Messages
- Attach Files
- Embed Links

5. **Create .env File:**
Create a .env file in the project root and add the following variables:
```
TOKEN=your_discord_token
CLOUD_NAME=your_cloud_name
API_KEY=your_api_key
API_SECRET=your_api_secret
```

6. **Run the Bot:**
```bash
node index.js
```


## Demo

https://github.com/codingis4noobs2/Your_Friendly_Editor_Bot/assets/87560178/097f08c4-b8c9-43db-af64-1186366fbee5
