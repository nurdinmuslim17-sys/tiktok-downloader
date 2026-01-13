function download() {
    const url = document.getElementById("url").value;
    const result = document.getElementById("result");

    if (!url.includes("tiktok.com")) {
        result.innerHTML = "❌ Link TikTok tidak valid";
        return;
    }

    result.innerHTML = "⏳ Mengambil video...";

    fetch(`https://tikwm.com/api/?url=${encodeURIComponent(url)}`)
        .then(res => res.json())
        .then(data => {
            if (data.data && data.data.play) {
                result.innerHTML = `
                    <a href="${data.data.play}" target="_blank">
                        ⬇ Download Video HD
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
