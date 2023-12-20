// Add this to your existing script.js or create a new one
document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.querySelector(".hamburgerIcon");
	const sidebar = document.querySelector(".sidebar-custom");
	const overlay = document.querySelector(".overlay-custom");
	const body = document.querySelector("body");

	let isActive = false;
	hamburger.addEventListener("click", function (e) {
		e.stopPropagation();
		sidebar.style.width = "320px";
		overlay.classList.add("active");
		body.style.overflow = "hidden";
		isActive = true;
		sidebar.style.padding = "60px 0px";
	});

	const closeSidebar = document.querySelector(".close-sidebar-custom");

	closeSidebar.addEventListener("click", function () {
		sidebar.style.width = "0";
		sidebar.style.padding = "0";
		overlay.classList.remove("active");
		body.style.overflow = "auto";

		isActive = false;
	});

	overlay.addEventListener("click", function () {
		if (isActive) {
			sidebar.style.width = "0";
			overlay.classList.remove("active");
			body.style.overflow = "auto";
			sidebar.style.padding = "0";

			isActive = false;
		}
	});

	sidebar.addEventListener("click", function (e) {
		e.stopPropagation();
	});

	let counted = false;

	window.addEventListener("scroll", function () {
		const navbar = document.querySelector(".navbar-custom");
		const scrollPosition = window.scrollY;
		const element = document.querySelector(".counting"); // Replace '.your-element' with your actual selector
		const position = element.getBoundingClientRect();
		//get screen height size
		const screenHeight = window.innerHeight;
		if (scrollPosition >= 0.8 * screenHeight) {
			// Adjust as needed
			navbar.classList.add("navbar-custom-fixed");
		} else {
			navbar.classList.remove("navbar-custom-fixed");
		}
		if (
			position.top >= 0 &&
			position.bottom <= window.innerHeight &&
			!counted
		) {
			$(".counting").each(function () {
				var $this = $(this),
					countTo = $this.attr("data-count");

				$({ countNum: $this.text() }).animate(
					{
						countNum: countTo,
					},

					{
						duration: 2000,
						easing: "linear", // Change animation easing here. Read more: https://api.jquery.com/animate/
						step: function () {
							$this.text(
								Math.floor(this.countNum).toLocaleString()
							);
						},
						complete: function () {
							$this.text(
								Math.floor(this.countNum).toLocaleString()
							);
						},
					}
				);
				counted = true;
			});
		}
	});
});

$(document).ready(function () {
	$(".sub-btn").click(function (e) {
		e.stopPropagation();
		$(this).next(".sub-menu").slideToggle(400);
		$(this).toggleClass("rotate");
	});

	$(".dropright-content a").hover(
		function () {
			$(this)
				.parent()
				.prev(".sub-dropdown")
				.css("background-color", "rgb(5, 5, 44)");
		},
		function () {
			$(this).parent().prev(".sub-dropdown").css("background-color", "");
		}
	);
	$(".apply-now").click(function (e) {
		e.preventDefault();
		e.stopPropagation();

		$(".gallery-custom")
			.addClass("gallery-custom-active")
			.css("z-index", "99999")
			.fadeIn()
			.removeClass("d-none");
		//prevent page from scrolling
		$("body").css("overflow", "hidden");
	});

	//trigger click for apply now button and enable gallery-custom

	//$(".apply-now").trigger("click");

	$(".close-icon").click(function (e) {
		e.stopPropagation();
		$(".gallery-custom")
			.fadeOut()
			.removeClass("gallery-custom-active")
			.addClass("d-none");
		$("body").css("overflow", "auto");
	});

	let currentIndex = 0;
	let nextIndex = 1;

	let imagesSize = imagesPath.length;
	$(".gallery-images-box img").attr("src", imagesPath[currentIndex]);

	let container = $(".gallery-images-preview-box");
	const scrollAmount = 70; // Adjust this value as needed

	$(".image-next").click(function (e) {
		e.stopPropagation();
		nextIndex >= imagesSize && (nextIndex = 0);
		$(".gallery-images-box img").fadeOut(function () {
			$(this)
				.attr("src", imagesPath[nextIndex - 1])
				.fadeIn();
		});

		currentIndex = nextIndex;
		nextIndex++;
		//add active class to image corresponding to currentIndex
		$(".gallery-images-preview-box .preview-box > img").each(function () {
			if ($(this).attr("data-index") == currentIndex) {
				$(this).addClass("active-image");
			} else {
				$(this).removeClass("active-image");
			}
		});
		container.animate({ scrollLeft: "+=" + scrollAmount }, 800);
	});
	$(".image-prev").click(function (e) {
		e.stopPropagation();
		currentIndex <= 0 && (currentIndex = imagesSize);
		$(".gallery-images-box img").fadeOut(function () {
			$(this).attr("src", imagesPath[currentIndex]).fadeIn();
		});
		currentIndex--;
		nextIndex = currentIndex + 1;
		nextIndex >= imagesSize && (nextIndex = 0);
		//add active class to image corresponding to currentIndex
		$(".gallery-images-preview-box .preview-box > img").each(function () {
			if ($(this).attr("data-index") == currentIndex) {
				$(this).addClass("active-image");
			} else {
				$(this).removeClass("active-image");
			}
		});
		container.animate({ scrollRight: "-=" - scrollAmount }, 800);
	});

	imagesPath.forEach((image, index) => {
		$(".gallery-images-preview-box").append(
			`<div class = "preview-box"><img src="${image}" class="gallery-image-preview" data-index="${index}" /></div>`
		);

		//add active class to image corresponding to currentIndex
		$(".gallery-images-preview-box .preview-box > img")
			.each(function () {
				if ($(this).attr("data-index") == currentIndex) {
					$(this).addClass("active-image");
				} else {
					$(this).removeClass("active-image");
				}
			})
			.click(function (e) {
				e.stopPropagation();
				const $parentThis = $(this);
				$(".gallery-images-box img").fadeOut(function () {
					$(this).attr("src", $parentThis.attr("src")).fadeIn();
				});
				currentIndex = $(this).attr("data-index");
				nextIndex = parseInt(currentIndex) + 1;
				nextIndex >= imagesSize && (nextIndex = 0);
				//add active class to image corresponding to currentIndex
				$(".gallery-images-preview-box .preview-box > img").each(
					function () {
						if ($(this).attr("data-index") == currentIndex) {
							$(this).addClass("active-image");
						} else {
							$(this).removeClass("active-image");
						}
					}
				);
			});
	});
});

function updateThumbnail(startIndex) {
	let endIndex = startIndex + 6;

	if (endIndex > imagesPath.length) {
		imagesPath.length - startIndex > 7 && (endIndex = startIndex + 5);
		for (let i = startIndex; i < endIndex; i++) {
			$(".gallery-images-preview-box").append(
				`<div class = "preview-box"><img src="${imagesPath[i]}" class="gallery-image-preview" data-index="${i}" /></div>`
			);
			//add active class to image corresponding to currentIndex
		}
	}
}

const imagesPath = [
	"/images/gallery/1.png",
	"/images/gallery/2.png",
	"/images/gallery/3.png",
	"/images/gallery/4.png",
	"/images/gallery/5.png",
	"/images/gallery/6.jpg",
	"/images/gallery/cdba-276x276.png",
	"/images/gallery/cnet-276x276.png",
	"/images/gallery/prog-276x276.png",
	"/images/gallery/ux-276x276.png",
	"/images/gallery/hc3.jpg",
	"/images/gallery/hc4-768x1024.jpg",
	"/images/gallery/hc6-1024x768.jpg",
];
