const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

// รับค่าจาก Render Environment Variables
const TOKEN = process.env.DISCORD_TOKEN;
const WELCOME_CHANNEL_ID = process.env.WELCOME_CHANNEL_ID;

client.once('ready', () => {
    console.log(`🤖 ${client.user.tag} ออนไลน์บนระบบคลาวด์แล้ว!`);
});

client.on('guildMemberAdd', async (member) => {
    try {
        const channel = member.guild.channels.cache.get(WELCOME_CHANNEL_ID);

        if (!channel) {
            console.log('❌ ไม่พบห้องต้อนรับ');
            return;
        }

        const message =
            `🎉 **ยินดีต้อนรับคุณ ${member} เข้าสู่ LUCAS SHOP!** 🎉\n\n` +
            `ดีใจมากๆ ที่คุณเข้ามาร่วมเป็นส่วนหนึ่งในชุมชนร้านเติมเกมของเราครับ! ` +
            `ขณะนี้ร้านเปิดให้บริการเติม Robux เรทสุดคุ้ม ปลอดภัย 100% 🛒\n\n` +
            `🛒 **เริ่มต้นใช้งานร้านค้าได้ที่นี่เลย:**\n` +
            `• อ่านคู่มือการซื้อ: #วิธีสั่งซื้อสินค้า\n` +
            `• เช็กเรทราคาล่าสุด: #สินค้าและราคา\n` +
            `• กดสั่งซื้อสินค้าทันที: #สั่งซื้อสินค้า\n\n` +
            `ขอให้สนุกกับการช้อปปิ้งนะครับ 💙\n` +
            `หากติดปัญหาสามารถติดต่อแอดมินผ่านระบบตั๋วออเดอร์ได้ตลอดเวลาเลยครับ! 🎫`;

        await channel.send(message);

        console.log(`✅ ส่งข้อความต้อนรับ ${member.user.tag} แล้ว`);
    } catch (error) {
        console.error('❌ เกิดข้อผิดพลาด:', error);
    }
});

if (!TOKEN) {
    console.error('❌ ยังไม่ได้ตั้งค่า DISCORD_TOKEN ใน Render');
    process.exit(1);
}

if (!WELCOME_CHANNEL_ID) {
    console.error('❌ ยังไม่ได้ตั้งค่า WELCOME_CHANNEL_ID ใน Render');
    process.exit(1);
}

client.login(TOKEN);
