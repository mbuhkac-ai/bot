/**
 * ════════════════════════════════════════════
 *  TOOLS WA — Konfigurasi Bot
 *  Created by Niks.AI — jangan dihapus!
 * ════════════════════════════════════════════
 */

const config = {
    // —— Info Bot ——
    ownerName: "Niks.AI",
    botName: "Tools WA",
    prefix: ".",
    ownerNumber: "6285921568148", // ganti nomor owner

    // —— OpenRouter AI (jailbroken) ——
    // Daftar gratis di https://openrouter.ai/keys
    openRouterApiKey: "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",
    openRouterModel: "openai/gpt-4o-mini:free", // model gratis
    // Alternatif: "google/gemini-2.0-flash-exp:free", "meta-llama/llama-3.3-70b-instruct:free"

    // —— TikTok Downloader ——
    tikwmApi: "https://www.tikwm.com/api/",

    // —— Path ——
    sessionPath: "./session",
    mediaPath: "./media",

    // —— Pesan Welcome ——
    welcome: {
        caption: `╭━━━「 *WELCOME* 」━━━╮
┃
┃  Hai @user 👋
┃  Selamat datang di tools wa
┃
┃  *Tools wa* siap membantu!
┃  Ketik .menu untuk lihat fitur
┃
┃  _Created by Niks.AI_
┃
╰━━━━━━━━━━━━━━━━╯`,
        fileLogo: "logo.jpg",
        fileAudio: "audio.mp3"
    }
};

module.exports = config;
