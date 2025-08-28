document.addEventListener("DOMContentLoaded", function () {
	const hamburger = document.querySelector(".hamburger");
	const navList = document.querySelector(".nav-list");

	if (hamburger && navList) {
		hamburger.addEventListener("click", function () {
			navList.classList.toggle("active");
		});
	}

	// Modal functionality
	const modal = document.getElementById("projectModal");
	const portfolioItems = document.querySelectorAll(".portfolio-item");
	const closeBtn = document.querySelector(".close-btn");

	// Modal elements
	const modalTitle = document.getElementById("modalTitle");
	const modalImage = document.getElementById("modalImage");
	const modalDescription = document.getElementById("modalDescription");
	const modalTechnologies = document.getElementById("modalTechnologies");
	const modalGithubLink = document.getElementById("modalGithubLink");
	const modalLiveLink = document.getElementById("modalLiveLink");

	// Add click event listeners to portfolio items
	portfolioItems.forEach((item) => {
		item.addEventListener("click", function (e) {
			e.preventDefault();
			openModal(this);
		});
	});

	// Function to open modal and populate with project data
	function openModal(portfolioItem) {
		const title = portfolioItem.getAttribute("data-title");
		const description = portfolioItem.getAttribute("data-description");
		const technologies = portfolioItem.getAttribute("data-technologies");
		const github = portfolioItem.getAttribute("data-github");
		const live = portfolioItem.getAttribute("data-live");
		const image = portfolioItem.getAttribute("data-image");

		// Populate modal content
		modalTitle.textContent = title;
		modalImage.src = image;
		modalImage.alt = title;
		modalDescription.textContent = description;

		// Clear previous technologies
		modalTechnologies.innerHTML = "";

		// Add technology badges
		if (technologies) {
			const techArray = technologies.split(",");
			techArray.forEach((tech) => {
				const techBadge = document.createElement("span");
				techBadge.className = "tech-badge";
				techBadge.textContent = tech.trim();
				modalTechnologies.appendChild(techBadge);
			});
		}

		// Set up links
		if (github && github !== "#") {
			modalGithubLink.href = github;
			modalGithubLink.style.display = "inline-flex";
		} else {
			modalGithubLink.style.display = "none";
		}

		if (live) {
			modalLiveLink.href = live;
			modalLiveLink.style.display = "inline-flex";
		} else {
			modalLiveLink.style.display = "none";
		}

		// Show modal
		modal.style.display = "block";
		document.body.style.overflow = "hidden"; // Prevent background scrolling
	}

	// Function to close modal
	function closeModal() {
		modal.style.display = "none";
		document.body.style.overflow = "auto"; // Restore scrolling
	}

	// Close modal when clicking the close button
	if (closeBtn) {
		closeBtn.addEventListener("click", closeModal);
	}

	// Close modal when clicking outside the modal content
	window.addEventListener("click", function (e) {
		if (e.target === modal) {
			closeModal();
		}
	});

	// Close modal when pressing Escape key
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && modal.style.display === "block") {
			closeModal();
		}
	});
});
