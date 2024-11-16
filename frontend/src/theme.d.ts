import "styled-components";
import tailwindConfig from "../../tailwind.config";

type TailwindColors = typeof tailwindConfig.theme.extend.colors;

declare module "styled-components" {
    export interface DefaultTheme {
        colors: TailwindColors;
    }
}