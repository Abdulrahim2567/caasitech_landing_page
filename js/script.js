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
	
	let counted = false

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
		if (position.top >= 0 && position.bottom <= window.innerHeight && !counted) {
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
});
