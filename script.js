document.addEventListener("DOMContentLoaded", function () {
    const userIcon = document.getElementById("icon");
    const userMenu = document.querySelector(".user-menu");

    userIcon.addEventListener("click", function (event) {
        // Toggle the visibility of the user menu
        userMenu.classList.toggle("show");

        // Prevent the click from propagating to the document
        event.stopPropagation();
    });

    // Close the user menu when clicking anywhere outside
    document.addEventListener("click", function () {
        if (userMenu.classList.contains("show")) {
            userMenu.classList.remove("show");
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    AOS.init();
});
document.addEventListener("DOMContentLoaded", function () {
    gsap.from(".info", { duration: 1, y: 50, opacity: 0, stagger: 0.3 });
});


