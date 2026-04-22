import type { McpGeneralConfig } from 'mcp-general';

const config: McpGeneralConfig = {
  namespaces: {
    daisyui: {
      tools: {
        get_llms: {
          url: 'https://daisyui.com/llms.txt',
          description: 'Fetch the llms.txt for DaisyUI',
        },
      },
    },
    tanstack: {
      tools: {
        get_llms: {
          url: 'https://tanstack.com/llms.txt',
          description: 'Fetch the llms.txt for TanStack',
        },
      },
    },
  },
};

export default config;
