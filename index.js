import cloudinary from 'cloudinary';
import { Client, GatewayIntentBits } from 'discord.js';

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});
const prefix = '!';

cloudinary.config({
    cloud_name: "your_cloud_name",
    api_key: "your_api_key",
    api_secret: "your_api_secret",
});

const r_id = [];

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

async function resizeScale(message, img, width, height) {
    try {
        const randomString = generateRandomString();
        const url = await resize_scale(img, width, height, randomString);

        // Send the resized image URL as a reply
        message.channel.send(`Resized Image: ${url}`);
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
}


async function pixelatePortion(message, img, x, y, width, height) {
    const randomString = generateRandomString();
    uploadImage(img, randomString);

    const { url } = cloudinary.url(randomString, {
        width: width,
        height: height,
        x: x,
        y: y,
        crop: "fill",
        effect: "pixelate_region",
    });

    message.reply(url);
}

// Example of crop function in discord.js
async function crop(message, img, x, y, width, height) {
    const randomString = generateRandomString();
    uploadImage(img, randomString);

    const { url } = cloudinary.url(randomString, {
        width: width,
        height: height,
        x: x,
        y: y,
        crop: "crop",
    });

    message.reply(url);
}

// Example of blur_face function in discord.js
async function blurFace(message, img) {
    const randomString = generateRandomString();
    uploadImage(img, randomString);

    const { url } = cloudinary.url(randomString, {
        effect: "blur_faces:2000",
    });

    message.reply(url);
}

// Example of limit function in discord.js
async function limit(message, img, width, height) {
    const randomString = generateRandomString();
    uploadImage(img, randomString);

    const { url } = cloudinary.url(randomString, {
        width: width,
        height: height,
        crop: "limit",
    });

    message.reply(url);
}

// Example of to_grayscale function in discord.js
async function toGrayscale(message, img) {
    const randomString = generateRandomString();
    uploadImage(img, randomString);

    const { url } = cloudinary.url(randomString, {
        effect: "grayscale",
    });

    message.reply(url);
}

// Example of add_text function in discord.js
async function addText(message, img, colorCode, fontFamily, fontSize, position, text) {
    const randomString = generateRandomString();
    uploadImage(img, randomString);

    const { url } = cloudinary.url(randomString, {
        overlay: {
            font_family: fontFamily,
            font_size: fontSize,
            text: text,
            color: colorCode,
        },
        gravity: position,
    });

    message.reply(url);
}

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.toLowerCase().includes('hey')) {
        await message.react('👋');
    }

    if (message.content.startsWith(`${prefix}resize_fill`)) {
        const args = message.content.split(' ');
        const img = args[1];
        const width = parseInt(args[2]);
        const height = parseInt(args[3]);

        resize(message, img, width, height);
    }

    if ("!resize_scale" in message.content) {
        try {
            const [_, img, width, height] = message.content.split(" ");
            await resizeScale(message, img, parseInt(width), parseInt(height));
        } catch (error) {
            console.error('Error processing resize_scale command:', error);
            // Handle the error as needed
        }
    }

    if (message.content.startsWith(`${prefix}limit`)) {
        // Example usage: !limit <img_url> <width> <height>
        const args = message.content.split(' ');
        const img = args[1];
        const width = parseInt(args[2]);
        const height = parseInt(args[3]);

        limit(message, img, width, height);
    }

    if (message.content.startsWith(`${prefix}crop`)) {
        // Example usage: !crop <img_url> <x> <y> <width> <height>
        const args = message.content.split(' ');
        const img = args[1];
        const x = parseInt(args[2]);
        const y = parseInt(args[3]);
        const width = parseInt(args[4]);
        const height = parseInt(args[5]);

        crop(message, img, x, y, width, height);
    }

    if (message.content.startsWith(`${prefix}blur_face`)) {
        // Example usage: !blur_face <img_url>
        const args = message.content.split(' ');
        const img = args[1];

        blurFace(message, img);
    }

    if (message.content.startsWith(`${prefix}pixelate_portion`)) {
        // Example usage: !pixelate_portion <img_url> <x> <y> <width> <height>
        const args = message.content.split(' ');
        const img = args[1];
        const x = parseInt(args[2]);
        const y = parseInt(args[3]);
        const width = parseInt(args[4]);
        const height = parseInt(args[5]);

        pixelatePortion(message, img, x, y, width, height);
    }

    if (message.content.startsWith(`${prefix}to_grayscale`)) {
        // Example usage: !to_grayscale <img_url>
        const args = message.content.split(' ');
        const img = args[1];

        toGrayscale(message, img);
    }

    if (message.content.startsWith(`${prefix}add_text`)) {
        // Example usage: !add_text <img_url> <color_code> <font_family> <font_size> <position> <text>
        const args = message.content.split(' ');
        const img = args[1];
        const colorCode = args[2];
        const fontFamily = args[3];
        const fontSize = parseInt(args[4]);
        const position = args[5];
        const text = args.slice(6).join(' ');

        addText(message, img, colorCode, fontFamily, fontSize, position, text);
    }
});

function generateRandomString() {
    let randomString = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 6; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    while (r_id.includes(randomString)) {
        randomString = generateRandomString();
    }
    r_id.push(randomString);
    return randomString;
}

async function uploadImage(img, publicId) {
    try {
        const response = await fetch(img);
        const buffer = await response.buffer();

        const result = await cloudinary.uploader.upload(buffer, { public_id: publicId });

        // Handle the result if needed
        console.log(result);

        return result.url;
    } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
        throw error;
    }
}

client.login("your_discord_token");
