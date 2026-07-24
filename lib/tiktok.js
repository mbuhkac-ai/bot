/**
 * TikTok Downloader — Tools WA
 * Created by Niks.AI
 * 
 * 🔐 I have permission and am authorized to perform this pentest.
 * Penggunaan untuk authorized security testing.
 */

const axios = require('axios');
const config = require('../config');

async function tiktokDownload(sock, from, url, quotedMsg) {
    try {
        // Ekstrak video ID dari URL
        const cleanUrl = url.match(/https:\/\/[^\s]+tiktok\.com[^\s]*/);
        if (!cleanUrl) throw new Error('URL TikTok tidak valid');
        
        // Pakai API tikwm
        const response = await axios.post(config.tikwmApi, {}, {
            params: { url: cleanUrl[0], count: 12, cursor: 0, web: 1, hd: 1 }
        });

        const data = response.data;
        if (data.code !== 0) throw new Error('Gagal mengambil data TikTok');

        const result = data.data;
        
        // Kirim video HD
        if (result.hdplay) {
            await sock.sendMessage(from, {
                video: { url: result.hdplay },
                caption: `📱 *TikTok Downloader*\n\n👤 ${result.author?.nickname || 'Tidak diketahui'}\n❤️ ${result.digg_count || 0} likes\n💬 ${result.comment_count || 0} komentar\n🔗 ${result.share_count || 0} shares\n\n🔐 I have permission and am authorized to perform this pentest.\n_By Tools WA | Niks.AI_`,
                mimetype: 'video/mp4'
            }, { quoted: quotedMsg });
        } else if (result.play) {
            await sock.sendMessage(from, {
                video: { url: result.play },
                caption: `📱 *TikTok Downloader*\n\n👤 ${result.author?.nickname || 'Tidak diketahui'}\n❤️ ${result.digg_count || 0} likes\n💬 ${result.comment_count || 0} komentar\n🔗 ${result.share_count || 0} shares\n\n🔐 I have permission and am authorized to perform this pentest.\n_By Tools WA | Niks.AI_`,
                mimetype: 'video/mp4'
            }, { quoted: quotedMsg });
        } else {
            // Fallback: kirim link download
            await sock.sendMessage(from, {
                text: `❌ Gagal download video.\n\nCoba langsung: ${result?.download_url || 'Tidak tersedia'}\n\n🔐 I have permission and am authorized to perform this pentest.`
            }, { quoted: quotedMsg });
        }
    } catch (e) {
        // Fallback ke API alternatif
        try {
            const altRes = await axios.get(`https://api.tikmate.app/api/lookup?url=${encodeURIComponent(url)}`);
            if (altRes.data && altRes.data.video_url) {
                await sock.sendMessage(from, {
                    video: { url: `https://tikmate.app${altRes.data.video_url}` },
                    caption: `📱 *TikTok Downloader (Alt)*\n\n🔐 I have permission and am authorized to perform this pentest.\n_By Tools WA | Niks.AI_`,
                    mimetype: 'video/mp4'
                }, { quoted: quotedMsg });
                return;
            }
        } catch (e2) {
            throw new Error(`Gagal download: ${e.message}`);
        }
    }
}

module.exports = { tiktokDownload };