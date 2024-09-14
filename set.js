const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0tuYlhhczEzSnNNQ1Z2Qmd6cEducGNLRzFpdzRPYVNpMlI0M29vYmkxaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnZtME1BcHAzMEVncU8zOHFFdUx3WnkyaFZyTnd4dlI4KzZud3p5enR6WT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrRVlsWmZ4VlJ2UGRLa1lTWkpmWWJwSUpSV0tjZVJZeXdhOEJ4SXV6dEhzPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI4WmlTSXBpUlVLOGFobzZ1M2F5RldVYi9WZlBjckw5OGd0Q0lWU2RzNURjPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVQL1NWYy9NVnVhN1U1R0x3c3FRRktINThlWXh3ZlhTQjNhb2NpMTdXazQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IklmV1h0cWFYQnAxRm1HOUt3U0czbGJoQThERU1ZZGx5eGNFejJuR2VxQnc9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEs3VVFmVjZDMEZQbXphWm80ckR5ZnI2ejJyY3M4VEZTTDZEQTJ5aloyaz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWDhHcG16Mi82cVcyVitGdzg3Y2c0VUlRU1FLOUtHSU56c21BOWt1dVkzbz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkIrbm0xL2VsUjgyRHM1NXg5KzlqUUU5VE52Q0lEOE1rRy9IcStvNTc0S0Y0NFZLSmQrYmtJQzNVS2V1RFRSa1lPQnhQa010L0M3eTROWkhiVDZlN0FnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjQ1LCJhZHZTZWNyZXRLZXkiOiJoc1Jod2pWNGVWdGF3bDhTTXYyZWhyME1qS1MxVURHdDl4YkMybElzcm9BPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJnWURWUHFiM1JVMjhZYldyZ2FOWHJBIiwicGhvbmVJZCI6ImU5MmU4ZjhkLWE1YTItNDA1ZS1hOTBiLWJmMTQ1N2RmYTE1NCIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiIzN0lnbkduczFONHlOTm11cVBFUmk3aElsN1E9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiL2dvNFc0YTk0NUtsaXVZSXF3TGVMN2VTY0tvPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjVMMkNFUjVZIiwibWUiOnsiaWQiOiIyNzc0NzgxNTMyNjoyN0BzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDT1ByN0pzQkVKenhsN2NHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiR1dmRUcveDdlMGVtNDBVSlRuMlNuZG1qOVBVYVB0ak5uckVscjNTQ2dHVT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiOFN2bk9EZ2QySzBmYWVNS3N3MkpsWDB4c1dmVEZZb0VDZjdIY0hhMEdaeXpXYTZWZE84K3FnSjc3OTR2N3ZnMERjYXJnTkp5dmNDa0dDMllHc2oyQWc9PSIsImRldmljZVNpZ25hdHVyZSI6Im54SGs4MDhDTDNpRVVCNGFhTng2eUlsMmIvQWptYmxtN1VicVd5Y2dDKzRvK3hFMC9ocTB5aHZScWN1VG5KTkIxR1k3TU5MODFvQm9RZ0lhazZiWUFnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjc3NDc4MTUzMjY6MjdAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCUmxueEJ2OGUzdEhwdU5GQ1U1OWtwM1pvL1QxR2o3WXpaNnhKYTkwZ29CbCJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNjM0NzQzNH0=',
    PREFIXE: process.env.PREFIX || "",
    OWNER_NAME: process.env.OWNER_NAME || "katakuri",
    OWNER_NUMBER : process.env.OWNER_NUMBER || "27747815326", 
    A_REACT : process.env.AUTO_REACTION || 'on',     
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
CHATBOT: process.env.CHAT_BOT || "on",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    BOT : process.env.BOT_NAME || '`*KATAKURI_MD*`',
    //OPENAI_API_KEY : process.env.OPENAI_API_KEY || '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',
    URL : process.env.BOT_MENU_LINKS || '',
    MODE: process.env.BOT_MODE || "private",
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

