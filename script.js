function process() {
    const url = document.getElementById("url").value;
    const preview = document.getElementById("preview");
    const result = document.getElementById("result");

    preview.innerHTML = "";
    result.innerHTML = "";

    if (url.includes("tiktok.com")) {
        downloadTikTok(url);
    } else if (url.includes("shopee")) {
        downloadShopee(url);
    } else {
        result.innerHTML = "❌ Link tidak dikenali (TikTok / Shopee saja)";
    }
}

// ================= TIKTOK =================
function downloadTikTok(url) {
    const preview = document.getElementById("preview");
    const result = document.getElementById("result");

    result.innerHTML = "⏳ Mengambil video TikTok...";

    fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`)
        .then(res => res.json())
        .then(data => {
            if (data.data && data.data.play) {

                preview.innerHTML = `
                    <video controls width="100%" style="border-radius:10px;">
                        <source src="${data.data.play}" type="video/mp4">
                    </video>
                `;

                result.innerHTML = `
                    <a href="${data.data.play}" target="_blank">
                        ⬇ Download TikTok HD
                    </a>
                `;
            } else {
                result.innerHTML = "❌ Gagal mengambil video TikTok";
            }
        })
        .catch(() => {
            result.innerHTML = "❌ Error TikTok server";
        });
}

// ================= SHOPEE =================
function downloadShopee(url) {
    const preview = document.getElementById("preview");
    const result = document.getElementById("result");

    result.innerHTML = "⏳ Mengambil video Shopee...";

    // API publik Shopee video
    fetch(`https://shopee.co.id/api/v4/item/get?url=${encodeURIComponent(url)}`)
        .then(res => res.json())
        .then(data => {

            let videoUrl =
                data?.data?.video_info?.video_url ||
                data?.data?.video?.url;

            if (videoUrl) {

                preview.innerHTML = `
                    <video controls width="100%" style="border-radius:10px;">
                        <source src="${videoUrl}" type="video/mp4">
                    </video>
                `;

                result.innerHTML = `
                    <a href="${videoUrl}" target="_blank">
                        ⬇ Download Shopee Video
                    </a>
                `;
            } else {
                result.innerHTML = "❌ Video Shopee tidak ditemukan";
            }
        })
        .catch(() => {
            result.innerHTML = "❌ Shopee butuh backend (CORS)";
        });
}
