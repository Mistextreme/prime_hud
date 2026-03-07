-- // locals \\ --
local ESX, language, hudLoaded, lastFuelUpdate, isOpen, openui, jobs_data, hudRadiusBLIP, hudBLIPpd, hudblink, ishud, hud_s_status = nil, cl_config.language[cl_config.general.language], false, 0, false, false, nil, {}, {}, {}, false, false
local localStreetNames = {["AIRP"] = "Los Santos International Airport", ["ALAMO"] = "Alamo Sea", ["ALTA"] = "Alta", ["ARMYB"] = "Fort Zancudo", ["BANHAMC"] = "Banham Canyon Dr", ["BANNING"] = "Banning", ["BEACH"] = "Vespucci Beach", ["BHAMCA"] = "Banham Canyon", ["BRADP"] = "Braddock Pass", ["BRADT"] = "Braddock Tunnel", ["BURTON"] = "Burton", ["CALAFB"] = "Calafia Bridge", ["CANNY"] = "Raton Canyon", ["CCREAK"] = "Cassidy Creek", ["CHAMH"] = "Chamberlain Hills", ["CHIL"] = "Vinewood Hills", ["CHU"] = "Chumash", ["CMSW"] = "Chiliad Mountain State Wilderness", ["CYPRE"] = "Cypress Flats", ["DAVIS"] = "Davis", ["DELBE"] = "Del Perro Beach", ["DELPE"] = "Del Perro", ["DELSOL"] = "La Puerta", ["DESRT"] = "Grand Senora Desert", ["DOWNT"] = "Downtown", ["DTVINE"] = "Downtown Vinewood", ["EAST_V"] = "East Vinewood", ["EBURO"] = "El Burro Heights", ["ELGORL"] = "El Gordo Lighthouse", ["ELYSIAN"] = "Elysian Island", ["GALFISH"] = "Galilee", ["GOLF"] = "GWC and Golfing Society", ["GRAPES"] = "Grapeseed", ["GREATC"] = "Great Chaparral", ["HARMO"] = "Harmony", ["HAWICK"] = "Hawick", ["HORS"] = "Vinewood Racetrack", ["HUMLAB"] = "Humane Labs and Research", ["JAIL"] = "Bolingbroke Penitentiary", ["KOREAT"] = "Little Seoul", ["LACT"] = "Land Act Reservoir", ["LAGO"] = "Lago Zancudo", ["LDAM"] = "Land Act Dam", ["LEGSQU"] = "Legion Square", ["LMESA"] = "La Mesa", ["LOSPUER"] = "La Puerta", ["MIRR"] = "Mirror Park", ["MORN"] = "Morningwood", ["MOVIE"] = "Richards Majestic", ["MTCHIL"] = "Mount Chiliad", ["MTGORDO"] = "Mount Gordo", ["MTJOSE"] = "Mount Josiah", ["MURRI"] = "Murrieta Heights", ["NCHU"] = "North Chumash", ["NOOSE"] = "N.O.O.S.E", ["OCEANA"] = "Pacific Ocean", ["PALCOV"] = "Paleto Cove", ["PALETO"] = "Paleto Bay", ["PALFOR"] = "Paleto Forest", ["PALHIGH"] = "Palomino Highlands", ["PALMPOW"] = "Palmer-Taylor Power Station", ["PBLUFF"] = "Pacific Bluffs", ["PBOX"] = "Pillbox Hill", ["PROCOB"] = "Procopio Beach", ["RANCHO"] = "Rancho", ["RGLEN"] = "Richman Glen", ["RICHM"] = "Richman", ["ROCKF"] = "Rockford Hills", ["RTRAK"] = "Redwood Lights Track", ["SANAND"] = "San Andreas", ["SANCHIA"] = "San Chianski Mountain Range", ["SANDY"] = "Sandy Shores", ["SKID"] = "Mission Row", ["SLAB"] = "Stab City", ["STAD"] = "Maze Bank Arena", ["STRAW"] = "Strawberry", ["TATAMO"] = "Tataviam Mountains", ["TERMINA"] = "Terminal", ["TEXTI"] = "Textile City", ["TONGVAH"] = "Tongva Hills", ["TONGVAV"] = "Tongva Valley", ["VCANA"] = "Vespucci Canals", ["VESP"] = "Vespucci", ["VINE"] = "Vinewood", ["WINDF"] = "Ron Alternates Wind Farm", ["WVINE"] = "West Vinewood", ["ZANCUDO"] = "Zancudo River", ["ZP_ORT"] = "Port of South Los Santos", ["ZQ_UAR"] = "Davis Quartz", ["PROL"] = "Prologue / North Yankton", ["ISHeist"] = "Cayo Perico Island"}
local strings = {"<script", "<img", "<svg", "<style", "<link", "<iframe", "<video", "<audio", "<body", "<head", "<html"}
local default_hudSettings = {["speedometer"] = {element = ".speedo-box", status = true}, ["notifys"] = {element = ".notifys-container", status = true}, ["user-infos"] = {element = ".user-infos", status = true}, ["server-infos"] = {element = ".server-infos", status = true}, ["time"] = {element = ".time-box", status = true}, ["money_weapon"] = {element = ".WeaponMoneyBox", status = true}}

-- // get ESX \\ --
if exports["es_extended"]:getSharedObject() then
    ESX = exports["es_extended"]:getSharedObject()
else
    TriggerEvent(cl_config.general.esx_events["esx:getSharedObject"], function(obj) ESX = obj end)
end

-- // Commands \\ --
RegisterCommand("tesst3", function()
    exports["prime_hud"]:progressbar("Your weapon will be recharged!", 5000)
    Wait(5500)
    exports["prime_hud"]:notify("info", "INFO", "Some text here, idk what to write", 5000)
    Wait(5500)
    exports["prime_hud"]:announce("MIST THE GOAT", "Some text here, idk what to write", 5000)
    Wait(5500)
    blabla = true
    Citizen.CreateThread(function()
        while blabla do
            Wait(0)
            exports["prime_hud"]:helpnotify("H", "To be the GOAT")
            --TriggerEvent(cl_config.general.prime_events["prime_helpnotify"], "K", "To open the door")
        end
    end)
    Wait(5000)
    blabla = false
end)

-- // Commands \\ --
RegisterCommand("tesst1", function()
    sendData("weapon-ammo", {name = "weapon-ammo", ammo = 30, ammo_max = 500})
    TriggerEvent(cl_config.general.prime_events["prime_progressbar"], "Your weapon will be recharged!", 5000)
    Wait(5500)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "info", "INFO", "Some text here, idk what to write", 5000)
    Wait(5500)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "error", "ERROR", "Some text here, idk what to write, just for example i paste this shit here, just for “looks dawd2wdasdqd", 5000)
    Wait(5500)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "warning", "WARNING", "Some text here, idk what to write, just for example i paste this shit here, just for “looks", 5000)
    Wait(5500)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "success", "SUCCESS", "Some text here, ddddddddddddddddddddd idk what to writerite, just for example i paste this shit h rite, just for example i paste this shit h rite, just for example i paste this shit h rite, just for example i paste this shit h, just for example i paste this shit here, just for “looks”", 5000)
    Wait(5500)
    TriggerEvent(cl_config.general.prime_events["prime_announce"], "Announce", " Some text here for example so, it’s looks like this, some example here, bla bla bla Some text here for example so, it’s looks like this, some example here, bla bla bla", 5000)
    blabla = true
    Citizen.CreateThread(function()
        while blabla do
            Wait(0)
            TriggerEvent(cl_config.general.prime_events["prime_helpnotify"], "K", "To open the door")
        end
    end)
    Wait(5000)
    blabla = false
end)

-- // Commands \\ --
RegisterCommand("tesst2", function()
    sendData("weapon-ammo", {name = "weapon-ammo", ammo = 30, ammo_max = 500})
    TriggerEvent(cl_config.general.prime_events["prime_progressbar"], "Your weapon will be recharged!", 5000)
    Wait(5000)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "info", "INFO", "Some text here, idk what to write", 5000)
    Wait(5000)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "error", "ERROR", "Some text here, idk what to write, just for example i paste this shit here, just for “looks dawd2wdasdqd", 5000)
    Wait(5000)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "warning", "WARNING", "Some text here, idk what to write, just for example i paste this shit here, just for “looks", 5000)
    Wait(5000)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "success", "SUCCESS", "Some text here, ddddddddddddddddddddd idk what to writerite, just for example i paste this shit h rite, just for example i paste this shit h rite, just for example i paste this shit h rite, just for example i paste this shit h, just for example i paste this shit here, just for “looks”", 5000)
    Wait(5000)
    TriggerEvent(cl_config.general.prime_events["prime_announce"], "Announce", " Some text here for example so, it’s looks like this, some example here, bla bla bla Some text here for example so, it’s looks like this, some example here, bla bla bla", 5000)
    blabla = true
    Citizen.CreateThread(function()
        while blabla do
            Wait(0)
            TriggerEvent(cl_config.general.prime_events["prime_helpnotify"], "K", "To open the door")
        end
    end)
    Wait(5000)
    blabla = false
end)

-- // Commands \\ --
RegisterCommand("tesst", function()
    sendData("weapon-ammo", {name = "weapon-ammo", ammo = 30, ammo_max = 500})
    TriggerEvent(cl_config.general.prime_events["prime_progressbar"], "Your weapon will be recharged!", 5000)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "info", "INFO", "Some text here, idk what to write", 5000)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "error", "ERROR", "Some text here, idk what to write, just for example i paste this shit here, just for “looks dawd2wdasdqd", 5000)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "warning", "WARNING", "Some text here, idk what to write, just for example i paste this shit here, just for “looks", 5000)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "success", "SUCCESS", "Some text here, ddddddddddddddddddddd idk what to writerite, just for example i paste this shit h rite, just for example i paste this shit h rite, just for example i paste this shit h rite, just for example i paste this shit h, just for example i paste this shit here, just for “looks”", 5000)
    TriggerEvent(cl_config.general.prime_events["prime_announce"], "Announce", " Some text here for example so, it’s looks like this, some example here, bla bla bla Some text here for example so, it’s looks like this, some example here, bla bla bla", 5000)
    blabla = true
    Citizen.CreateThread(function()
        while blabla do
            Wait(0)
            TriggerEvent(cl_config.general.prime_events["prime_helpnotify"], "K", "To open the door")
        end
    end)
    Wait(5000)
    blabla = false
end)

RegisterCommand("id", function()
    TriggerEvent(cl_config.general.prime_events["prime_notify"], "info", cl_config.commands.notify_title, string.format(language["notification"]["commands"]["player"]["playerid"], GetPlayerServerId(PlayerId())), 10000)
end)

RegisterCommand("ids", function()
    while not ESX do
        Wait(0)
    end
    local closestPlayer, closestPlayerDistance = ESX.Game.GetClosestPlayer()
    if closestPlayer == -1 or closestPlayerDistance >= 5.0 then
        TriggerEvent(cl_config.general.prime_events["prime_notify"], "error", cl_config.commands.notify_title, language["notification"]["commands"]["player"]["no_players"], 5000)
    else
        TriggerEvent(cl_config.general.prime_events["prime_notify"], "info", cl_config.commands.notify_title, string.format(language["notification"]["commands"]["player"]["playerids"], GetPlayerServerId(closestPlayer)), 5000)
    end
end)

-- speedometer
if cl_config.general.hide_hudComponents.enable then
    Citizen.CreateThread(function()
        while true do
            for _, componentId in ipairs(cl_config.general.hide_hudComponents.numbers) do
                if IsHudComponentActive(componentId) then
                    HideHudComponentThisFrame(componentId)
                end
            end
            Wait(0)
        end
    end)
end

if cl_config.commands.engine.enable then
    local engine = false
    if cl_config.commands.engine.keymapping.enable then
        RegisterKeyMapping(cl_config.commands.engine.command, cl_config.commands.engine.keymapping.title, "KEYBOARD", cl_config.commands.engine.keymapping.key)
    end
    RegisterCommand(cl_config.commands.engine.command, function()
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(ped, true)
        local seat = GetPedInVehicleSeat(vehicle, -1)
        local isin = IsPedInAnyVehicle(ped, true)
        if seat == ped then
            engine = not GetIsVehicleEngineRunning(vehicle)
            Citizen.CreateThread(function()
                while not engine do
                    Wait(0)
                    if isin then
                        SetVehicleEngineOn(vehicle, false, false, false)
                        SetVehicleJetEngineOn(vehicle, false)
                    end
                    if IsControlJustPressed(0, 32) then
                        engine = true
                    end
                end
            end)
            if engine and isin then
                SetVehicleEngineOn(vehicle, true, false, false)
            end
            TriggerEvent(cl_config.general.prime_events["prime_notify"], "info", cl_config.commands.notify_title, language["notification"]["commands"]["vehicle"]["engine_"..tostring(engine)..""], 5000)
        end
    end)
end

if cl_config.commands.cruise_control.enable then
    local enabledTemp = false
    RegisterKeyMapping(cl_config.commands.cruise_control.command, cl_config.commands.cruise_control.keymapping.title, "KEYBOARD", cl_config.commands.cruise_control.keymapping.key)
    RegisterCommand(cl_config.commands.cruise_control.command, function()
        local ped = PlayerPedId()
        local vehicle = GetVehiclePedIsIn(ped, true)
        local seat = GetPedInVehicleSeat(vehicle, -1)
        if seat == ped then
            local currentlySpeed = GetEntitySpeed(vehicle)
            local rpm = GetVehicleCurrentRpm(vehicle)
            enabledTemp = not enabledTemp
            if enabledTemp and IsVehicleOnAllWheels(vehicle) then
                TriggerEvent(cl_config.general.prime_events["prime_notify"], "info", cl_config.commands.notify_title, string.format(language["notification"]["commands"]["vehicle"]["cruise_control_true"], math.ceil(currentlySpeed * 3.6)), 5000)
                setTempomat(currentlySpeed, vehicle, rpm)
            end
        end
    end)

    function setTempomat(currentlySpeed, vehicle, rpm)
        time = 0
        if DoesEntityExist(vehicle) then
            Citizen.CreateThread(function()
                while enabledTemp do
                    Wait(0)
                    if not IsVehicleOnAllWheels(vehicle) then
                        time = time + 1
                        if time > 50 then
                            enabledTemp = false
                        end
                    end
                    if IsControlJustPressed(0, 32) or IsControlJustPressed(0, 22) or IsControlJustPressed(0, 33) or GetVehicleFuelLevel(vehicle) < 5.0 or HasEntityCollidedWithAnything(vehicle) then
                        enabledTemp = false
                    end
                    SetVehicleForwardSpeed(vehicle, currentlySpeed)
                    SetVehicleCurrentRpm(vehicle, rpm)       
                end
                if not enabledTemp then
                    TriggerEvent(cl_config.general.prime_events["prime_notify"], "info", cl_config.commands.notify_title, language["notification"]["commands"]["vehicle"]["cruise_control_false"], 5000)
                end
            end)
        end
    end 
end

if cl_config.general.speedometer.enabled then
    Citizen.CreateThread(function()
        while true do
            local sleep = 1500
            local ped = PlayerPedId()
            if default_hudSettings["speedometer"].status then
                if IsPedInAnyVehicle(ped, true) then
                    local vehicle = GetVehiclePedIsIn(ped, true)
                    local fuel = GetVehicleFuelLevel(vehicle)
                    local seat = GetPedInVehicleSeat(vehicle, -1)
                    local damage = GetVehicleEngineHealth(vehicle)
                    local lockStatus = GetVehicleDoorLockStatus(vehicle)        
                    local max_speed = GetVehicleEstimatedMaxSpeed(vehicle) * 3.6 + 30
                    local speed = (GetEntitySpeed(vehicle) * 3.6)
                    local speed_percent = (speed / max_speed * 100)
                    sleep = 50
                    sendData("speedometer", {speed = math.ceil(speed), fuel = fuel, vehicle_health = damage, speed_percent = speed_percent, lockStatus = lockStatus})
                else
                    sendData("hideSpeedometer", {})
                end
            end
            Wait(sleep)
        end
    end)
end

Citizen.CreateThread(function()
    while true do
        local sleep = 1500
        local ped = PlayerPedId()
        local hash = GetSelectedPedWeapon(ped)
        if hash ~= GetHashKey("weapon_unarmed") and hash ~= 966099553 then
            local _, ammo = GetAmmoInClip(ped, hash, 1)
            local weaponname = ESX.GetWeaponLabel((ESX.GetWeaponFromHash(hash).name)) or "Unknown Weapon"
            local maxammo = GetAmmoInPedWeapon(ped, hash)
            sleep = 200
            sendData("weapon-ammo", {name = weaponname, ammo = ammo, ammo_max = maxammo})
        else
            sendData("weapon-hide", {})
        end
        Wait(sleep)
    end
end)

Citizen.CreateThread(function()
    local ispma = string.lower(cl_config.general.voice.type) == "pma"
    local sleep = ispma and 500 or 1000
    while true do
        Wait(sleep)

        local coords = GetEntityCoords(PlayerPedId())
        local streetHash = GetStreetNameAtCoord(coords.x, coords.y, coords.z)
        local zoneName = GetNameOfZone(coords.x, coords.y, coords.z)
        local isPauseMenu = IsPauseMenuActive()

        local data = {}

        if ispma then
            data["voice-status"] = {type = "voice", bool = NetworkIsPlayerTalking(PlayerId())}
        end

        data["street"] = {street = GetStreetNameFromHashKey(streetHash), zone = localStreetNames[tostring(zoneName)]}

        if isPauseMenu then
            openui = false
        end

        if not ishud then
            data["hide-hud"] = {status = isPauseMenu}
        end

        for k, v in pairs(data) do
            sendData(k, v)
        end
    end
end)

-- // Events \\ --
RegisterNetEvent(cl_config.general.esx_events["esx:playerLoaded"])
AddEventHandler(cl_config.general.esx_events["esx:playerLoaded"], function(playerData)
    Wait(2500)
    loadDefaultHud(playerData)
end)

AddEventHandler('onResourceStart', function(resource)
    if resource ~= GetCurrentResourceName() then return end
    while not ESX do
        Wait(0)
    end
    loadDefaultHud(ESX.GetPlayerData())
end)

RegisterNetEvent(cl_config.general.esx_events["esx:setAccountMoney"])
AddEventHandler(cl_config.general.esx_events["esx:setAccountMoney"], function(account)
    if string.lower(cl_config.general.esx_version) == "old" then 
        Wait(2000)
        local _, bank = getMoney(ESX.GetPlayerData())
        local money = ESX.GetPlayerData().money
        sendData("player-money", {cash = money, bank = bank, currency = cl_config.general.currency})
    else
        if account.name == "bank" then
            sendData("player-money", {cash = nil, bank = account.money, currency = cl_config.general.currency})
        elseif account.name == "money" then
            sendData("player-money", {cash = account.money, bank = nil, currency = cl_config.general.currency})
        end
    end
end)

RegisterNetEvent(cl_config.general.esx_events["esx:setJob"])
AddEventHandler(cl_config.general.esx_events["esx:setJob"], function(job)
    sendData("player-job", {job = job.label, grade = job.grade_label})
end)

RegisterNetEvent("prime_hud:sendServerData")
AddEventHandler("prime_hud:sendServerData", function(currentlyPlayers, maxPlayers)
    sendData("player-count", {players = currentlyPlayers, maxPlayers = maxPlayers})
end)

-- // Events from HUD \\ --
RegisterNetEvent(cl_config.general.prime_events["prime_helpnotify"])
AddEventHandler(cl_config.general.prime_events["prime_helpnotify"], function(key, text)
    if not checkString({text or "not definied"}) then return end
    if not isOpen then
        isOpen = true
        sendData("helpNotify", {show = true, key = key or "E", text = text or "not definied"})
        Citizen.CreateThread(function()
            isOpen = false
            Wait(500)
            if not isOpen then
                sendData("helpNotify", {show = false, key = key or "E", text = text or "not definied"})
            end
        end)
    end
end)

RegisterNetEvent(cl_config.general.prime_events["prime_progressbar"])
AddEventHandler(cl_config.general.prime_events["prime_progressbar"], function(text, time)
    if not checkString({text or "not definied"}) then return end
    sendData("progressbar", {text = text or "not definied", time = time or 5000})
end)

RegisterNetEvent(cl_config.general.prime_events["prime_progressbar:cancel"])
AddEventHandler(cl_config.general.prime_events["prime_progressbar:cancel"], function()
    print("test cancelled")
    sendData("progressbar:cancel")
end)

RegisterNetEvent(cl_config.general.prime_events["prime_notify"])
AddEventHandler(cl_config.general.prime_events["prime_notify"], function(type, title, msg, time)
    type = type or "info"
    if not checkString({title or "not definied", msg or "not definied", type}) then return end
    sendData("notify", {type = type, title = title or "not definied", msg = msg or "not definied", time = time or 5000, icon = cl_config.notify.icons["".. type ..""]})
end)

RegisterNetEvent(cl_config.general.prime_events["prime_announce"])
AddEventHandler(cl_config.general.prime_events["prime_announce"], function(title, msg, time)
    if not checkString({title or "not definied", msg or "not definied"}) then return end
    sendData("announce", {title = title or "not definied", msg = msg or "not definied", time = time or 5000})
end)

-- // Sperrzone \\ --
RegisterNetEvent("prime_hud:changesperrzone")
AddEventHandler("prime_hud:changesperrzone", function(sperrzone, job, zone, bool)
    if bool then
        local coords = sperrzone.coords
        hudRadiusBLIP[job] = AddBlipForRadius(coords.x, coords.y, coords.z, (sperrzone.radius+0.0) )
        hudBLIPpd[job] = AddBlipForCoord(coords.x, coords.y, coords.z)
        hudblink[job] = AddBlipForCoord(coords.x, coords.y, coords.z)
        jobsperrzone(job, zone)
    else
        if DoesBlipExist(hudblink[job]) and DoesBlipExist(hudRadiusBLIP[job]) and DoesBlipExist(hudBLIPpd[job]) then
            RemoveBlip(hudblink[job])
            RemoveBlip(hudRadiusBLIP[job])
            RemoveBlip(hudBLIPpd[job])
        end
    end
end)

RegisterNetEvent('prime_hud:registersperrzone')
AddEventHandler("prime_hud:registersperrzone", function(args)
    local radius = tonumber(args[1])
    local pos = GetEntityCoords(PlayerPedId())
    local var1, var2 = GetStreetNameAtCoord(pos.x, pos.y, pos.z, Citizen.ResultAsInteger(), Citizen.ResultAsInteger())
    TriggerServerEvent('prime_hud:speerzonecreate', radius, GetStreetNameFromHashKey(var1))
end)

-- // Register NUI Callbacks \\ --
RegisterNUICallback("hudLoaded", function()
    hudLoaded = true
end)

RegisterNUICallback("sound", function(data)
    if not default_hudSettings["notifys"].status then return end
    if string.lower(cl_config[data.type].sound.type) == "custom" then
        sendData("send-sound", {sound = cl_config[data.type].sound["custom"].sound})
    elseif string.lower(cl_config[data.type].sound.type) == "fivem" then
        PlaySoundFrontend(-1, cl_config[data.type].sound["fivem"].sound.soundName, cl_config[data.type].sound["fivem"].sound.soundSetName, 1)
    end
end)

RegisterNUICallback("close", function()
    hud_s_status = not hud_s_status
    SetNuiFocus(hud_s_status, hud_s_status)
end)

RegisterNUICallback("changeStatus", function(data)
    local hud_settings = GetResourceKvpString("prime_hud:hud-settings")
    default_hudSettings[data.name].status = data.status
    SetResourceKvp("prime_hud:hud-settings", json.encode(default_hudSettings))
end)

-- // Scoreboard \\ --
if cl_config.scoreboard.enable then
    if cl_config.scoreboard.keymapping.enable then
        RegisterKeyMapping(cl_config.scoreboard.command, cl_config.scoreboard.keymapping.title, "KEYBOARD", cl_config.scoreboard.keymapping.key)
    end

    RegisterCommand(cl_config.scoreboard.command, function()
        openui = not openui
        sendData("scoreboard", {openui = openui, data = jobs_data, logo = cl_config.server.server_logo, language = language["scoreboard"]})
    end)

    RegisterNetEvent("prime_hud:updateData")
    AddEventHandler("prime_hud:updateData", function(data)
        jobs_data = data
    end)

    Citizen.CreateThread(function()
        Wait(1500)
        if not jobs_data then
            TriggerServerEvent("prime_hud:updatescoreboard")
        end
    end)
end

if cl_config.commands.hud.enabled then
    RegisterCommand(cl_config.commands.hud.command, function()
        hud_s_status = not hud_s_status
        SetNuiFocus(hud_s_status, hud_s_status)
        sendData("hud-settings", {status = hud_s_status})
    end)
end

-- // functions \\ --
function loadDefaultHud(playerData)
    Wait(500)
    if ESX ~= nil or hudLoaded ~= nil then
        local job_name, job_grade, cash, bank = playerData.job.label, playerData.job.grade_label, getMoney(playerData)
        sendData("loadhud", {language = cl_config.general.money_language})
        sendData("player-money", {cash = cash, bank = bank, currency = cl_config.general.currency})
        sendData("server-names", {server_name = cl_config.server.server_name, server_type = cl_config.server.server_type, logo = cl_config.server.server_logo})
        sendData("player-id", {playerId = GetPlayerServerId(PlayerId())})
        sendData("player-job", {job = job_name, grade = job_grade})
        getFood()
        getVoice()
        getHudSettings()
    else
        loadHud()
    end
end

function getHudSettings()
    local hud_settings, settings = GetResourceKvpString("prime_hud:hud-settings"), {}
    if not hud_settings then
        SetResourceKvp("prime_hud:hud-settings", json.encode(default_hudSettings))
        hud_settings = GetResourceKvpString("prime_hud:hud-settings")
    end
    for selector, status in pairs(json.decode(hud_settings)) do
        table.insert(settings, { [selector] = json.encode(status) })
        default_hudSettings[selector].status = status.status
    end
    sendData("get-hud:settings", {settings = settings, logo = cl_config.server.server_logo })
end


function jobsperrzone(job, zone)
    SetBlipSprite(hudblink[job], 161)
    SetBlipScale(hudblink[job], 1.0)
    SetBlipColour(hudblink[job], zone.color)
    SetBlipAsShortRange(hudblink[job], true)

    SetBlipSprite(hudBLIPpd[job], zone.blip)
    SetBlipColour(hudBLIPpd[job], zone.color)
    SetBlipScale(hudBLIPpd[job], 1.0)
    SetBlipAsShortRange(hudBLIPpd[job], true)
    
    SetBlipAlpha(hudRadiusBLIP[job], 100)
    SetBlipColour(hudRadiusBLIP[job], zone.color)

    BeginTextCommandSetBlipName("STRING")
    AddTextComponentString("Sperrzone")
    EndTextCommandSetBlipName(hudBLIPpd[job])

    BeginTextCommandSetBlipName("STRING")
    EndTextCommandSetBlipName(hudblink[job])
end

function voicerange(newTalkingRange, voiceart)
    isrange = false
    startTime = GetGameTimer()
    if voiceart == "pma" then
        distance = tonumber(cl_config.voicerange.range[newTalkingRange])
    else
        distance = newTalkingRange
    end
    isrange = true

    Citizen.CreateThread(function()
        while isrange do
            Wait(0)
            local currentTime = GetGameTimer()
            local deltaTime = currentTime - startTime

            if deltaTime < 600 then
                local coords = GetEntityCoords(PlayerPedId())
                DrawMarker(cl_config.voicerange.marker.type, coords.x, coords.y, coords.z - 1, 0.0, 0.0, 0.0, 0, 0.0, 0.0, distance * 2.0, distance * 2.0, 1.0, cl_config.voicerange.marker.colour.r, cl_config.voicerange.marker.colour.g, cl_config.voicerange.marker.colour.b, cl_config.voicerange.marker.colour.a, false, false, 2, false, false, false, false)
            else
                isrange = false
            end
        end
    end)
end

function getVoice()
    if not cl_config.voicerange.enable then return end
    if string.lower(cl_config.general.voice.type) == "pma" then
        sendData("voice-mode", {type = "PMA"})
        RegisterNetEvent(cl_config.general.voice_events["pma-voice:syncRadioData"])
        AddEventHandler(cl_config.general.voice_events["pma-voice:syncRadioData"], function()
            sendData("funk", {bool = true})
        end)
        RegisterNetEvent(cl_config.general.voice_events["pma-voice:removePlayerFromRadio"])
        AddEventHandler(cl_config.general.voice_events["pma-voice:removePlayerFromRadio"], function()
            sendData("funk", {bool = false})
        end)
        AddEventHandler(cl_config.general.voice_events["pma-voice:setTalkingMode"], function(newTalkingRange)
            voicerange(newTalkingRange, "pma")
            sendData("voice-range", {range = newTalkingRange})
            TriggerEvent(cl_config.general.prime_events["prime_notify"], "info", language["notification"]["voice"]["title"], (language["notification"]["voice"]["range"]):format(cl_config.voicerange.range[newTalkingRange]), 5000)
        end)
    elseif string.lower(cl_config.general.voice.type) == "saltychat" then
        AddEventHandler(cl_config.general.voice_events["SaltyChat_TalkStateChanged"], function(bool) 
            sendData("voice-status", {type = "voice", bool = bool})
        end)
        AddEventHandler(cl_config.general.voice_events["SaltyChat_VoiceRangeChanged"], function(range, index)
            index = index + 1
            voicerange(range)
            TriggerEvent(cl_config.general.prime_events["prime_notify"], "info", language["notification"]["voice"]["title"], (language["notification"]["voice"]["range"]):format(cl_config.voicerange.range[range]), 5000)
            sendData("voice-range", {range = index})
        end)
        AddEventHandler(cl_config.general.voice_events["SaltyChat_RadioTrafficStateChanged"], function(primaryReceive, primaryTransmit, secondaryReceive, secondaryTransmit)
            bool = primaryTransmit or secondaryTransmit
            sendData("funk", {bool = bool})
        end)
    end
end

function getFood()
    if GetResourceState(cl_config.general.status.resourceName) == "started" and cl_config.general.status.enable then
        sendData("show-status", {})
        RegisterNetEvent(cl_config.general.esx_events["esx_status:onTick"])
        AddEventHandler(cl_config.general.esx_events["esx_status:onTick"], function(status)
            for k, v in pairs(status) do
                sendData("player-status", {name = v.name, percent = v.percent})
            end
        end)
    end
end

function getMoney(playerData)
    if playerData then
        for k, v in pairs(playerData.accounts) do
            if v.name == 'money' then
                cash = v.money
            end
            if v.name == 'bank' then
                bank = v.money
            end
        end
        if string.lower(cl_config.general.esx_version) == "old" then
            cash = playerData.money
        end
    end
    return cash, bank
end

function sendData(sendtype, data)
    SendNUIMessage({
        type = sendtype,
        data = data,
    })
end

function loadHud()
    while not hudLoaded do
        Wait(0)
    end
end

function checkString(checkTxt)
    for msg, v in ipairs(checkTxt) do
        for strings, ka in ipairs(strings) do
            if string.find(v, ka) then
                return false
            end
        end
    end
    return true
end


-- // exports \\ --
exports('notify', function(type, title, msg, time)
    TriggerEvent(cl_config.general.prime_events["prime_notify"], type, title, msg, time)
end)

exports('progressbar', function(msg, time)
    TriggerEvent(cl_config.general.prime_events["prime_progressbar"], msg, time)
end)

exports('cancel:progressbar', function()
    TriggerEvent(cl_config.general.prime_events["prime_progressbar:cancel"])
end)

exports('helpnotify', function(title, msg)
    TriggerEvent(cl_config.general.prime_events["prime_helpnotify"], title, msg)
end)

exports('announce', function(title, msg, time)
    TriggerEvent(cl_config.general.prime_events["prime_announce"], title, msg, time)
end)

exports('hidehud', function(ishudStatus)
    ishud = ishudStatus
    sendData("hide-hud", {status = ishudStatus})
end)

-- // prints \\ --
print("^0[^5Prime-Scripts^0] ^2Script successfully started!^0")
print("^0[^5Prime-Scripts^0] ^5discord.gg/prime-scripts^0")