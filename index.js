import { Client, GatewayIntentBits } from 'discord.js';
import cloudinary from 'cloudinary';
import { config } from 'dotenv';

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ],
});

const prefix = '$';

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});

const r_id = [];

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}`);
});

function generateRandomString(length = 6) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomString = '';
    for (let i = 0; i < length; i++) {
        randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return randomString;
}

function coms() {
    let message = '';
    message += "**All Commands:**\n";
    message += '```$resize_fill <width> <height> - Resizes and crops the image to the specified dimensions.```';
    message += '```$resize_scale <width> <height> - Resizes the image to scale with the specified dimensions.```';
    message += '```$limit <width> <height> - Limits the size of the image while maintaining its aspect ratio.```';
    message += '```$crop <x> <y> <width> <height> - Crops the image based on custom coordinates.```';
    message += '```$blur_face - Hides faces in the image by blurring or pixelating them.```';
    message += '```$pixelate_portion <x> <y> <width> <height> - Applies pixelization to a specific portion of the image.```';
    message += '```$to_grayscale - Converts the image to grayscale.```';
    message += '```$add_text <color_code> <font_size> <position> <text> - Adds custom text overlay to the image.\n[Position OPTIONS: ("Center", "North", "South", "East", "West", "North West", "North East", "South East", "South West")]```';
    return message;
}

function help(operation) {
    switch (operation) {
        case 'help':
            return "You serious? :joy:";
        case 'resize_fill':
            return "Resizes your images to fill specified dimensions by setting the width and height. This will resize and crop the image so an image with the exact specified dimensions is generated.\n";
        case 'resize_scale':
            return "Resizes your images to scale specified dimensions by setting the width and height. Cloudinary will automatically apply the scale crop mode.\n";
        case 'limit':
            return "Keep the original image aspect ratio and all its parts visible, and just limit its size by specifying the width and height. This will create an image that does not exceed the given width and height.\n";
        case 'crop':
            return "Crops your image based on custom/fixed coordinates. Use this method when you know beforehand what the correct absolute cropping coordinates are. This is very useful when your users manually select the region to crop out of the original image.\n";
        case 'blur_face':
            return "Hide faces in your images by using Cloudinary APIs to either blur or automatically pixelate the detected faces.\n";
        case 'pixelate_portion':
            return "Applies a pixelization effect to your image in given coordinates.\n";
        case 'to_grayscale':
            return "Converts your images to grayscale.\n";
        case 'add_text':
            return "Customize text overlay's position by setting the gravity and the optional offset of the x and y. While the default text positioning ('gravity') is center, you can place your text in any other area of the image (even outside the image's boundaries!).\n";
        case 'remove_background':
            return "Removes Background\n";
        default:
            return "Invalid command. Use **`$help`** to see available commands.";
    }
}

async function resizeScale(img, width, height) {
    const randomString = generateRandomString();
    while (r_id.includes(randomString)) {
        randomString = generateRandomString();
    }
    r_id.push(randomString);

    const result = await cloudinary.v2.uploader.upload(img, {
        public_id: randomString,
        width: width,
        height: height,
        crop: 'scale',
    });

    return result.secure_url;
}

async function resizeFill(img, width, height) {
    const randomString = generateRandomString();
    while (r_id.includes(randomString)) {
        randomString = generateRandomString();
    }
    r_id.push(randomString);

    const result = await cloudinary.v2.uploader.upload(img, {
        public_id: randomString,
        width: width,
        height: height,
        crop: 'fill',
    });

    const url = result.secure_url;
    return url;
}

async function limit(img, width, height) {
    const randomString = generateRandomString();
    while (r_id.includes(randomString)) {
        randomString = generateRandomString();
    }
    r_id.push(randomString);

    const result = await cloudinary.v2.uploader.upload(img, {
        public_id: randomString,
        width: width,
        height: height,
        crop: 'limit',
    });

    const url = result.secure_url;
    return url;
}

async function crop(img, x, y, width, height) {
    const randomString = generateRandomString();
    while (r_id.includes(randomString)) {
        randomString = generateRandomString();
    }
    r_id.push(randomString);

    const result = await cloudinary.v2.uploader.upload(img, {
        public_id: randomString,
        width: width,
        height: height,
        x: x,
        y: y,
        crop: 'crop',
    });

    const url = result.secure_url;
    return url;
}

async function blurFace(img) {
    const randomString = generateRandomString();
    while (r_id.includes(randomString)) {
        randomString = generateRandomString();
    }
    r_id.push(randomString);

    const result = await cloudinary.v2.uploader.upload(img, {
        public_id: randomString,
        effect: 'blur_faces:2000',
    });

    const url = result.secure_url;
    return url;
}

async function pixelatePortion(img, x, y, width, height) {
    const randomString = generateRandomString();
    while (r_id.includes(randomString)) {
        randomString = generateRandomString();
    }
    r_id.push(randomString);

    const result = await cloudinary.v2.uploader.upload(img, {
        public_id: randomString,
        width: width,
        height: height,
        x: x,
        y: y,
        crop: 'fill',
        effect: 'pixelate_region',
    });

    const url = result.secure_url;
    return url;
}

async function toGrayscale(img) {
    const randomString = generateRandomString();
    while (r_id.includes(randomString)) {
        randomString = generateRandomString();
    }
    r_id.push(randomString);

    const result = await cloudinary.v2.uploader.upload(img, {
        public_id: randomString,
        effect: 'grayscale',
    });

    const url = result.secure_url;
    return url;
}

async function addText(img, colorCode, fontSize, position, text) {
    const randomString = generateRandomString();
    while (r_id.includes(randomString)) {
        randomString = generateRandomString();
    }
    r_id.push(randomString);

    const result = await cloudinary.v2.uploader.upload(img, {
        public_id: randomString,
        overlay: {
            font_family: 'Arial',
            font_size: fontSize,
            text: text,
            color: colorCode,
        },
        gravity: position,
    });

    const url = result.secure_url;
    return url;
}

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    if (message.content.startsWith(prefix)) {
        const [command, ...args] = message.content.slice(prefix.length).split(' ');
        console.log(args);
        if (command === 'help' && args.length > 0) {
            const specificCommand = args[0];
            const operationHelp = help(specificCommand);
            await message.reply(operationHelp);
        } else if (command === 'resize_scale' && args.length === 2) {
            try {
                const img = message.attachments.first().url;
                const width = parseInt(args[0]);
                const height = parseInt(args[1]);

                const url = await resizeScale(img, width, height);
                await message.reply(url);
            } catch (error) {
                await message.reply('Image not provided or invalid dimensions. Please try again!');
            }
        } else if (command === 'resize_fill' && args.length === 2) {
            try {
                const img = message.attachments.first().url;
                const width = parseInt(args[0]);
                const height = parseInt(args[1]);

                const url = await resizeFill(img, width, height);
                await message.reply(url);
            } catch (error) {
                await message.reply('Image not provided or invalid dimensions. Please try again!');
            }
        } else if (command === 'limit' && args.length === 2) {
            try {
                const img = message.attachments.first().url;
                const width = parseInt(args[0]);
                const height = parseInt(args[1]);

                const url = await limit(img, width, height);
                await message.reply(url);
            } catch (error) {
                await message.reply('Image not provided or invalid dimensions. Please try again!');
            }
        } else if (command === 'crop' && args.length === 4) {
            try {
                const img = message.attachments.first().url;
                const x = parseInt(args[0]);
                const y = parseInt(args[1]);
                const width = parseInt(args[2]);
                const height = parseInt(args[3]);

                const url = await crop(img, x, y, width, height);
                await message.reply(url);
            } catch (error) {
                await message.reply('Image not provided or invalid dimensions. Please try again!');
            }
        } else if (command === 'blur_face' && args.length === 0) {
            try {
                const img = message.attachments.first().url;

                const url = await blurFace(img);
                await message.reply(url);
            } catch (error) {
                await message.reply('Image not provided or error in processing. Please try again!');
            }
        } else if (command === 'pixelate_portion' && args.length === 4) {
            try {
                const img = message.attachments.first().url;
                const x = parseInt(args[0]);
                const y = parseInt(args[1]);
                const width = parseInt(args[2]);
                const height = parseInt(args[3]);

                const url = await pixelatePortion(img, x, y, width, height);
                await message.reply(url);
            } catch (error) {
                await message.reply('Image not provided or invalid dimensions. Please try again!');
            }
        } else if (command === 'to_grayscale' && args.length === 0) {
            try {
                const img = message.attachments.first().url;
                console.log('Received image:', img);

                const url = await toGrayscale(img);
                console.log('Processed URL:', url);

                await message.reply(url);
            } catch (error) {
                console.error('Error processing image:', error);
                await message.reply('Image not provided or error in processing. Please try again!');
            }
        } else if (command === 'add_text' && args.length === 4) {
            try {
                const img = message.attachments.first().url;
                const colorCode = args[0];
                const fontSize = parseInt(args[1]);
                const position = args[2].toLocaleLowerCase();
                const text = args[3];
                const url = await addText(img, colorCode, fontSize, position, text);
                await message.reply(url);
            } catch (error) {
                await message.reply('Image not provided or error in processing. Please try again!');
            }
        } else {
            const helpMessage = coms();
            await message.reply(helpMessage);
        }
    }
});

client.login(process.env.TOKEN);
