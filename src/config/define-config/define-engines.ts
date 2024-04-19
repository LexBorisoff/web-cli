import type {
  EngineConfig,
  ResourceConfig,
  SearchConfig,
} from "@lexjs/browser-search";

interface ConfigEngineOptions<
  S extends SearchConfig = undefined,
  R extends ResourceConfig = undefined,
> extends EngineConfig<S, R> {
  name?: string;
  alias?: string | string[];
}

function createEngine<
  S extends SearchConfig = undefined,
  R extends ResourceConfig = undefined,
>(baseUrl: string, config: ConfigEngineOptions<S, R>) {
  return {
    baseUrl,
    ...config,
  };
}

export type ConfigEngine = ReturnType<typeof createEngine>;

type CallbackFn = (
  createFn: typeof createEngine
) => Record<string, ConfigEngine>;

export function defineEngines(define: CallbackFn) {
  const engines = define(createEngine);
  const json = JSON.stringify(engines);
  console.log(json);
}
