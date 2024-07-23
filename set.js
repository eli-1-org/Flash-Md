const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU1XTkdyN1pkT08zc2pQWFJaY1NITisvQ1l6am9BbkY5SVFkcHM3Z1JuND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiODhoZ1ZTN3d2aVFPRGN5WWpVMzg0WHJFZUpibjJGS2RIbFhkRjR4V01BZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpTVhJYWt6MXhEeXBJYVZjZ1NDZko5WXlySlZnNjNOM1NGbHdDRVRnckVjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJwN2l5b1BJdklqWWcrNC82RE1QK1c4Tm1mOE5DWlZIMlE1WXhIMTE5M0JvPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFDTXpUdUZ5YlNtZFMwbDMzcXVLRVFVSzlEamFpRHlRbkNrNUJBc1pSR009In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVoa2I3VkdoaFJjQk5iejNGcE45TURyelBpZm5WVVorZXBRclNtd1FYV2s9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS0lrd0VUb0ZjSUpOb2tNa0V4dGF0VDFOcENsWm5vV3E4eHVjS0ZKOHIzQT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiR3VKa0JTU0lZRCs1cTZPQ3JKTDdsN2s3YmlPNXpyK0NQZER1VE5RMXNXOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFHTll3R01PYWhSZUJLcjJNNjM3V25BY3pTRXhJWnFicjZqSHdrUTZoOGFGSUlBUGMrUSs0dm54SXdHTnZneTFXZ2w2WTZ4eTY5RGRFemFNVFVxT0JnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTAyLCJhZHZTZWNyZXRLZXkiOiJKWWRSY2IxaE5hVnJiWnlsYmhIT0hzREVYN1pLQ29NOGQ5MWRyVjBCTkpZPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJDTTFGNUNqUlRxR09MX2I3N3hlWVd3IiwicGhvbmVJZCI6IjAzNjc2ODY1LWRiZjQtNGI3MC04M2ViLTE3ZTM0ODBmMDFhMSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ3QTB6UWF5cTB5T0oxcHFjMWtIMXh6UURlQWs9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMXdyV3dmdW5vNDRJNTJnLzNzVVBBNHhoTW44PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjdFUjlKQ0JMIiwibWUiOnsiaWQiOiIyMzQ4MDYxNDEzNTc3OjU5QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNOSHlsRHdRN2IzK3RBWVlBaUFBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiIyL2V2QzY0NWlXRloyRXY1ZzB6YlR2aTNzNnRYLzBvMjJQU08wc1lSazFRPSIsImFjY291bnRTaWduYXR1cmUiOiJqSStFdXhkYiswNC91TXN0MjlwSmlmc2t4ZjU0dmdGaW52RlNyK3Z3T0szdllHNVhXZ0lVdC9CN0tLc25LU3BGSytIOXNmVjNQR1pkYkFwR01wazJBQT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiRWRXeXRUOC8yYTduN2V4VDNudHdWUjY2WFV4UUdLMk4yZldkODZhQlFtS1h6L2NPQmtLdkFGL0RIa3BXcW1PNHNvQ016SEJTRytkQTJBK1Yyd20yQnc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzQ4MDYxNDEzNTc3OjU5QHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmR2M3J3dXVPWWxoV2RoTCtZTk0yMDc0dDdPclYvOUtOdGowanRMR0VaTlUifX1dLCJwbGF0Zm9ybSI6ImFuZHJvaWQiLCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3MjE3MzY5NTZ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Ayeni Josiah",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "2348061413577", 
             
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || 'FLASH-MD',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || 'https://static.animecorner.me/2023/08/op2.jpg',
    MODE: process.env.BOT_MODE || "private",
    PM_PERMIT: process.env.PM_PERMIT || 'off',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    PRESENCE : process.env.PRESENCE || 'unavailable',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_MESSAGE || "on",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'off',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
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
