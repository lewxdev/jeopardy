$(document).ready(function() {

    $('.a-box').hide(console.log("Answer box hidden"));
    $('.progress-bar').hide(console.log("Progress bar hidden"));

    $('.box a').click(function() {
        console.log("#" + this.id + " " + "pressed, executing code...");
        $("#" + this.id).remove(console.log("Removed #" + this.id));
    });

    $('.close').click(function() {
        $('.a-box').hide(console.log("Answer box hidden"));
        $('.progress-bar').hide(console.log("Progress bar hidden"));
        setTimeout(function() {
            $('.q-box').show(console.log("Query box shown"));
        }, 1000);
    });

    $('body').on('keyup', function(e) {
        if(e.which==27) {
            console.log("Escape pressed, executing code...");
            window.location.href = '#', console.log("Exited query");
            $('.a-box').hide(console.log("Answer box hidden"));
            $('.progress-bar').hide(console.log("Progress bar hidden"));
            setTimeout(function() {
                $('.q-box').show(console.log("Query box shown"));
            }, 1000);
        }
    });

    $('body').on('keyup', function(e) {
        if(e.which==83) {
            console.log("S key pressed, executing code...");
            console.log("Toggled timer");
            setTimeout(function() {
                $('.clock').show(console.log("Clock shown"));
                $('.progress-bar').show(console.log("Progress bar shown"));
            }, 1000);

            var time = 6;
            var clock = setInterval(function() {
                time--;
                $('.time').html(time);
                if(time < 0) {
                    clearInterval(clock, console.log("Cleared clock"));
                    clearInterval(progress, console.log("Cleared progress"));
                    $('.clock').hide(console.log("Clock hidden"));
                    $('.q-box').hide(console.log("Query box hidden"));
                    $('body').on('keyup', function(e) {
                        if(e.which==69) {
                        $('.a-box').show(console.log("Answer box shown"));
                        }
                    })
                } else {
                    console.log(time + " seconds...");
                }
            }, 1000);

            var width = 100;
            var progress = setTimeout(function() {
                setInterval(function() {
                    if(width > 0) {
                    width--;
                    $('.progress-bar').css("width", width + "%");
                    console.log("   " + width + "%")
                    }
                }, 50);
            }, 1000)

            $('body').on('keyup',function(e) {
                if(e.which==68) {
                    console.log("D key pressed, executing code...");
                    clearInterval(clock, console.log("Cleared clock"));
                    width = 0, console.log("Set width to " + width);
                    clearInterval(progress, console.log("Cleared progress"));
                    $('.clock').hide(console.log("Clock hidden"));
                    $('.q-box').hide(console.log("Query box hidden"));
                    $('.a-box').show(console.log("Answer box shown"));
                }
            });
        }
    });

});