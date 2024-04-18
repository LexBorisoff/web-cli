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

type CallbackFn = (
  createFn: typeof createEngine
) => Record<string, ReturnType<typeof createEngine>>;

export function defineEngines(define: CallbackFn) {
  const engines = define(createEngine);
  const json = JSON.stringify(engines);
  console.log(json);
}
