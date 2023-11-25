// Add this to your existing script.js or create a new one

document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.querySelector(".hamburgerIcon");
	const sidebar = document.querySelector(".sidebar");
	const overlay = document.querySelector(".overlay");
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

	const closeSidebar = document.querySelector(".close-sidebar");

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

	window.addEventListener("scroll", function () {
		const navbar = document.querySelector(".navbar");
		const scrollPosition = window.scrollY;
		const element = document.querySelector(".counting"); // Replace '.your-element' with your actual selector
		const position = element.getBoundingClientRect();
		//get screen height size
		const screenHeight = window.innerHeight;
		if (scrollPosition >= 0.8 * screenHeight) {
			// Adjust as needed
			navbar.classList.add("navbar-fixed");
		} else {
			navbar.classList.remove("navbar-fixed");
		}
		if (position.top >= 0 && position.bottom <= window.innerHeight) {
			$(".counting").each(function () {
				var $this = $(this),
					countTo = $this.attr("data-count");

				$({ countNum: $this.text() }).animate(
					{
						countNum: countTo,
					},

					{
						duration: 3000,
						easing: "linear",
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
});
