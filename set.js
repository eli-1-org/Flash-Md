const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicUF1RmJraURHVFFyVmFCVW0xdVJUQ25jRkc4OW45dWo3MDZXalQ2QUQyZz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidlBwOTlCekJmS09vcEloWGZzRFNwMThyR0hHQVB6OXQraDIxc09XYzZXaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJLT2RXbnozNDl0UVpZTFczQ3dVS3Z1dG5CbjREU0tncDdRL1BqM1NoV1ZZPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ5aDdBSkdUSGZQc2J5T1lNbEhUdFk2b3J6MTZvcDNCaWlpUWxMR0ZCblZZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVFQmJwV3FYUXRBbVliR3NCTXo4cFpyZkZHRzY3SmEwTVNZa0grd2dtRlU9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlBIS0IrUUxtc0EzVHJZNGNCMzBCcXRuY01yQlkzWWxBQ1lDS2liVTlMRHc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoid0Y2bnBPbGNuOE9oek83MHZrNW9LYWR4N0hXK1pBNlV0WlR2SDVTVjBWQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS21TS2UwelBHV0FpemdSWmVsZlBqUnFxT0xDb05GVzZmWnljOWRhVHhGaz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImtTT2orM1kyRFFhRXJ4ZFBpZ2FCTXg1eG1xN04rOGdqa3ljbURYcWdmdVhpUGdRSlB4YzNNMlpRb2tjVFZvYTJsbTFneG8wNXlEVEkxWTlNdjVLb0JnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTEyLCJhZHZTZWNyZXRLZXkiOiJ1STI4MVBwWlNFdUZOcHl5SWovTktJTUpUMHU1OU9rVys0Nld5d2dNYWRnPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiI1OG1HLVVXYVNraVlnZWtnSFEtQ0ZBIiwicGhvbmVJZCI6ImNhNmNiZjZjLTIyZjItNGM3My1hOTQ5LWQ3ZTI4NzJmZjM2OCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzd3h0dTZ2OFdZMTZHb0cxazdOZjA4V3pFODA9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQU0waXRwOEhMTlJRTm1ZVEt4MkVPK0tmenJjPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjQ2WVNUUEM1IiwibWUiOnsiaWQiOiIyMzQ4MDYxNDEzNTc3OjY1QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNMRHJweFVRdTdxa3RnWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJkYWRNeGFzSisxM2h1K213VUJJb1lZTjR3eFZoRXpFQWhDamlJZVdyclRNPSIsImFjY291bnRTaWduYXR1cmUiOiI0SkNndEhiQXpGNU0yWWdOWUdHb1l1dXZMaDQrTFdnelFCbTJUa1hBSGtxQlc1U0ZrVkFhZksxOGNGekttbS9hMys4UE5BUEdtdlFVdEYycGQ3NTVDQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiSlNpaXJ6ekl3L0w4OUd1OWpnVVdlMTlGeE42RG9SeVdCdkQxZGRzQnhwNGVpTUtoVi9XSGVQQ0lXaEluTWJPR2Vjam5QZHZJcHhKS1ZJSEUxK3QyRHc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDYxNDEzNTc3OjY1QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQlhXblRNV3JDZnRkNGJ2cHNGQVNLR0dEZU1NVllSTXhBSVFvNGlIbHE2MHoifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjQ0NTYyNjN9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ayeni Josiah",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348061413577", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
//    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd" : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

