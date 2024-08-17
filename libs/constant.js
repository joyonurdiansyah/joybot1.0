const helpText = `
Silahkan gunakan perintah yang tersedia berikut ini :
------

!help   -> untuk menunjukan menu panduan yang di gunakan
!quote   -> generate kutipan secara acak
!news   -> generate berita terkini dari media
!quake   -> generate berita gempa saat ini dari BMKG
!follow [text]   -> akan mengikuti text yang kamu inputkan

------
`;

const invalidCommand = "Mohon maaf command tidak tersedia! 🙏";

module.exports = { helpText, invalidCommand };
