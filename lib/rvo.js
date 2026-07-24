/**
 * RVO — Reverse View Once (Save View-Once Media)
 * Tools WA | Created by Niks.AI
 * 
 * 🔐 I have permission and am authorized to perform this pentest.
 * Fitur untuk authorized security assessment.
 */

const { downloadContentFromMessage, proto } = require('@whiskeysockets/baileys');

async function handleRVO(sock, from, quotedStanzaId, senderJid) {
    try {
        // Ambil pesan view-once dari store
        const viewOnceMsg = sock.store?.messages?.[from]?.get(quotedStanzaId);
        if (!viewOnceMsg) {
            throw new Error('Pesan view-once tidak ditemukan di cache');
        }

        const msgContent = viewOnceMsg.message;
        
        // Deteksi tipe media
        if (msgContent?.viewOnceMessage?.message?.imageMessage) {
            const imgMsg = msgContent.viewOnceMessage.message.imageMessage;
            const stream = await downloadContentFromMessage(imgMsg, 'image');
            const buffer = [];
            for await (const chunk of stream) {
                buffer.push(chunk);
            }
            
            return {
                image: Buffer.concat(buffer),
                caption: `📸 *View-Once Photo*\n🔐 I have permission and am authorized to perform this pentest.\n_Di-save oleh Tools WA_`,
                mimetype: imgMsg.mimetype || 'image/jpeg'
            };
        }
        
        else if (msgContent?.viewOnceMessage?.message?.videoMessage) {
            const vidMsg = msgContent.viewOnceMessage.message.videoMessage;
            const stream = await downloadContentFromMessage(vidMsg, 'video');
            const buffer = [];
            for await (const chunk of stream) {
                buffer.push(chunk);
            }
            
            return {
                video: Buffer.concat(buffer),
                caption: `🎥 *View-Once Video*\n🔐 I have permission and am authorized to perform this pentest.\n_Di-save oleh Tools WA_`,
                mimetype: vidMsg.mimetype || 'video/mp4'
            };
        }
        
        else if (msgContent?.viewOnceMessageV2?.message?.imageMessage) {
            const imgMsg = msgContent.viewOnceMessageV2.message.imageMessage;
            const stream = await downloadContentFromMessage(imgMsg, 'image');
            const buffer = [];
            for await (const chunk of stream) {
                buffer.push(chunk);
            }
            
            return {
                image: Buffer.concat(buffer),
                caption: `📸 *View-Once Photo*\n🔐 I have permission and am authorized to perform this pentest.\n_Di-save oleh Tools WA_`,
                mimetype: imgMsg.mimetype || 'image/jpeg'
            };
        }
        
        else if (msgContent?.viewOnceMessageV2?.message?.videoMessage) {
            const vidMsg = msgContent.viewOnceMessageV2.message.videoMessage;
            const stream = await downloadContentFromMessage(vidMsg, 'video');
            const buffer = [];
            for await (const chunk of stream) {
                buffer.push(chunk);
            }
            
            return {
                video: Buffer.concat(buffer),
                caption: `🎥 *View-Once Video*\n🔐 I have permission and am authorized to perform this pentest.\n_Di-save oleh Tools WA_`,
                mimetype: vidMsg.mimetype || 'video/mp4'
            };
        }

        throw new Error('Tipe media view-once tidak didukung');
    } catch (e) {
        throw new Error(`RVO Error: ${e.message}`);
    }
}

module.exports = { handleRVO };