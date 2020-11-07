# Erela.js-example-repo
Example of using Erela.js with Lavalink for music bots written in Discord.js

## Documentation & Guides of Erela.js

- [Erela.js official GitHub](https://github.com/Solaris9/erela.js/ "Erela.js GitHub")

- [Documentation](http://projects.solaris.codes/erelajs/docs/gettingstarted.html "Erela.js Documentation")

- [Guides](http://projects.solaris.codes/erelajs/guides/introduction.html "Erela.js Guides")

## Prerequisites

- Java - [Azul](https://www.azul.com/downloads/zulu-community/?architecture=x86-64-bit&package=jdk "Download Azul OpenJDK") or [Adopt](https://adoptopenjdk.net/ "Download Adopt OpenJDK") or [sdkman](https://sdkman.io/install "Download sdkman")

- [Lavalink](https://ci.fredboat.com/viewLog.html?buildId=lastSuccessful&buildTypeId=Lavalink_Build&tab=artifacts&guest=1 "Download Lavalink") - Included in this repo

**Note**: _Java v11 or newer is required to run the Lavalink.jar. Java v13 is recommended._ If you are using **sdkman** then _its a manager, not Java, you have to install sdkman and use sdkman to install Java_

**Warning**: Java v14 has issues with Lavalink.

## Installation

**NPM** :

**Download** repository and **open** them in editor (for example **Visual Studio Code**). Then run `npm install` in a **Terminal window**

It will automatically create **node_modules** folder and download required dependencies

## Getting Started

Set up your Discord token in the **config.json** file and set up your prefix in the **main.js** file on **line 72** (default is **/**)

- Run the **Lavalink** file by running `npm run lavalink` in a **Terminal window**.
- Finally run **bot** by running `npm run bot` in a **new Terminal window**.

## Possible custom adjustments
### You can change commands variables
- You need to change them in **main.js** file on **line 85**
```await command.run(...);```
- And in **each command file** (for example play.js or pause.js) on line `module.exports.run = (...)`
### You can change bot status
- You need to change that in **main.js** file on **line 55**
```name: "/help",```
### You can change command requirements
- You need to change them in **command file** (for example play.js or pause.js) on line `module.exports.requirements = {...}`
  - ownerOnly - this command can run only bot owner
    - You need to change [your id](https://support.discord.com/hc/en-us/articles/206346498-Where-can-I-find-my-User-Server-Message-ID-) in **main.js** file on **line 82** `message.author.id !== 123456789`
  - userConnection - this command requires the user to connect to a voice channel
## Plugins

You can use plugins below to extend Erela.js' features easily.

Note: These are the only ones shown before being published, check the GitHub repository for a complete list.

- [erela.js-spotify](https://github.com/Solaris9/erela.js-spotify) - Converts a Spotify URL into a UnresolvedTrack to play later.


## Contributors

👤 **Karel Krýda**

- Author
- Github: [@karelkryda](https://github.com/karelkryda)

## Contributors of Erela.js

👤 **Solaris**

- Author
- Website: <https://solaris.codes/>
- Github: [@Solaris9](https://github.com/Solaris9)

👤 **Anish Shobith**

- Contributor
- Github: [@Anish-Shobith](https://github.com/Anish-Shobith)

👤 **ayntee**

- Contributor
- Github: [@ayntee](https://github.com/ayntee)
