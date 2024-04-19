import { stdout } from "process";

interface Options {
  length?: number;
  indicator?: string;
  message?: string;
}

const defaultOptions: Required<Options> = {
  length: 10,
  indicator: "☕",
  message: "",
};

export async function loading(task: () => Promise<any>, options: Options = {}) {
  const { length, indicator, message } = { ...defaultOptions, ...options };
  const hideCursor = () => stdout.write("\u001b[?25l\r");
  const showCursor = () => stdout.write("\u001b[?25h\r");

  function clear() {
    stdout.write("\r" + " ".repeat(80) + "\r");
  }

  function bar(i: number) {
    if (i % length === 0) {
      clear();
    }

    stdout.write("\r" + message + " " + indicator.repeat(i % length));
  }

  const ms = 250;
  const start = 1;
  let i = start;

  hideCursor();

  const interval = setInterval(() => {
    bar(i);
    i = i % length === 0 ? start : i + 1;
  }, ms);

  await task();
  showCursor();

  clear();
  clearInterval(interval);
}
