declare namespace Spotify {
  class Player {
    constructor(options: PlayerOptions);

    connect(): void;
    addListener(event: string, callback: (state: any) => void): void;
    // Add other methods and properties as needed
  }

  interface PlayerOptions {
    name: string;
    getOAuthToken: (cb: (token: string) => void) => void;
    // Add other options as needed
  }

  // Declare other types and interfaces used by the SDK here
}
