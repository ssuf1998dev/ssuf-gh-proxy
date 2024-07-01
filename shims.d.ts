declare module "@arco-design/color" {
  export function generate(color: string, options?: {
    index?: number;
    dark?: boolean;
    list: true;
    format?: "hex" | "rgb" | "hsl";
  }): string[];
  export function generate(color: string, options?: {
    index?: number;
    dark?: boolean;
    list?: false;
    format?: "hex" | "rgb" | "hsl";
  }): string;
}
