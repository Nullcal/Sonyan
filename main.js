function resizeSvg() {
    $("#sonyan svg").attr("viewBox", `0 0 ${640.24 + 480} ${527.53 + 480}`);
    $("#norurun svg").attr("viewBox", `0 0 ${1024 + 480} ${1108.96 + 480}`);
    $("#effects svg").attr("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
}

$(function() {
    resizeSvg();
})

$(window).resize(function() {
    resizeSvg();
})



let ex, ey;

// Change eyes direction
function pursue(e) {
    // Calculate eyes pos
    let mx = e.pageX;
    let my = e.pageY;
    let cx = window.innerWidth / 2;
    let cy = window.innerHeight / 2;
    let rad = Math.atan2(my-cy, mx-cx) + Math.PI;
    let d = Math.sqrt(Math.pow(mx-cx, 2)+Math.pow(my-cy, 2));
    let rx = 12 * d / cx;
    let ry = 12 * d / cy;
    let ratio = 6/7;
    ex = rx * -Math.cos(rad) * ratio;
    ey = ry * -Math.sin(rad);
    //
    $(".eyes").css("transform", `translateX(${240 - 8 + ex}px) translateY(${240 + ey}px)`);
    //
    $("#sonyan").css("transform", `translateX(${ex/2}px) translateY(${ey/2 - cy/10}px)`);
    $("body").css("transform", `translateX(${ex/3}px) translateY(${ey/3}px)`);
}


$(window).mousemove(function(e) {
    pursue(e);
});

$(function() {
    // Get form element
    const form = document.getElementById("search-wrapper");
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        //
        let query = $("#search-box").val();
        // Animation
        $("#sonyan").addClass("searching");
        $("#sonyan").removeClass("prevent-ani");
        if(query) {
            $("#sonyan").addClass("searching-2");
        } else {
            $("#sonyan").addClass("canceled");
        }
        // Wait for animation
        setTimeout(() => {
            if (query) {
                // Open result in new tab
                window.open(`https://www.sotetsu.co.jp/search/?q=${query}`, "_blank");
                // Clear form
                location.reload();
            } else {
                $("#sonyan").removeClass("searching canceled");
                $("#sonyan").addClass("prevent-ani");
                // Random color
                if (Math.floor(Math.random()*10) == 9) {
                    $(".cls-3").css("fill", "#48a7ff");
                } else {
                    $(".cls-3").css("fill", "#ffa71a");
                }
            }
        }, 750);
    });
})