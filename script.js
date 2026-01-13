function download() {
    const url = document.getElementById("url").value;
    const result = document.getElementById("result");
    const preview = document.getElementById("preview");

    if (!url.includes("tiktok.com")) {
        result.innerHTML = "❌ Link TikTok tidak valid";
        preview.innerHTML = "";
        return;
    }

    result.innerHTML = "⏳ Mengambil video...";
    preview.innerHTML = "";

    fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`)
        .then(res => res.json())
        .then(data => {
            if (data.data && data.data.play) {

                // PREVIEW VIDEO
                preview.innerHTML = `
                    <video controls width="100%" style="border-radius:10px; margin-top:15px;">
                        <source src="${data.data.play}" type="video/mp4">
                        Browser tidak mendukung video.
                    </video>
                `;

                // BUTTON DOWNLOAD
                result.innerHTML = `
                    <a href="${data.data.play}" target="_blank">
                        ⬇ Download Video HD (No Watermark)
                    </a>
                `;
            } else {
                result.innerHTML = "❌ Gagal mengambil video";
            }
        })
        .catch(() => {
            result.innerHTML = "❌ Error server";
        });
}
