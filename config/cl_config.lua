cl_config = {}

cl_config.server = {
    server_name = "MIST", -- secound title from the hud ui
    server_type = "SCRIPTS",
    server_logo = "./assets/img/logo2.png" -- link or path like: "./assets/img/logo.png"
}

cl_config.general = {
    esx_version = "new", -- old = 1.1 -- new = > = 1.1
    language = "en", -- de, en, fr (client and server language)
    currency = "EUR", -- "USD" or "EUR"
    hide_hudComponents = {
        enable = false, -- please turn to false if you have enabled in es_extended
        numbers = { 2, 3, 4, 6, 7, 8, 9, 20 } -- https://docs.fivem.net/natives/?_0x6806C51AD12B83B8
    },
    status = {
        enable = true, -- to disable the food bars ink. ui
        resourceName = "esx_status", -- esx_status resource name
    },
    voice = {
        type = "PMA", -- "PMA" or "SaltyChat"
    },
    speedometer = {
        enabled = true, -- false to disable the speedometer
    },
    money_language = {
        ["cash"] = "CASH",
        ["bank"] = "BANK"
    },
    esx_events = { -- put your custom esx events if you have change it
        ["esx:getSharedObject"] = "esx:getSharedObject",
        ["esx:playerLoaded"] = "esx:playerLoaded",
        ["esx:setJob"] = "esx:setJob",
        ["esx:setAccountMoney"] = "esx:setAccountMoney",
        ["esx_status:onTick"] = "esx_status:onTick"
    },
    voice_events = { -- put your custom voice events if you have change it
        ["pma-voice:syncRadioData"] = "pma-voice:syncRadioData",
        ["pma-voice:removePlayerFromRadio"] = "pma-voice:removePlayerFromRadio",
        ["pma-voice:setTalkingMode"] = "pma-voice:setTalkingMode",
        ["SaltyChat_TalkStateChanged"] = "SaltyChat_TalkStateChanged",
        ["SaltyChat_VoiceRangeChanged"] = "SaltyChat_VoiceRangeChanged",
        ["SaltyChat_RadioTrafficStateChanged"] = "SaltyChat_RadioTrafficStateChanged"
    },
    prime_events = { -- put your custom prime events if want
        ["prime_notify"] = "mist_notify",
        ["prime_announce"] = "prime_announce",
        ["prime_helpnotify"] = "prime_helpnotify",
        ["prime_progressbar"] = "mist_progressbar",
        ["prime_progressbar:cancel"] = "prime_progressbar:cancel"
    }
}

cl_config.notify = {
    sound = {
        type = "custom", -- "custom" or "fivem"
        ["custom"] = {
            sound = "./assets/sounds/notify.mp3"
        },
        ["fivem"] = {
            sound = { -- names: https://wiki.rage.mp/index.php?title=Sounds
                soundName = "ATM_WINDOW",
                soundSetName = "HUD_FRONTEND_DEFAULT_SOUNDSET"
            }
        }
    },
    icons = { -- icon names: https://icon-sets.iconify.design
        ["success"] = "ep:success-filled",
        ["warning"] = "ep:warning-filled",
        ["error"] = "ep:circle-close-filled",
        ["info"] = "ep:info-filled"
    },
}

cl_config.announce = {
    sound = {
        type = "custom", -- "custom" or "fivem"
        ["custom"] = {
            sound = "./assets/sounds/announce_1.mp3"
        },
        ["custom1"] = {
            sound = "./assets/sounds/announce_2.mp3"
        },
        ["fivem"] = {
            sound = { -- names: https://wiki.rage.mp/index.php?title=Sounds
                soundName = "OTHER_TEXT",
                soundSetName = "HUD_AWARDS"
            }
        }
    }
}

cl_config.scoreboard = {
    enable = true, -- false to disable the scoreboard ink. ui
    command = "scoreboard", -- command name to open the scoreboard
    keymapping = {
        enable = true, -- to disable the scoreboard key to open the scoreboard | if false you can only open the ui with cl_config.scoreboard.command name
        title = "Open Scoreboard", -- "esc" -> "settings" -> "keyboard" -> name
        key = "F9", -- key to open the scoreboard ui
    },
    jobs = {
        -- icon: https://icon-sets.iconify.design
        -- color: https://g.co/kgs/bgsJou - dont change the 0.32 a-number
        -- you can add up to 6 jobs
        {
            name = "POLICE", -- job display name
            job_name = "police", -- job name from db
            color = "rgba(49, 181, 255, 0.32)", -- background color from the ui container with the job
            icon = "map:police" -- icon: https://icon-sets.iconify.design
        },
        {
            name = "AMBULANCE",
            job_name = "ambulance",
            color = "rgba(237, 37, 78, 0.32)",
            icon = "mdi:ambulance"
        },
        {
            name = "MECHANIC",
            job_name = "mechaniker",
            color = "rgba(255, 229, 0, 0.32)",
            icon = "mdi:mechanic"
        },
        {
            name = "MINER",
            job_name = "miner",
            color = "rgba(172, 171, 168, 0.32)",
            icon = "healthicons:miner-worker-alt"
        }
    }
}

cl_config.voicerange = {
    enable = true, -- to disable the voice range
    range = { -- only PMA voice (saltychat is automatic)
        [1] = 3.0, -- number in meters of the voice range
        [2] = 8.0, -- number in meters of the voice range
        [3] = 16.0, -- number in meters of the voice range
        [4] = 32.0 -- ignore if you have only 3 ranges
    },
    marker = {
        type = 1, -- please dont change it if you dont know what you do
        colour = { -- color: https://g.co/kgs/bgsJou
            r = 0,
            g = 136,
            b = 255,
            a = 255
        }
    }
}

cl_config.commands = {
    notify_title = "Mist Scripts", -- notify title from /id /ids
    hud = {
        enabled = true, -- falso to disable the HUD command
        command = "hud" -- command name
    },
    ids = {
        enable = true, -- false to disable the command
        command = "ids" -- command name
    },
    id = {
        enable = true, -- false to disable the command
        command = "id" -- command name
    },
    engine = {
        enable = true,
        command = "engine",
        keymapping = {
            enable = true, -- to disable the engine toggle key | if false you can only toggle the engine with the command
            title = "Toggle Engine", -- "esc" -> "settings" -> "keyboard" -> name
            key = "G", -- key to toggle the engine
        },
    },
    cruise_control = {
        enable = true, --
        command = "cruisecontrol",
        keymapping = {
            title = "Cruise Control", -- "esc" -> "settings" -> "keyboard" -> name
            key = "F1", -- key to toggle the cruise control
        }
    }
}

cl_config.language = {
    ["de"] = {
        ["scoreboard"] = {
            ["title"] = "SCOREBOARD",
            ["description"] = "Aktuelle Anzahl von Spielern für einen bestimmten Beruf",
            ["online"] = "Spieler"
        },
        ["notification"] = {
            ["voice"] = {
                ["title"] = "Voice Range",
                ["range"]= "Du hast deine Sprachreichweite auf %s Meter gestellt.",
            },
            ["commands"] = {
                ["vehicle"] = {
                    ["cruise_control_true"] = "Du hast den Tempomat eingeschalten! [%s km/h]",
                    ["cruise_control_false"] = "Du hast den Tempomat ausgeschalten!",
                    ["engine_true"] = "Du hast deinen Motor erfolgreich angeschaltet",
                    ["engine_false"] = "Du hast deinen Motor erfolgreich ausgeschaltet"
                },
                ["player"] = {
                    ["playerid"] = "Deine Spieler ID ist: %s",
                    ["playerids"] = "Die ID des nächstgelegenen Spielers lautet: %s",
                    ["no_players"] = "Es sind keine Spieler in deiner Nähe!",
                }
            }
        }
    },
    ["en"] = {
        ["scoreboard"] = {
            ["title"] = "SCOREBOARD",
            ["description"] = "Current number of players for a specific profession",
            ["online"] = "Players"
        },
        ["notification"] = {
            ["voice"] = {
                ["title"] = "Voice Range",
                ["range"] = "You have set your voice range to %s meters.",
            },
            ["commands"] = {
                ["vehicle"] = {
                    ["cruise_control_true"] = "You have activated the cruise control! [%s km/h]",
                    ["cruise_control_false"] = "You have deactivated the cruise control!",
                    ["engine_true"] = "You have successfully started your engine",
                    ["engine_false"] = "You have successfully turned off your engine"
                },
                ["player"] = {
                    ["playerid"] = "Your player ID is: %s",
                    ["playerids"] = "The ID of the nearest player is: %s",
                    ["no_players"] = "There are no players near you!",
                }
            }
        }
    },    
    ["fr"] = {
        ["scoreboard"] = {
            ["title"] = "TABLEAU DES SCORES",
            ["description"] = "Nombre actuel de joueurs pour un métier spécifique",
            ["online"] = "Joueurs en ligne"
        },
        ["notification"] = {
            ["voice"] = {
                ["title"] = "Portée vocale",
                ["range"] = "Vous avez réglé votre portée vocale à %s mètres.",
            },
            ["commands"] = {
                ["vehicle"] = {
                    ["cruise_control_true"] = "Vous avez activé le régulateur de vitesse ! [%s km/h]",
                    ["cruise_control_false"] = "Vous avez désactivé le régulateur de vitesse !",
                    ["engine_true"] = "Vous avez démarré votre moteur avec succès",
                    ["engine_false"] = "Vous avez éteint votre moteur avec succès"
                },
                ["player"] = {
                    ["playerid"] = "Votre ID joueur est : %s",
                    ["playerids"] = "L'ID du joueur le plus proche est : %s",
                    ["no_players"] = "Il n'y a aucun joueur à proximité !",
                }
            }
        }
    }
}