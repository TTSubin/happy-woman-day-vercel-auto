(function () {
    var galleryFolder = "gift-images/";
    var galleryManifest = "gift-images/manifest.json";
    var imagePattern = /\.(jpg|jpeg|png|gif|webp|bmp|svg)$/i;

    function normalizePath(href) {
        if (!href) {
            return "";
        }

        var cleanHref = href.split("?")[0].split("#")[0];
        if (cleanHref.indexOf("http://") === 0 || cleanHref.indexOf("https://") === 0) {
            return cleanHref;
        }
        if (cleanHref.indexOf("/") === 0) {
            return cleanHref.slice(1);
        }
        if (cleanHref.indexOf(galleryFolder) === 0) {
            return cleanHref;
        }
        return galleryFolder + cleanHref.replace(/^\.\//, "");
    }

    function fetchAllGalleryImages() {
        return fetch(galleryManifest)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Cannot read manifest");
                }
                return response.json();
            })
            .then(function (items) {
                var results = [];

                if (!Array.isArray(items)) {
                    throw new Error("Invalid manifest format");
                }

                for (var i = 0; i < items.length; i++) {
                    var path = normalizePath(items[i]);
                    if (imagePattern.test(path)) {
                        results.push(path);
                    }
                }

                results.sort(function (a, b) {
                    return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
                });

                return results;
            })
            .catch(function () {
                return fetch(galleryFolder)
            .then(function (response) {
                if (!response.ok) {
                    throw new Error("Cannot read folder listing");
                }
                return response.text();
            })
            .then(function (html) {
                var parser = new DOMParser();
                var doc = parser.parseFromString(html, "text/html");
                var links = doc.querySelectorAll("a[href]");
                var results = [];

                for (var i = 0; i < links.length; i++) {
                    var href = links[i].getAttribute("href");
                    var path = normalizePath(href);
                    if (imagePattern.test(path)) {
                        results.push(path);
                    }
                }

                results.sort(function (a, b) {
                    return a.localeCompare(b, undefined, { numeric: true, sensitivity: "base" });
                });

                return results;
            })
            .catch(function () {
                // Final fallback for environments without directory listing.
                return [];
            });
            });
    }

    function createImageCard(src, index) {
        var card = document.createElement("div");
        card.className = "gift-gallery-card";

        var img = document.createElement("img");
        img.src = src;
        img.alt = "Anh ky niem " + (index + 1);
        img.loading = "lazy";

        card.appendChild(img);
        return card;
    }

    document.addEventListener("DOMContentLoaded", function () {
        var openBtn = document.getElementById("mystery-gift-btn");
        var modal = document.getElementById("gift-gallery-modal");
        var grid = document.getElementById("gift-gallery-grid");

        if (!openBtn || !modal || !grid) {
            return;
        }

        fetchAllGalleryImages().then(function (galleryImages) {
            for (var i = 0; i < galleryImages.length; i++) {
                grid.appendChild(createImageCard(galleryImages[i], i));
            }
        });

        function openGallery() {
            modal.classList.add("open");
            modal.setAttribute("aria-hidden", "false");
        }

        function closeGallery() {
            modal.classList.remove("open");
            modal.setAttribute("aria-hidden", "true");
        }

        openBtn.addEventListener("click", openGallery);

        modal.addEventListener("click", function (event) {
            var target = event.target;
            if (target && target.getAttribute("data-close-gallery") === "true") {
                closeGallery();
            }
        });

        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape" && modal.classList.contains("open")) {
                closeGallery();
            }
        });
    });
})();
