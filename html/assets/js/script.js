let range = 2;
let selectedMic = 2;
let progressBar;
let showHelpNotify = false;
let notifySound = true;
let globalSettings = [];
let setHTMLload = false;

window.addEventListener("keyup", (event) => {
    if (event.key == "Escape") {
        $('.hud-settings').fadeOut();
        $.post(`https://${GetParentResourceName()}/close`)
    }
})

window.addEventListener('message', function(event) {
    let data = event.data;

    switch (data.type) {
        case "loadhud": {
            if (!setHTMLload) {
                setHTMLload = true;
                loadhtml(data.data.language)
                $('.scoreboard').hide();
                $('.progress-bar').hide();
                $('.help-notify').hide();
                $('.speedo-box').hide();
                $('.weapon_box').hide();
                $('.foodbars').hide();
                $('.hud-settings').hide();
                $.post(`https://${GetParentResourceName()}/hudLoaded`)
                sendTime();
                break;
            }
        }
        case "player-job": {
            $('#job').text(data.data.job);
            $('#grade').text(data.data.grade);
            break;
        }
        case "player-count": {
            $('#player-count-currently').text(data.data.players);
            $('.player-count-count').text("/" + data.data.maxPlayers);
            break;
        }
        case "player-money": {
            if (data.data.cash != null) {
                $('#cash-money').text(formatMoney(data.data.cash, data.data.currency))
            } 
            if (data.data.bank != null) {
                $('#bank-money').text(formatMoney(data.data.bank, data.data.currency))
            }
            break;
        }
        case "player-id": {
            $('.player-id-id').text(data.data.playerId);
            break;
        }
        case "speedometer": {
            $('.speedo-box').fadeIn();
            let speed_percent = Math.min(100, Math.max(0, data.data.speed_percent));
            let dash_max = 440;
            let dash_min = 0;
            let adjusted_dash = dash_min + (speed_percent / 100) * (dash_max - dash_min);
            $('.speedo-circle').css('stroke-dasharray', `${adjusted_dash}, 600`);


            if (data.data.speed < 100) {
                $('.speed-number').css("left", "4.43vw")
                $('#speedo-text-null').text("0")
                $('#speedo-text-two').text(data.data.speed)
            }
            if (data.data.speed < 10) {
                $('.speed-number').css("left", "4.43vw")
                $('#speedo-text-null').text("00")
                $('#speedo-text-two').text(data.data.speed)
            } 
            if (data.data.speed == 0) {
                $('.speed-number').css("left", "4.43vw")
                $('#speedo-text-null').text("000")
                $('#speedo-text-two').text("")
            }
            if (data.data.speed > 100) {
                $('#speedo-text-null').text("")
                $('#speedo-text-two').text(data.data.speed)
                $('.speed-number').css("left", "4.95vw")
            }

            // engine
            const engine_maxDashValue = 105;
            const engine_minDashValue = 0;
            const engine_totalDashLength = 600;
    

            const engine_Percentage = (data.data.vehicle_health / 10);
            const engine_adjustedDashArray = engine_minDashValue + (engine_Percentage / 100) * (engine_maxDashValue - engine_minDashValue);
            
            $('.engine-circle').css("stroke-dasharray", `${engine_adjustedDashArray}, ${engine_totalDashLength}`);

            // fuel
            const fuel_maxDashValue = 120;
            const fuel_minDashValue = 226;
            const fuel_totalDashLength = 640;
        
            const fuel_fuelPercentage = data.data.fuel;
            const fuel_adjustedDashArray = fuel_minDashValue + (fuel_fuelPercentage / 100) * (fuel_maxDashValue - fuel_minDashValue);
        
            $('.fuel-circle').css("stroke-dasharray", `${fuel_adjustedDashArray}, ${fuel_totalDashLength}`);

            // lockStatus
            if (data.data.lockStatus == 2) {
                $('.door-icon').css("color", "var(--door-close-icon)")
            } else if (data.data.lockStatus == 1) {
                $('.door-icon').css("color", "var(--door-icon)")
            }
            break;
        }
        case "hideSpeedometer": {
            $('.speedo-box').fadeOut(300);
            break;
        }
        case "server-names": {
            $('.server-names-title').text(data.data.server_name)
            $('.server-names_twice').text(data.data.server_type)
            $('.logo').attr("src", data.data.logo)
            break;
        }
        case "player-status": {
            if (data.data.name == "hunger") {
                $('#eat').css("width", (data.data.percent + "%"))
            }
            if (data.data.name == "thirst") {
                $('#drink').css("width", (data.data.percent + "%"))
            }
            break;
        }
        case "weapon-ammo": {
            $('.weapon_box').fadeIn(400);
            $('#weapon-name').text(data.data.name)
            $('#weapon-ammo').text(data.data.ammo)
            $('#weapon-ammo-max').text("/" + data.data.ammo_max)
            break;
        }
        case "weapon-hide": {
            $('.weapon_box').fadeOut(400);
            break;
        }
        case "show-status": {
            $('.foodbars').fadeIn()
            break;
        }
        case "voice-mode": {
            if (data.data.type == "PMA" || data.data.type == "mumble-voice") {
                $('#mic-4').hide()
            }
            break;
        }
        case "voice-status": {
            if (data.data.type === "voice") {
                const backgroundColor = data.data.bool ? "#7DDE29" : "#ED254E";
                const boxShadowColor = data.data.bool ? "rgba(125, 222, 41, 0.32)" : "rgba(237, 37, 78, 0.32)";
        
                for (let i = 1; i <= selectedMic; i++) {
                    const micSelector = `#mic-${i}`;
                    $(micSelector).css({
                        background: backgroundColor,
                        boxShadow: `0vw 0vw 0.52vw 0vw ${boxShadowColor}`
                    });
                }
            }
            break;
        }
        case "funk": {
            const backgroundColor = data.data.bool ? "var(--funk-active)" : "var(--funk-status)";
            const backgroundColor2 = data.data.bool ? "var(--funk-active)" : "var(--funk-status-background)";
        
            for (let i = 1; i <= 4; i++) {
                $(`#funk-${i}`).css({
                    background: backgroundColor,
                    boxShadow: `0vw 0vw 0.52vw 0vw ${backgroundColor2}`
                });
            }
            break;
        }
        case "voice-range": {
            selectedMic = data.data.range;
            for (let i = 1; i <= 4; i++) {
                const micSelector = `#mic-${i}`;
                const backgroundColor = i <= selectedMic ? "var(--mic-status)" : "#FFFFFF52";
                const backgroundShadow = i <= selectedMic ? "0vw 0vw 0.52vw 0vw var(--mic-status-background);" : "none"
                $(micSelector).css("background", backgroundColor);
                $(micSelector).css("box-shadow", backgroundShadow);
            }
            break;
        }
        case "helpNotify": {
            if (!data.data.show) {
                $('.help-notify').fadeOut(400);
            } else {
                $('.help-notify').fadeIn();
                $('.help_text').text(data.data.text)
                $('.key').text(data.data.key)
            }
            break;
        }
        case "progressbar": {
            startProgressbar(data.data.text, data.data.time);
            break;
        }
        case "progressbar:cancel": {
            cancelProgressbar()
            break;
        }
        case "notify": {
            notify(data.data.type, data.data.title, data.data.msg, data.data.time, data.data.icon);
            break;
        }
        case "announce": {
            announce(data.data.title, data.data.msg, data.data.time)
            break;
        }
        case "street": {
            $('#street-zone').text(data.data.street)
            $('#street-name').text(data.data.zone)
            break;
        }
        case "scoreboard": {
            if (data.data.openui) {
                $('.scoreboard').fadeIn(400);
                $('.scoreboard-logo').attr('src', data.data.logo)
                
                $('.scoreboard-name').text(data.data.language["title"])
                $('.scoreboard-desc').text(data.data.language["description"])
                setData(data.data.data, data.data.language["online"]);
            } else {
                $('.scoreboard').fadeOut(400);
            }
            break;
        }
        case "hide-hud": {
            if (data.data.status) {
                $('.scoreboard').fadeOut(400);
                $('body').hide();
            } else {
                $('body').show();
            }
            break;
        }
        case "send-sound": {
            let audio = new Audio(`${data.data.sound}`);
            audio.volume = "0.3"
            audio.play();
            break;
        }
        case "hud-settings": {
            if (!data.data.status) $('.hud-settings').fadeOut(400);
            if (data.data.status) $('.hud-settings').fadeIn(400);
            break;
        }
        case "get-hud:settings" : {
            let settings = data.data.settings 
            let globalSettings = JSON.stringify(data.data.settings)
            if (!globalSettings) return;
            for (let i = 0; i < settings.length; i++) {
                let elementName = Object.keys(settings[i])[0];
                let elementData = JSON.parse(settings[i][elementName]);
                if (!elementData.status) {
                    let elementId = document.getElementById(`${elementName}-id`);
                    elementId.classList.remove('checked');
                    elementId.classList.add('unchecked');
                    $(`${elementData.element}`).fadeOut(400);
                }
            }
            
            $('.settings-logo').attr("src", data.data.logo)
            
            break;
        }
    }
})

// functions
let notifyCount = 1;
let currentlyAnnouncing = false
const announcementQueue = [];

function announce(title, msg, time) {
    if (currentlyAnnouncing) {
        enqueueAnnouncement(title, msg, time)
        return;
    }
    currentlyAnnouncing = true
    const currentlyNotify = notifyCount;
    $('.announces').append(`
        <div class="announce-box" id="announce-Id-${currentlyNotify}">
            <div class="announce-shadow"></div>
            <img class="announce-icon" src="./assets/img/info-announce.svg">
            <div class="title-strich">
                <div class="announce-strich-left">
                    <div class="strich-announce" style="transform: rotate(155deg);"></div>
                    <div class="strich-announce" style="transform: rotate(155deg);"></div>
                    <div class="strich-announce" style="opacity: 0.72; transform: rotate(155deg);"></div>
                    <div class="strich-announce" style="opacity: 0.48; transform: rotate(155deg);"></div>
                    <div class="strich-announce" style="opacity: 0.16; transform: rotate(155deg);"></div>
                </div>
                <p class="announce-title">${title}</p>
                <div class="announce-strich-left" style="right: -1.16vw;">
                    <div class="strich-announce" style="opacity: 0.16;"></div>
                    <div class="strich-announce" style="opacity: 0.48;"></div>
                    <div class="strich-announce" style="opacity: 0.72;"></div>
                    <div class="strich-announce"></div>
                    <div class="strich-announce"></div>
                </div>
            </div>
            <p class="announce-msg">${msg}</p>
            <div class="announce-progress">
                <div class="announce-progress-fill" id="announce-id-${currentlyNotify}"></div>
            </div>
        </div> 
    `);
    $.post(`https://${GetParentResourceName()}/sound`, JSON.stringify({type: "announce"}))
    $('#announce-id-' + currentlyNotify).animate({
        width: "100%"
    }, time);

    setTimeout(() => {
        $(`#announce-Id-${currentlyNotify}`).css({
            animation: "fadeOutAnnounce 0.5s"
        })
        setTimeout(() => {
            $(`#announce-Id-${currentlyNotify}`).remove();
        }, 0);
        currentlyAnnouncing = false;
        processAnnouncementQueue();
    }, time);

    notifyCount++;
}

function notify(type, title, msg, time, icon) {
    const currentlyNotify = notifyCount;
    $('.notifys-container').append(`
        <div class="notify-container" id="notify-Id-${currentlyNotify}">
            <div class="notify-progress">
                <div class="progress-${type}-fill" id="progress-id-${currentlyNotify}"></div>
            </div>
            <div class="notify-con">
                <iconify-icon icon="${icon}" class="notify-icon-ify-${type}" width="1.25vw" height="2.22vh"></iconify-icon>
                <p class="notify-title-${type}">${title}</p>
                <p class="notify-txt">${msg}</p>
            </div>
        </div>
    `);
    $.post(`https://${GetParentResourceName()}/sound`, JSON.stringify({type: "notify"}))
    $('#progress-id-' + currentlyNotify).animate({
        height: "100%"
    }, time);
    setTimeout(() => {
        $(`#notify-Id-${currentlyNotify}`).css({
            animation: "fadeOut 0.5s"
        })
        setTimeout(() => {
            $(`#notify-Id-${currentlyNotify}`).remove();
        }, 500);
    }, time);

    notifyCount++;
}

function setData(data, online) {
    $('.jobs').empty();
    for (let i = 0; i < 6 && i < data.length; i++) {
        const item = data[i];
        const color = isValidColor(item.color) ? item.color : 'rgba(237, 37, 78, 0.32)';

        $('.jobs').append(`
            <div class="job" style="background: ${item.color}; box-shadow: 0vw 0vw 1.88vw 0vw rgba(0, 0, 0, 0.32) inset, 0vw 0vw 3.33vw 0vw ${item.color};">
                <p class="job-name">${item.name}</p>
                <iconify-icon icon="${item.icon}" style="color: white;" class="job-icon" width="26" height="48"></iconify-icon>
                <p class="job-count">${item.count} ${online}</p>
            </div>
        `);
    }
}

function isValidColor(color) {
    const colorRegex = /^(#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})|rgba?\([^)]+\)|[a-z]+)$/;
    return colorRegex.test(color);
}

function loadhtml(language) {
    let css = `
        body{overflow:hidden}*{margin:0;line-height:0;user-select:none}.hud{position:absolute;height:56.25vw;width:100vw}.server-infos{position:absolute;top:1.25vw;left:82.29vw;width:15.83vw;height:5vw}.logo{position:absolute;width:3.33vw;height:3.33vw;right:.63vw;top:.83vw}.server-names{position:absolute;width:auto;right:4.58vw;top:1.35vw}.server-names-title{color:var(--name-primary);text-align:right;text-shadow:0vw 0vw .31vw rgba(0,0,0,0.32);font-family:"Collonse Bold";font-size:.83vw;font-style:normal;font-weight:400;line-height:normal;letter-spacing:.05vw;white-space:nowrap}.server-names_twice{color:var(--name-secondary);font-family:"Collonse Bold";font-size:.83vw;font-style:normal;padding-left:.26vw;font-weight:400;line-height:normal;letter-spacing:.05vw}.shadow-server-infos{position:absolute;width:15.83vw;height:5vw;background:rgba(0,0,0,0.32);filter:blur(1.88vw)}.text-server-infos{position:absolute;top:2.76vw;right:4.58vw;display:flex;align-items:center}.player-info{display:flex;align-items:center;gap:.63vw}.player-id,.player-count{color:#FFF;text-shadow:0vw 0vw .16vw rgba(0,0,0,0.32);font-family:"Gilroy-SemiBold";font-size:.73vw;font-style:normal;font-weight:400;line-height:normal;margin:0}.player-count-span{color:#FFF;text-shadow:0vw 0vw .16vw rgba(0,0,0,0.32);font-family:"Gilroy-SemiBold";font-size:.73vw;font-style:normal;font-weight:400;line-height:normal;margin:0}.player-id-id{padding-left:.16vw}.player-count-count,.player-id-id{color:rgba(255,255,255,0.48);font-family:"Gilroy-SemiBold";font-size:.73vw;font-style:normal;font-weight:400;line-height:normal}.WeaponMoneyBox{position:absolute;top:4.71vw;right:.21vw;width:auto;height:11.2vw}.money_box{position:absolute;width:8.33vw;height:4.06vw;right:2.81vw;top:2.06vw}.money_blabla{position:relative;margin-bottom:.88vw;width:text;height:1.59vw}.money-icon{position:absolute;right:0vw;top:.53vw}.money_strich{position:absolute;width:.1vw;right:1.25vw;top:0vw;height:1.79vw;opacity:.48;background:#FFF}.money-amount{position:absolute;top:0vw;height:.84vw;right:1.77vw;color:#FFF;text-align:right;text-shadow:0vw .05vw .31vw rgba(0,0,0,0.48);font-family:"Gilroy-SemiBold";font-size:.83vw;font-style:normal;white-space:nowrap;font-weight:400;line-height:normal}.money-type{position:absolute;right:1.77vw;height:.71vw;top:.88vw;color:#FFF;text-align:right;text-shadow:0vw .05vw .31vw rgba(0,0,0,0.48);font-family:"Gilroy-Medium";font-size:.73vw;font-style:normal;font-weight:400;line-height:normal;text-transform:uppercase;opacity:48%}.weapon_box{position:absolute;right:2.66vw;width:6.46vw;height:2.03vw;bottom:.65vw}.weapon-icon{position:absolute;width:2.19vw;height:4.44vh;right:-0.63vw;top:-0.26vw}.weapon_strich{position:absolute;top:0vw;width:.1vw;height:1.88vw;right:1.25vw;opacity:.48;background:var(--weapon-line)}.weapon-name{position:absolute;top:0vw;right:1.77vw;width:text;height:2.03vw;color:#FFF;text-shadow:0vw .05vw .31vw rgba(0,0,0,0.64);text-align:right;font-family:"Gilroy-SemiBold";font-size:.83vw;font-style:normal;font-weight:400;line-height:normal;white-space:nowrap}.weapon-clip{position:absolute;top:1.04vw;right:1.77vw;width:text;white-space:nowrap;color:#FFF;text-shadow:0vw .05vw .31vw rgba(0,0,0,0.64);font-family:"Gilroy-Medium";font-size:.83vw;font-style:normal;font-weight:400;line-height:normal}.weapon_max-clip{color:rgba(255,255,255,0.48);font-family:"Gilroy-Medium";font-size:.63vw;font-style:normal;font-weight:400;line-height:normal}.notifys-container{position:absolute;width:auto;bottom:12.6vw;left:1.51vw}.notify-con{position:relative;bottom:0;width:9.95vw;border-radius:.42vw;background:var(--notify-background-color);box-shadow:0vw 0vw 1.67vw 0vw var(--notify-box-shadow) inset;margin-left:.73vw;padding-top:1.93vw;padding-left:3.75vw;padding-right:1.25vw;padding-bottom:1.04vw}.notify-icon{position:absolute;height:3.65vw;width:3.65vw;left:0;top:50%;transform:translateY(-50%)}.notify-icon-ify-error,.notify-icon-ify-success,.notify-icon-ify-info,.notify-icon-ify-warning{position:absolute;top:50%;transform:translateY(-50%);left:1.25vw;color:var(--notify-type-error)}.notify-icon-ify-success{color:var(--notify-type-success)}.notify-icon-ify-info{color:var(--notify-type-info)}.notify-icon-ify-warning{color:var(--notify-type-warning)}.notify-container{position:relative;width:auto;animation:fadeIn .5s;margin-bottom:.63vw;bottom:0vw;height:auto;left:0vw}.fadeOutAnimation{animation:fadeOut .5s}.notify-txt{width:auto;max-width:9.95vw;color:#FFF;text-shadow:0vw 0vw .42vw rgba(0,0,0,0.24);font-family:"Gilroy-Medium";font-size:.63vw;font-style:normal;font-weight:400;line-height:normal;text-align:left;flex-wrap:wrap-reverse;word-break:break-word}.notify-progress{position:absolute;left:0;width:.31vw;height:100%;border-radius:.21vw;background:rgba(0,0,0,0.48)}.progress-info-fill{position:absolute;bottom:0vw;left:0vw;width:.31vw;height:0;border-radius:.21vw;background:var(--notify-type-info-progress);box-shadow:0vw 0vw .42vw 0vw rgba(249,243,1,0.00)}.progress-warning-fill{position:absolute;bottom:0vw;left:0vw;width:.31vw;height:0;border-radius:.21vw;background:var(--notify-type-warning-progress);box-shadow:0vw 0vw .42vw 0vw rgba(255,130,14,0.00)}.progress-error-fill{position:absolute;bottom:0vw;left:0vw;width:.31vw;height:0;border-radius:.21vw;background:var(--notify-type-error-progress);box-shadow:0vw 0vw .42vw 0vw rgba(237,37,78,0.24)}.progress-success-fill{position:absolute;bottom:0vw;left:0vw;width:.31vw;height:0;border-radius:.21vw;background:var(--notify-type-success-progress);box-shadow:0vw 0vw .42vw 0vw rgba(125,222,41,0.24)}.notify-title-success,.notify-title-warning,.notify-title-info,.notify-title-error{position:absolute;color:var(--notify-type-success);top:.94vw;left:3.75vw;text-shadow:0vw 0vw .42vw rgba(0,0,0,0.24);font-family:"Gilroy-Semibold";font-size:.73vw;font-style:normal;font-weight:600;line-height:normal;text-transform:uppercase}.notify-title-warning{color:var(--notify-type-warning)}.notify-title-info{color:var(--notify-type-info)}.notify-title-error{color:var(--notify-type-error)}.progress-bar{position:absolute;bottom:5.57vw;left:50%;transform:translateX(-50%);width:18.33vw;height:5.42vw;text-align:center}.progress-bar-con{position:absolute;top:2.55vw;left:0;width:100%;height:.31vw;border-radius:15.63vw;background:rgba(0,0,0,0.48)}.progress-bar-fill{position:absolute;left:0vw;width:0;height:.31vw;border-radius:15.63vw;background:var(--progressbar-color);box-shadow:0vw 0vw .42vw 0vw var(--progressbar-color-box-shadow),0vw .1vw .31vw 0vw rgba(0,0,0,0.24)}.progress-percent{position:absolute;bottom:.1vw;left:50%;transform:translateX(-50%);color:#fff;font-family:"Gilroy-Semibold";font-size:1.67vw;font-style:normal;font-weight:600;line-height:normal;letter-spacing:.07vw}.progress-txt{position:absolute;top:1.2vw;width:100%;left:50%;transform:translate(-50%,-50%);color:#FFF;opacity:78%;text-shadow:0vw 0vw .31vw rgba(0,0,0,0.24);font-family:"Gilroy-Semibold";font-size:.83vw;font-style:normal;font-weight:600;line-height:normal;letter-spacing:.03vw}.help-notify{position:absolute;bottom:1.09vw;left:41.82vw;width:16.35vw;height:5.42vw;animation:helpNoitfy 1.0}.help-notifyOut{position:absolute;animation:helpNoitfyOut 1.0}@keyframes helpNoitfy{0%{bottom:-6.56vw}100%{bottom:1.09vw}}@keyframes helpNoitfyOut{100%{bottom:-6.56vw}0%{bottom:1.09vw}}.control-key{position:absolute;width:2.5vw;height:2.5vw;left:0vw;border-radius:15.63vw;background:rgb(17, 34, 231)}.key{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:auto;color:#FFF;text-shadow:0vw 0vw .31vw rgba(0,0,0,0.32);font-family:"Gilroy-Semibold";font-size:1.04vw;font-style:normal;font-weight:500;line-height:normal;letter-spacing:.04vw}.control-infos{position:absolute;width:13.02vw;height:2.5vw;top:1.46vw;left:50%;transform:translateX(-50%)}.help-shadow{position:absolute;width:16.35vw;height:5.42vw;background:rgba(0,0,0,0.24);filter:blur(1.88vw)}.help_text{position:absolute;color:#FFF;top:50%;transform:translateY(-50%);left:2.81vw;height:1.04vw;white-space: nowrap;;font-family:"Gilroy-Semibold";font-size:.83vw;font-style:normal;font-weight:600;line-height:normal;letter-spacing:.03vw;white-space:nowrap}.speedo-box{position:absolute;bottom:.21vw;right:.63vw;width:13.33vw;height:13.33vw}.shadow-speedo{position:absolute;width:13.33vw;height:13.33vw;background:rgba(0,0,0,0.40);filter:blur(2.71vw)}.icons-box{position:absolute;top:10.16vw;left:4.22vw;width:4.9vw;height:1.46vw}.engine-icon{position:absolute;width:.83vw;height:.83vw}.door-icon{position:absolute;left:2.03vw;top:.63vw;width:.83vw;height:.83vw}.fuel-icon{position:absolute;right:0vw}.speedo-circle{fill:none;stroke-linecap:round;stroke-width:.38vw;stroke-dasharray:270,600;stroke-dashoffset:0;stroke:var(--speedometer-circle);transform:rotate(137deg)}.speedo-circle-bg{fill:none;stroke-linecap:round;stroke-width:.38vw;stroke-dasharray:440,600;stroke-dashoffset:0;stroke:rgba(255,255,255,0.12);transform:rotate(137deg)}.speedo-circle-box{position:absolute;top:.99vw;width:11.88vw;left:.78vw}.engine-circle{fill:none;stroke-linecap:round;stroke-width:.22vw;stroke-dasharray:60,600;stroke-dashoffset:0;stroke:var(--engine-circle);transform:rotate(137deg)}.engine-circle-bg{fill:none;stroke-linecap:round;stroke-width:.22vw;stroke-dasharray:105,600;stroke-dashoffset:0;stroke:rgba(255,255,255,0.12);transform:rotate(137deg)}.speedo-kmh{position:absolute;left:6.82vw;transform:translateX(-50%);opacity:48%;bottom:4.43vw;color:#FFF;font-family:"Gilroy-Medium";font-size:.83vw;font-style:normal;font-weight:500;line-height:normal;letter-spacing:.03vw}.engine-circle-box{position:absolute;top:1.56vw;width:11.88vw;left:.21vw;filter:blur(0.03vw)}.speed-number{position:absolute;left:4.43vw;height:3.02vw;width:4.48vw;bottom:4.95vw;color:#FFF;font-family:"Gilroy-Medium";font-size:2.5vw;font-style:normal;font-weight:400;line-height:normal;letter-spacing:.1vw}.speed-number-null{color:rgba(255,255,255,0.48)}.fuel-circle{fill:none;stroke-linecap:round;stroke-width:.22vw;stroke-dasharray:160,640;stroke-dashoffset:520;stroke:var(--fuel-circle);transform:rotate(49deg)}.fuel-circle-bg{fill:none;stroke-linecap:round;stroke-width:.22vw;stroke-dasharray:160,600;stroke-dashoffset:520;stroke:rgba(255,255,255,0.12);transform:rotate(49deg)}.fuel-circle-box{position:absolute;top:3.33vw;width:11.88vw;left:3.8vw;filter:blur(0.03vw)}.icon-time{position:relative;margin-right:0.36vw;color:white;width:1.25vw;height:1.25vw}.time-box{display:flex;align-items:center;position:absolute;top:1.2vw;left:.71vw;width:5.94vw;height:2.5vw}.timeBoxTxt{position:relative;display:flex;align-items:center;height:0.89vw;justify-content:center}.time-time{position:relative;margin-right:0.16vw;color:#FFF;text-shadow:0vw 0vw .16vw rgba(0,0,0,0.64);font-family:"Gilroy-Medium";font-size:.94vw;font-style:normal;font-weight:400;line-height:normal}.time-date{position:relative;transform: translateY(5%); margin-left: 0.31vw; color:rgba(255,255,255,0.48);text-shadow:0vw 0vw .31vw rgba(0,0,0,0.64);font-family:"Gilroy-Medium";font-size:.86vw;font-style:normal;font-weight:400;line-height:normal}.user-infos{position:absolute;display:flex;flex-direction:column;flex-wrap:nowrap;align-content:flex-end;justify-content:space-evenly;align-items:flex-start;left:16.15vw;bottom:0vw;width:8.02vw;height:11.41vw}.outoff-food{position:relative;width:128.477;height:7.55vw}.foodbars{position:relative;padding-right:0vw;width:8.02vw;height:auto}.food_drink{position:relative;margin-bottom:.6vw;width:auto;height:1.07vw}.eat_drink-icon{position:absolute;width:.83vw;height:.83vw;bottom:0vw}.status_bar{position:absolute;left:1.3vw;bottom:.5vw;width:6.67vw;height:.31vw;border-radius:.42vw;background:rgba(0,0,0,0.48);transform:rotate(-4deg)}.fill_progress{position:absolute;width:64%;height:.31vw;border-radius:.42vw;background:var(--drink-progress)}.user-box{position:relative;margin-top:.31vw;width:5.73vw;height:auto}.user-job-icon{position:absolute;top:50%;transform:translateY(-50%)}.user-title{position:relative;color:#FFF;top:0vw;left:1.77vw;text-shadow:0vw 0vw .16vw rgba(0,0,0,0.64);font-family:"Gilroy-Medium";font-size:.83vw;font-style:normal;font-weight:400;white-space:nowrap;line-height:normal}.user-info{position:relative;padding-top:.1vw;left:1.77vw;color:rgba(255,255,255,0.48);text-shadow:0vw 0vw .31vw rgba(0,0,0,0.64);font-family:"Gilroy-Medium";font-size:.68vw;font-style:normal;white-space:nowrap;font-weight:400;line-height:normal}.mic-funk{position:relative;display:flex;width:6.69vw;margin-top:.99vw}.funk-mic-icon{position:relative;width:2.93vw;height:1.25vw}.radius-status{position:relative;flex:none;justify-content:flex-end;top:-1.04vw;left:1.5vw;height:.83vw;width:auto}.status{position:relative;display:inline-block;left:.1vw;width:.16vw;margin-right:-0.05vw;height:.83vw;transform:rotate(25deg);border-radius:.05vw;background:rgba(255,255,255,0.32)}.announce-box{position:relative;margin:0vw;left:50%;width:fit-content;animation:fadeInAnnounce .5s;transform:translateX(-50%);padding:0}.announces{position:absolute;top:1.41vw;width:23.33vw;height:auto;left:40.16vw}.announce-msg{position:relative;padding-top:4.95vw;width:19.68vw;left:50%;transform:translateX(-50%);color:#FFF;text-align:center;word-break:break-word;text-shadow:0vw 0vw .31vw rgba(0,0,0,0.40);font-family:"Gilroy-Medium";font-size:.83vw;font-style:normal;font-weight:400;line-height:normal;letter-spacing:-0.03vw;text-transform:uppercase}.announce-shadow{position:absolute;height:100%;width:19.68vw;border-radius:23.33vw;background:rgba(0,0,0,0.32);filter:blur(2.5vw)}.announce-progress{position:absolute;left:0vw;margin-top:1.25vw;width:100%;height:.31vw;border-radius:15.63vw;background:rgba(0,0,0,0.48)}.announce-progress-fill{position:absolute;width:0;height:.31vw;border-radius:15.63vw;background:var(--announce-progress-fill);box-shadow:0vw 0vw .42vw 0vw var(--announce-progress-box-shadow)}.title-strich{position:absolute;display:flex;flex-direction:row-reverse;top:1.93vw;left:50%;height:auto;width:auto;transform:translateX(-50%)}.announce-title{position:relative;width:auto;display:inline-block;color:var(--announce-title);text-shadow:0vw 0vw .63vw rgba(0,0,0,0.48),0vw 0vw 1.25vw var(--announce-title-shadow);font-family:"Gilroy-Bold";font-size:2.5vw;font-style:normal;font-weight:400;line-height:normal;letter-spacing:-0.07vw;white-space:nowrap;text-transform:uppercase;padding-left:.78vw;padding-right:.78vw}.announce-strich-left{position:relative;display:flex;align-items:flex-start;width:2.8vw;top:.99vw}.strich-announce{position:relative;width:.21vw;height:1.25vw;margin-right:.16vw;transform:rotate(-155deg);border-radius:.05vw;background:var(--announce-lines);box-shadow:0vw 0vw .42vw 0vw var(--announce-lines-shadow)}.announce-icon{position:absolute;width:6.67vw;height:6.67vw;left:50%;transform:translateX(-50%)}.scoreboard{position:absolute;display:flex;flex-direction:column;align-items:center;width:auto;max-width:46.25vw;height:auto;min-width:40vw;left:50%;top:50%;transform:translate(-50%,-50%);background:var(--scoreboard-background)}.hud-settings{position:absolute;width:31.67vw;height:41.61vw;left:50%;top:50%;transform:translate(-50%,-50%);background:var(--hud-settings-background)}.header-settings{position:absolute;left:50%;transform:translateX(-50%);top:2.29vw;width:11.88vw;height:7.5vw}.settings-logo{position:absolute;left:50%;transform:translateX(-50%);width:5.42vw;height:5.42vw}.hud-header-txt{position:absolute;bottom:0vw;color:#FFF;text-shadow:0vw 0vw 1.67vw rgba(255,255,255,0.40);font-family:"Collonse Bold";font-size:1.25vw;font-style:normal;font-weight:400;line-height:normal}.elements-settings{position:absolute;width:auto;height:24.84vw;top:13.49vw;left:50%;transform:translateX(-50%);overflow-y:scroll;overflow-x:hidden}.element-txt{position:absolute;left:2.92vw;height:1.04vw;color:#FFF;top:50%;transform:translateY(-50%);text-shadow:0vw .05vw .31vw rgba(0,0,0,0.64);font-family:"Gilroy-SemiBold";font-size:.83vw;font-style:normal;font-weight:400;line-height:normal}.element-status{position:absolute;width:1.25vw;height:1.25vw;right:2.92vw;top:50%;transform:translateY(-50%);border-radius:.31vw}.unchecked{background:var(--checkbox-unchecked);box-shadow:0vw 0vw 1.25vw 0vw var(--checkbox-unchecked-box-shadow)}.checked{background:var(--checkbox-checked);box-shadow:0vw 0vw 1.25vw 0vw var(--checkbox-checked-box-shadow)}::-webkit-scrollbar{width:.16vw}::-webkit-scrollbar-thumb{border-radius:15.63vw;background:var(--color-scrollbar);}.element{position:relative;width:25vw;height:4.17vw;border-radius:.1vw;border:.05vw solid rgba(255,255,255,0.16);background:rgba(255,255,255,0.08);box-shadow:0 0 1.88vw 0 rgba(0,0,0,0.32) inset;margin-bottom:.83vw;margin-right:.52vw}.element:last-child{margin-bottom:0}.close-scoreboard{position:absolute;width:.83vw;height:.83vw;right:3.33vw;top:2.08vw}.scoreboard-header{position:absolute;top:2.29vw;left:50%;transform:translateX(-50%);width:23.96vw;height:10.63vw}.scoreboard-logo{position:absolute;width:5.42vw;height:5.42vw;left:50%;transform:translateX(-50%)}.scoreboard-name{position:relative;top:5.83vw;color:#FFF;text-shadow:0vw 0vw 1.67vw rgba(255,255,255,0.40);font-family:"Collonse Bold";font-size:2.5vw;font-style:normal;font-weight:400;line-height:normal}.scoreboard-desc{position:absolute;bottom:0vw;width:23.96vw;text-align:center;color:rgba(255,255,255,0.32);text-align:center;text-shadow:0vw 0vw .42vw rgba(0,0,0,0.32);font-family:"Gilroy-SemiBold";font-size:.83vw;font-style:normal;font-weight:400;line-height:normal}.jobs{position:relative;display:flex;align-items:center;justify-content:center;flex-direction:row;flex-wrap:wrap;left:50%;transform:translateX(-50%);height:auto;width:40vw;max-width:38.33vw;padding-top:16.25vw;padding-right:3.33vw;padding-left:3.33vw;padding-bottom:4.58vw}.job{position:relative;display:flex;flex-direction:row;align-items:center;width:10.31vw;height:10.31vw;margin:1.2vw;background:rgba(237,37,78,0.32);box-shadow:0vw 0vw 1.88vw 0vw rgba(0,0,0,0.32) inset,0vw 0vw 3.33vw 0vw rgba(237,37,78,0.24)}.job-name{position:absolute;top:1.67vw;width:auto;height:1.3vw;left:50%;transform:translateX(-50%);color:#FFF;text-align:center;text-shadow:0vw 0vw .42vw rgba(0,0,0,0.32);font-family:"Gilroy-SemiBold";font-size:1.04vw;font-style:normal;font-weight:400;line-height:normal}.job-count{position:absolute;width:auto;height:.99vw;bottom:1.67vw;left:50%;opacity:.48;transform:translateX(-50%);color:#FFF;text-align:center;text-shadow:0vw 0vw .42vw rgba(0,0,0,0.32);font-family:"Gilroy-Medium";font-size:.83vw;font-style:normal;font-weight:400;line-height:normal}.job-icon{position:absolute;height:auto;width:auto;left:50%;top:50%;transform:translate(-50%,-50%)}@keyframes fadeIn{0%{left:-20.83vw;opacity:0}100%{left:0;opacity:100%}}@keyframes fadeOut{0%{left:0;opacity:100%}100%{left:-20.83vw;opacity:0}}@keyframes fadeInAnnounce{0%{top:-20.83vw;opacity:0}100%{top:0;opacity:100%}}.hud-res{position:absolute;width:100vw;height:100vh}@keyframes fadeOutAnnounce{0%{top:0;opacity:100%}100%{top:-20.83vw;opacity:0}}
    `
    $('.hud').append(`
    <style>
    ${css}
    </style>
    <div class="hud-res">
    <div class="server-infos">
        <div class="shadow-server-infos"></div>
        <img class="logo" src="./assets/img/logo.png">
        <p class="server-names"><span class="server-names-title">PRIME</span><span class="server-names_twice">Scripts</span></p>
        <div class="text-server-infos">
            <div class="player-info">
                <iconify-icon icon="el:group" style="color: white; gap: 0.42vw;" width="0.83vw" height="0.83vw"></iconify-icon>
                <p class="player-id"><span class="player-count-span" id="player-id-name">ID:</span><span class="player-id-id">22</span></p>
                <p class="player-count"><span class="player-count-span" id="player-count-currently">5</span><span class="player-count-count">/2048</span></p>
            </div>
        </div>
    </div>
    <div class="WeaponMoneyBox">
        <div class="money_box">
            <div class="money_blabla">
                <iconify-icon class="money-icon" icon="zondicons:wallet" style="color: white;" width="0.94vw" height="0.94vw"></iconify-icon>
                <div class="money_strich"></div>
                <p class="money-amount" id="cash-money">$999 500 500</p>
                <p class="money-type">${language["cash"]}</p>
            </div>
            <div class="money_blabla">
                <iconify-icon class="money-icon" icon="ph:bank-bold" style="color: white;" width="0.94vw" height="0.94vw"></iconify-icon>
                <div class="money_strich"></div>
                <p class="money-amount" id="bank-money">$834 799</p>
                <p class="money-type">${language["bank"]}</p>
            </div>
        </div>
        <div class="weapon_box">
            <img class="weapon-icon" src="./assets/img/weapon-icon.svg">
            <div class="weapon_strich"></div>
            <p class="weapon-name" id="weapon-name">Assault Rifle</p>
            <p class="weapon-clip"><span id="weapon-ammo">34</span><span id="weapon-ammo-max" class="weapon_max-clip">/245</span></p>
        </div>
    </div>
    <div class="notifys-container">
        <!-- script js -->
    </div>
    <div class="progress-bar">
        <p class="progress-txt">Loading ammo into pi Dw adwa dwastol</p>
        <div class="progress-bar-con">
            <div class="progress-bar-fill"></div>
        </div>
        <p class="progress-percent">97%</p>
    </div>
    <div class="help-notify">
        <div class="help-shadow"></div>
        <div class="control-infos">
            <p class="help_text" style="white-space: nowrap;">Press, to open the door</p>
            <div class="control-key">
                <p class="key">E</p>
            </div>
        </div>
    </div>
    <div class="speedo-box">
        <div class="shadow-speedo"></div>
        <svg class="speedo-circle-box" viewBox="-100 -100 200 200">
            <circle cx="0" cy="0" r="95" class="speedo-circle" ></circle>
            <circle cx="0" cy="0" r="95" class="speedo-circle-bg" ></circle>
        </svg>  
        <svg class="engine-circle-box" viewBox="-100 -100 200 200">
            <circle cx="-5" cy="4" r="55" class="engine-circle" ></circle>
            <circle cx="-5" cy="4" r="55" class="engine-circle-bg" ></circle>
        </svg>
        <svg class="fuel-circle-box" viewBox="-100 -100 200 200">
            <circle cx="-55" cy="4" r="55" class="fuel-circle-bg"></circle>
            <circle cx="-55" cy="4" r="55" class="fuel-circle"></circle>
        </svg>
        <div class="icons-box">
            <iconify-icon class="engine-icon" icon="mdi:engine" style="color: #ff3131;" width="0.94vw" height="0.94vw"></iconify-icon>
            <iconify-icon class="door-icon" icon="zondicons:key" style="color: var(--door-icon);" width="0.83vw" height="0.83vw"></iconify-icon>
            <iconify-icon class="fuel-icon" icon="mdi:fuel" style="color: #D3CF1A;" width="0.83vw" height="0.83vw"></iconify-icon>

        </div>
        <p class="speed-number"><span class="speed-number-null" id="speedo-text-null">0</span><span id="speedo-text-two">96</span></p>
        <p class="speedo-kmh">km/h</p>
    </div>
    <div class="announces">
    </div>                     
    <div class="time-box">
        <iconify-icon icon="icon-park-solid:time" class="icon-time" width="1.25vw" height="2.22vh"></iconify-icon>
        <div class="timeBoxTxt"><span class="time-time">20:48</span><p class="time-date" >12.02.2022</p></div>
    </div>
    <div class="user-infos">
        <div class="foodbars">
            <div class="food_drink">
                <iconify-icon icon="fluent:food-24-filled" class="eat_drink-icon" style="color: var(--food-icon);" width="0.83vw" height="1.48vh"></iconify-icon>
                <div class="status_bar">
                    <div class="fill_progress" id="eat" style="background: var(--food-progress)"></div>
                </div>
            </div>
            <div class="food_drink">
                <iconify-icon icon="mingcute:drink-fill" class="eat_drink-icon" style="color: var(--drink-icon);" width="0.94vw" height="1.67vh"></iconify-icon>
                <div class="status_bar">
                    <div class="fill_progress" id="drink"></div>
                </div>
            </div>
        </div>
        <div class="outoff-food">
            <div class="user-box">
                <iconify-icon icon="material-symbols:person" class="user-job-icon" style="color: #FFF;" width="1.25vw" height="2.22vh"></iconify-icon>
                <p class="user-title" id="job">POLICE</p>
                <p class="user-info"  id="grade">OFFICER II</p>
            </div>
            <div class="user-box">
                <iconify-icon icon="ic:round-place" class="user-job-icon" style="color: #FFF;" width="1.25vw" height="2.22vh"></iconify-icon>
                <p class="user-title" id="street-name">Havik</p>
                <p class="user-info" id="street-zone">Havik Avenue</p>
            </div>
            <div class="mic-funk">
                <div class="mic-funk-box">
                    <iconify-icon icon="ion:mic" class="funk-mic-icon" id="voice-icon" style="color: #ffffff;" width="1.25vw" height="2.22vh"></iconify-icon>
                    <div class="radius-status">
                        <div class="status" id="mic-1" style="background: var(--mic-status); box-shadow: 0vw 0vw 0.52vw 0vw rgba(237, 37, 78, 0.32);"></div>
                        <div class="status" id="mic-2" style="background: var(--mic-status); box-shadow: 0vw 0vw 0.52vw 0vw rgba(237, 37, 78, 0.32);"></div>
                        <div class="status" id="mic-3"></div>
                        <div class="status" id="mic-4"></div>
                    </div>
                </div>
                <div class="mic-funk-box">
                    <iconify-icon icon="fluent:walkie-talkie-28-filled" class="funk-mic-icon" id="funk-icon" style="color: #ffffff;" width="1.25vw" height="2.22vh"></iconify-icon>
                    <div class="radius-status">
                        <div class="status" id="funk-1" style="background: var(--funk-status); box-shadow: 0vw 0vw 0.52vw 0vw rgba(237, 37, 78, 0.32);"></div>
                        <div class="status" id="funk-2" style="background: var(--funk-status); box-shadow: 0vw 0vw 0.52vw 0vw rgba(237, 37, 78, 0.32);"></div>
                        <div class="status" id="funk-3" style="background: var(--funk-status); box-shadow: 0vw 0vw 0.52vw 0vw rgba(237, 37, 78, 0.32);"></div>
                        <div class="status" id="funk-4" style="background: var(--funk-status); box-shadow: 0vw 0vw 0.52vw 0vw rgba(237, 37, 78, 0.32);"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="scoreboard">
        <div class="scoreboard-header">
            <img class="scoreboard-logo" src="https://media.discordapp.net/attachments/1135664436208734330/1135664967740309524/Prime-Transparent.png">
            <p class="scoreboard-name">SCOREBOARD</p>
            <p class="scoreboard-desc">Aktuelle Anzahl von Spielern für einen bestimmten Beruf</p>
        </div>
        <div class="jobs">
        </div>
    </div>
    <div class="hud-settings">
        <div class="header-settings">
            <img class="settings-logo" src="https://media.discordapp.net/attachments/1135664436208734330/1135664967740309524/Prime-Transparent.png">
            <p class="hud-header-txt">HUD SETTINGS</p>
        </div>
        <div class="elements-settings">
            <div class="element">
                <p class="element-txt">Speedometer</p>
                <div class="element-status checked" id="speedometer-id" onclick="checkElement(this, '.speedo-box', 'speedometer')"></div>
            </div>
            <div class="element">
                <p class="element-txt">Notifys</p>
                <div class="element-status checked" id="notifys-id" onclick="checkElement(this, '.notifys-container', 'notifys')"></div>
            </div>
            <div class="element">
                <p class="element-txt">User-Infos</p>
                <div class="element-status checked" id="user-infos-id" onclick="checkElement(this, '.user-infos', 'user-infos')"></div>
            </div>
            <div class="element">
                <p class="element-txt">Server-Infos</p>
                <div class="element-status checked" id="server-infos-id" onclick="checkElement(this, '.server-infos', 'server-infos')"></div>
            </div>
            <div class="element">
                <p class="element-txt">Time</p>
                <div class="element-status checked" id="time-id" onclick="checkElement(this, '.time-box', 'time')"></div>
            </div>
            <div class="element">
                <p class="element-txt">Weapon & Money</p>
                <div class="element-status checked" id="money_weapon-id" onclick="checkElement(this, '.WeaponMoneyBox', 'money_weapon')"></div>
            </div>
        </div>
    </div>
    `)
}

function checkElement(element, element_id, name) {
    let toggle
    if (element.classList.contains('checked')) {
        toggle = false
        element.classList.remove('checked');
        element.classList.add('unchecked');
        $(`${element_id}`).fadeOut(400);
    } else {
        toggle = true
        element.classList.remove('unchecked');
        element.classList.add('checked');
        $(`${element_id}`).fadeIn(400);
    }
    $.post(`https://${GetParentResourceName()}/changeStatus`, JSON.stringify({ element_id: element_id, name: name, status: toggle }))
}

function cancelProgressbar() {
    $('.progress-bar').hide();
    clearInterval(progressBar);
}

function startProgressbar(text, time) {
    if (progressBar) clearInterval(progressBar)

    $('.progress-bar').show();
    $('.progress-txt').text(text);

    const start = new Date();
    const interval = 10;

    progressBar = setInterval(() => {
        const now = new Date();
        const timeDiff = now - start;
        const percent = Math.min(Math.round((timeDiff / time) * 100), 100);

        $('.progress-bar-fill').css("width", percent + "%");
        $('.progress-percent').text(percent + "%")

        if (percent >= 100) {
            cancelProgressbar()
        }
    }, interval);
}

function formatMoney(money, currency) {
    if (currency == "USD") {
        return "$" + money.toLocaleString({ style: 'currency', currency: 'USD'});
    } else if (currency == "EUR") {
        return money.toLocaleString({ style: 'currency', currency: 'EUR'}) + " €";
    }
} 

function sendTime() {
    let day = new Date();
    let cuDay = day.getDate();
    let h = day.getHours();
    let m = day.getMinutes();
    let monat = day.getMonth() + 1;
    let md = day.getDate();
    let year = day.getFullYear();

    h = checkTime(h)
    m = checkTime(m)
    monat = checkTime(monat)
    md = checkTime(md)
    year = checkTime(year)
    cuDay = checkTime(cuDay)
 

    $('.time-time').text(h + ":" + m)
    $('.time-date').text(`${cuDay}.${monat}.${year}`)

    setTimeout(sendTime, 1000)
}

function checkTime(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i
}

function enqueueAnnouncement(title, msg, time) {
    if (!currentlyAnnouncing) {
        currentlyAnnouncing = true;
        announce(title, msg, time);
    } else {
        announcementQueue.push({ title, msg, time });
    }
}

function processAnnouncementQueue() {
    if (announcementQueue.length > 0) {
        const { title, msg, time } = announcementQueue.shift();
        announce(title, msg, time);
    }
}