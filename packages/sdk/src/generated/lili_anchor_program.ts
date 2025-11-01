export type LiliAnchorProgram = {
  version: "0.1.0";
  name: "lili_anchor_program";
  instructions: [
    {
      name: "initialize";
      accounts: [
        {
          name: "greetingAccount";
          isMut: boolean;
          isSigner: boolean;
        },
        {
          name: "authority";
          isMut: boolean;
          isSigner: boolean;
        },
        {
          name: "systemProgram";
          isMut: boolean;
          isSigner: boolean;
        }
      ];
      args: [
        {
          name: "greeting";
          type: "string";
        }
      ];
    },
    {
      name: "update";
      accounts: [
        {
          name: "greetingAccount";
          isMut: boolean;
          isSigner: boolean;
        },
        {
          name: "authority";
          isMut: boolean;
          isSigner: boolean;
        }
      ];
      args: [
        {
          name: "greeting";
          type: "string";
        }
      ];
    }
  ];
  accounts: [
    {
      name: "greetingAccount";
      type: {
        kind: "struct";
        fields: [
          {
            name: "authority";
            type: "publicKey";
          },
          {
            name: "message";
            type: "string";
          }
        ];
      };
    }
  ];
  errors: Array<{
    code: number;
    name: "MessageTooLong" | "Unauthorized";
    msg: string;
  }>;
};

export const IDL: LiliAnchorProgram = {
  version: "0.1.0",
  name: "lili_anchor_program",
  instructions: [
    {
      name: "initialize",
      accounts: [
        {
          name: "greetingAccount",
          isMut: true,
          isSigner: true
        },
        {
          name: "authority",
          isMut: true,
          isSigner: true
        },
        {
          name: "systemProgram",
          isMut: false,
          isSigner: false
        }
      ],
      args: [
        {
          name: "greeting",
          type: "string"
        }
      ]
    },
    {
      name: "update",
      accounts: [
        {
          name: "greetingAccount",
          isMut: true,
          isSigner: false
        },
        {
          name: "authority",
          isMut: false,
          isSigner: true
        }
      ],
      args: [
        {
          name: "greeting",
          type: "string"
        }
      ]
    }
  ],
  accounts: [
    {
      name: "greetingAccount",
      type: {
        kind: "struct",
        fields: [
          {
            name: "authority",
            type: "publicKey"
          },
          {
            name: "message",
            type: "string"
          }
        ]
      }
    }
  ],
  errors: [
    {
      code: 6000,
      name: "MessageTooLong",
      msg: "Greeting must be 64 characters or fewer"
    },
    {
      code: 6001,
      name: "Unauthorized",
      msg: "Only the authority can update the greeting"
    }
  ]
};
