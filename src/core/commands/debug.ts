import { Strings } from "@core/i18n";
import { ApplicationCommand, ApplicationCommandOptionType } from "@lib/api/commands/types";
import { getDebugInfo } from "@lib/api/debug";
import { messageUtil } from "@metro/common";

export default () => <ApplicationCommand>{
    name:"YASS QUEEN🌸🌸",
    description: Strings.COMMAND_DEBUG_DESC,
    options: [
        {
            name: "ephemeral",
            type: ApplicationCommandOptionType.BOOLEAN,
            description: Strings.COMMAND_DEBUG_OPT_EPHEMERALLY,
        }
    ],
    execute([ephemeral], ctx) {
        const info = getDebugInfo();
        const content = [
            "**SchizoCord Debug Info**",
            `> Revenge: ${info.bunny.version} (${"SchizoCord " }${info.bunny.loader.version})`,
            `> Discord: ${info.discord.version} (${info.discord.build})`,
            `> React: ${info.react.version} (RN ${info.react.nativeVersion})`,
            `> Hermes: ${info.hermes.version} (bcv${info.hermes.bytecodeVersion})`,
            `> System: ${info.os.name} ${info.os.version} ${info.os.sdk ? `(SDK ${info.os.sdk})` : ""}`.trimEnd(),
            `> Device: ${info.device.model} (${info.device.codename})`,
        ].join("\n");

        if (ephemeral?.value) {
            messageUtil.sendBotMessage(ctx.channel.id, content);
        } else {
            messageUtil.sendMessage(ctx.channel.id, { content });
        }
    }
};
