import channelData from "./channelsData.json";

class Channel {
  constructor({ id, friendlyName, uniqueName, members, init }) {
    this.id = id;
    this.friendlyName = friendlyName;
    this.uniqueName = uniqueName;
    this.members = members;
    this._messages = null;
    this._users = null;
    this.init = init;
  }

  async getMessages() {
    if (!this._messages) {
      await this._fetchMessages();
    }
    return this._messages;
  }

  async getUsers() {
    if (!this._users) {
      await this._fetchUsers();
    }
    return this._users;
  }

  async _fetchMessages() {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          if (!this.init) {
            // return messages from JSON
            this._messages = channelData[this.id - 1].messages;
            resolve();
            return;
          }
          const messages = [];
          const numMessages = Math.floor(Math.random() * 50) + 1;
          for (let i = 0; i < numMessages; i++) {
            const messageId = i + 1;
            const body = `This is message ${messageId} in ${this.friendlyName}.`;
            const dateCreated = new Date();
            const dateUpdated = new Date();
            // set a random user as owner for each message
            const owner =
              this.members[Math.floor(Math.random() * this.members.length)];

            messages.push({ messageId, body, dateCreated, dateUpdated, owner });
          }
          this._messages = messages;
          resolve();
        },
        randomTime(250, 550),
      );
    });
  }

  async _fetchUsers() {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          if (!this.init) {
            // return users from JSON
            this._users = channelData[this.id - 1].users;
            resolve();
            return;
          }
          const users = [];
          for (let i = 0; i < 2; i++) {
            const userId = `user_${this.id}_${i}`;
            const name = `User ${this.id}_${i}`;
            const profilePicUrl = `https://picsum.photos/id/${
              this.id * 2 + (i - 1)
            }/200/200`;
            users.push({ userId, name, profilePicUrl });
          }
          this._users = users;
          resolve();
        },
        randomTime(250, 550),
      );
    });
  }
}

const randomTime = (min, max) => {
  const isShortDelay = Math.random() <= 0.65; // 65% chance of short delay
  if (isShortDelay) {
    return Math.floor(Math.random() * 200) + min;
  } else {
    return Math.floor(Math.random() * (max - 200)) + 200;
  }
};

const getChannels = (count = 10, start = 0) => {
  const channels = [];
  for (let i = start; i < start + count; i++) {
    const channel = new Channel(channelData[i]);
    channels.push(channel);
  }
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(channels);
      },
      randomTime(250, 550),
    );
  });
};

export default getChannels;
