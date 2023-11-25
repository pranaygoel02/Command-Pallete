import { keys } from "./keys";

export const cmdkDefaultCommands = [
    {
        title: "Open command palette",
        cmd: {
            key: "Ctrl+K",
            onKeyPress: "open_command_palette",
        }
    },
    {
        title: "Select",
        cmd: {
            key: "Enter",
            icon: keys.Enter,
            onKeyPress: "select_menu_item",
        }
    },
    {
        title: "Go up",
        cmd: {
            key: "ArrowUp",
            icon: keys.ArrowUp,
            onKeyPress: "navigate_up",
        }
    },
    {
        title: "Go down",
        cmd: {
            key: "ArrowDown",
            icon: keys.ArrowDown,
            onKeyPress: "navigate_down",
        }
    },
    {
        title: "Go back a level",
        cmd: {
            key: "Backspace",
            icon: keys.Backspace,
            onKeyPress: "navigate_back",
        }
    },
    {
        title: "Go to the top level or exit",
        cmd: {
            key: "Escape",
            icon: "Esc",
            onKeyPress: "navigate_top_or_exit",
        }
    }
]