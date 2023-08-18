import { binding as developmentProxyBinding } from "cf-bindings-proxy";

type QwikCityPlatformEnvironment = NonNullable<QwikCityPlatform["env"]>;

export function binding<TBinding extends keyof QwikCityPlatformEnvironment>(binding: TBinding) {
  return (platform: QwikCityPlatform) =>
    platform.env?.[binding] ??
    developmentProxyBinding<QwikCityPlatformEnvironment[TBinding]>(binding);
}
