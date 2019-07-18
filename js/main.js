;
(function () {
    const iframeBlock = document.querySelector('.iframe-tizer');
    const iframeVideo = iframeBlock.querySelector('iframe');
    const mainTizerPlayButton = document.querySelector('.play-online');
    const previewTizers = document.querySelectorAll('.preview');
    const closeVideoButton = document.querySelector('.close-tizer');

    //
    document.querySelector('.button_timer').addEventListener("mouseover", (e) => {
        e.currentTarget.classList.remove('show-timer');
    e.currentTarget.classList.add('hover');
    });
    document.querySelector('.button_timer').addEventListener("mouseleave", (e) => {
        e.currentTarget.classList.remove('hover');
        e.currentTarget.classList.add('show-timer');
    });
    
    // Start timer
    startTimer();

    //Click mainTizer
    mainTizerPlayButton.addEventListener('click', (e) => consrolVideo.playVideo(iframeVideo, e.currentTarget.dataset.src, iframeBlock));

    previewTizers.forEach(item => {
        checkButtonPlay(item);
        // Click one of tizers
        var srcVideo = item.dataset.src;
        if (srcVideo != "") {
            item.addEventListener('click', (e) => consrolVideo.playVideo(iframeVideo, e.currentTarget.dataset.src, iframeBlock))
        }
    });

    // Click button close video
    closeVideoButton.addEventListener('click', () => consrolVideo.closeVideo(iframeVideo, iframeBlock));

    // Show or hide Play button
    function checkButtonPlay(elem) {
        const srcVideo = elem.dataset.src;
        const buttonPlayVideo = elem.querySelector('.play-button');
        (srcVideo === '') ? (buttonPlayVideo.classList.add('hide')) : '';
    }
    const consrolVideo = {
        // Open iframe with video tizer
        playVideo: function (iframeVideo, iframeSrc, iframeBlock) {
            if (arguments.length == 3) {
                this.gaSend(iframeSrc);
                this.toggleView(iframeBlock);
                iframeVideo.setAttribute('src', `${iframeSrc}?autoStart=true`);
            }
        },
        // Close iframe with video tizer
        closeVideo: function (iframeVideo, iframeBlock) {
            if (arguments.length == 2) {
                this.toggleView(iframeBlock);
                iframeVideo.setAttribute('src', '');
            }
        },
        toggleView: function (iframeBlock) {
            iframeBlock.classList.toggle('active');
        },
        gaSend: function (iframeSrc) {
            ga('send', 'event', 'Roast', 'Play', `Tizer ${iframeSrc}`);
        }
    }

    function startTimer() {
        const second = 1000,
            minute = second * 60,
            hour = minute * 60,
            day = hour * 24;

        let countDown = new Date('July 23, 2019 00:00:00').getTime(),
            x = setInterval(function () {

                let now = new Date().getTime(),
                    distance = countDown - now;
                var nowDays, nowHours, nowMinutes, nowSeconds;

                // nowDays = (Math.floor(distance / (day))) < 9 ? `0${Math.floor(distance / (day))}` : Math.floor(distance / (day));
                nowDays = (Math.floor(distance / (day))) * 24;
                nowHours = nowDays < 10 ? `0${nowDays}` : nowDays;
                nowMinutes = (Math.floor((distance % (hour)) / (minute))) < 10 ? `0${Math.floor((distance % (hour)) / (minute))}` : Math.floor((distance % (hour)) / (minute));
                nowSeconds = (Math.floor((distance % (minute)) / second)) < 10 ? `0${Math.floor((distance % (minute)) / second)}` : Math.floor((distance % (minute)) / second);
                //document.getElementById('days').innerText = nowDays;
                document.getElementById('hours').innerText = nowHours,
                    document.getElementById('minutes').innerText = nowMinutes,
                    document.getElementById('seconds').innerText = nowSeconds;

                //do something later when date is reached
                //if (distance < 0) {
                //  clearInterval(x);
                //  'IT'S MY BIRTHDAY!;
                //}

            }, second)
    }
}());